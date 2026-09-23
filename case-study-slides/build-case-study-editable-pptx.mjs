import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const runtimeModules = '/Users/prpatel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { Presentation, PresentationFile } = await import(`${runtimeModules}/@oai/artifact-tool/dist/artifact_tool.mjs`);
const require = createRequire(import.meta.url);
const { xml2js } = require(`${runtimeModules}/xml-js`);
const skillDir = '/Users/prpatel/.codex/plugins/cache/openai-primary-runtime/presentations/26.921.11914/skills/presentations';
const pythonExecutable = '/Users/prpatel/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const caseStudyDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceDir = path.dirname(caseStudyDir);
const buildDir = path.join(caseStudyDir, '.pptx-build-editable');
const finalPath = path.join(caseStudyDir, 'output', 'ai-sdlc-case-studies-editable-2026-09-23.pptx');
const slideNames = [
  '06-six-case-study-overview',
  '07-delta-engineering-harness',
  '08-umb-coordinated-transformation',
  '09-veridyan-end-to-end-ai-delivery',
  '10-enterprise-ai-adoption-at-scale',
  '11-consilio-distinct-ai-use-case',
  '12-insurance-policy-servicing',
];
await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(path.dirname(finalPath), { recursive: true });

const presentation = Presentation.create({ slideSize: { width: 1600, height: 900 } });
presentation.theme.colorScheme = {
  name: 'Hexaware case studies',
  themeColors: {
    dk1: '#07125E', lt1: '#FFFFFF', dk2: '#152258', lt2: '#F1F5FA',
    tx1: '#07125E', tx2: '#4F5C75', bg1: '#FFFFFF', bg2: '#F1F5FA',
    accent1: '#3C2CDA', accent2: '#14CBDE', accent3: '#1D86FF',
    accent4: '#EA9D00', accent5: '#078CA4', accent6: '#8088A7',
    hlink: '#3C2CDA', folHlink: '#07125E',
  },
};

function num(value, fallback = 0) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function extractText(node) {
  return (node.elements ?? []).filter((child) => child.type === 'text' || child.type === 'cdata').map((child) => child.text ?? child.cdata ?? '').join('');
}

function cssDeclarations(raw) {
  const result = {};
  for (const declaration of raw.split(';')) {
    const cut = declaration.indexOf(':');
    if (cut < 0) continue;
    result[declaration.slice(0, cut).trim()] = declaration.slice(cut + 1).trim();
  }
  return result;
}

function parseStyles(defs) {
  const styleNode = (defs.elements ?? []).find((child) => child.name === 'style');
  const styleText = styleNode ? extractText(styleNode) : '';
  const styles = {};
  for (const match of styleText.matchAll(/([.#]?[\w-]+)\s*\{([^}]+)\}/g)) {
    styles[match[1]] = cssDeclarations(match[2]);
  }
  return styles;
}

function parseGradients(defs) {
  const gradients = {};
  for (const node of defs.elements ?? []) {
    if (node.name !== 'linearGradient' || !node.attributes?.id) continue;
    const stops = (node.elements ?? []).filter((child) => child.name === 'stop').map((stop) => ({
      offset: Math.round(num(stop.attributes?.offset) * 100000),
      color: stop.attributes?.['stop-color'] ?? '#FFFFFF',
    }));
    const x1 = num(node.attributes?.x1), y1 = num(node.attributes?.y1);
    const x2 = num(node.attributes?.x2, 1), y2 = num(node.attributes?.y2);
    const angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    if (stops.length >= 2) gradients[node.attributes.id] = { type: 'gradient', gradientKind: 'linear', angleDeg, stops };
  }
  return gradients;
}

function shapeFill(raw, gradients) {
  if (!raw || raw === 'none') return 'none';
  const gradient = raw.match(/^url\(#([^\)]+)\)$/);
  return gradient ? (gradients[gradient[1]] ?? '#FFFFFF') : raw;
}

function shapeLine(attributes) {
  return attributes.stroke && attributes.stroke !== 'none'
    ? { style: 'solid', fill: attributes.stroke, width: num(attributes['stroke-width'], 1) }
    : { fill: 'none', width: 0 };
}

function addText(slide, value, x, baseline, css, anchor, name) {
  const text = value.trim();
  if (!text) return;
  const fontSize = num(css['font-size'], 14);
  const weight = num(css['font-weight'], 500);
  const width = anchor === 'middle' ? 80 : Math.max(40, 1590 - x);
  const left = anchor === 'middle' ? x - 40 : x;
  const shape = slide.shapes.add({
    geometry: 'textbox',
    name,
    position: { left, top: baseline - fontSize * 1.04, width, height: fontSize * 1.55 },
    fill: 'none',
    line: { fill: 'none', width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    typeface: 'Manrope',
    fontSize,
    bold: weight >= 650,
    italic: css['font-style'] === 'italic',
    color: css.fill ?? '#07125E',
    alignment: anchor === 'middle' ? 'center' : 'left',
    verticalAlignment: 'top',
    wrap: 'none',
    autoFit: 'none',
    insets: { top: 0, right: 0, bottom: 0, left: 0 },
  };
}

function addNode(slide, node, styles, gradients, counters, inherited = {}) {
  if (node.type !== 'element') return;
  const attrs = node.attributes ?? {};
  const tag = node.name;
  if (tag === 'g') {
    const childSettings = { ...inherited, shadow: Boolean(attrs.filter) || inherited.shadow };
    for (const child of node.elements ?? []) addNode(slide, child, styles, gradients, counters, childSettings);
    return;
  }
  if (tag === 'rect') {
    const x = num(attrs.x), y = num(attrs.y), width = num(attrs.width), height = num(attrs.height);
    slide.shapes.add({
      geometry: num(attrs.rx) > 0 ? 'roundRect' : 'rect',
      name: `rectangle-${++counters.shapes}`,
      position: { left: x, top: y, width, height },
      fill: shapeFill(attrs.fill, gradients),
      line: shapeLine(attrs),
      ...(num(attrs.rx) > 0 ? { borderRadius: num(attrs.rx) } : {}),
      ...(inherited.shadow ? { shadow: 'shadow-sm' } : {}),
    });
    return;
  }
  if (tag === 'circle') {
    const radius = num(attrs.r);
    slide.shapes.add({
      geometry: 'ellipse',
      name: `circle-${++counters.shapes}`,
      position: { left: num(attrs.cx) - radius, top: num(attrs.cy) - radius, width: radius * 2, height: radius * 2 },
      fill: shapeFill(attrs.fill, gradients),
      line: shapeLine(attrs),
    });
    return;
  }
  if (tag === 'line') {
    const x1 = num(attrs.x1), y1 = num(attrs.y1), x2 = num(attrs.x2), y2 = num(attrs.y2);
    slide.shapes.add({
      geometry: 'line',
      name: `line-${++counters.shapes}`,
      position: { left: x1, top: y1, width: x2 - x1, height: y2 - y1 },
      fill: 'none',
      line: shapeLine(attrs),
    });
    return;
  }
  if (tag === 'image') {
    const data = attrs.href?.match(/^data:(image\/(?:jpeg|png));base64,(.+)$/);
    if (!data) throw new Error('Expected embedded photo data in source SVG');
    slide.images.add({
      blob: Buffer.from(data[2], 'base64'),
      contentType: data[1],
      alt: 'Case-study editorial photo',
      fit: 'cover',
      geometry: 'roundRect',
      borderRadius: 15,
      position: { left: num(attrs.x), top: num(attrs.y), width: num(attrs.width), height: num(attrs.height) },
    });
    counters.images++;
    return;
  }
  if (tag === 'text') {
    const className = attrs.class?.split(/\s+/)[0];
    const css = { ...(styles.text ?? {}), ...(styles[`.${className}`] ?? {}), ...(attrs.style ? cssDeclarations(attrs.style) : {}) };
    if (attrs.fill) css.fill = attrs.fill;
    const x = num(attrs.x), baseline = num(attrs.y);
    const spans = (node.elements ?? []).filter((child) => child.name === 'tspan');
    if (spans.length > 0) {
      let nextBaseline = baseline;
      for (const span of spans) {
        nextBaseline += num(span.attributes?.dy);
        addText(slide, extractText(span), num(span.attributes?.x, x), nextBaseline, css, attrs['text-anchor'], `text-${++counters.text}`);
      }
    } else {
      addText(slide, extractText(node), x, baseline, css, attrs['text-anchor'], `text-${++counters.text}`);
    }
  }
}

const allCounts = [];
for (const name of slideNames) {
  const sourcePath = path.join(caseStudyDir, 'svg', `${name}.svg`);
  const source = await fs.readFile(sourcePath, 'utf8');
  const root = xml2js(source, { compact: false, ignoreComment: true }).elements.find((node) => node.name === 'svg');
  if (!root) throw new Error(`Not an SVG: ${sourcePath}`);
  const defs = (root.elements ?? []).find((node) => node.name === 'defs');
  const styles = parseStyles(defs);
  const gradients = parseGradients(defs);
  const slide = presentation.slides.add();
  slide.background.fill = '#FFFFFF';
  const counters = { shapes: 0, text: 0, images: 0 };
  for (const child of root.elements ?? []) {
    if (['title', 'desc', 'defs'].includes(child.name)) continue;
    addNode(slide, child, styles, gradients, counters);
  }
  slide.speakerNotes.textFrame.setText(`Editable reconstruction of case-study-slides/svg/${name}.svg`);
  allCounts.push({ slide: name, ...counters });
}

const candidatePath = path.join(buildDir, 'candidate-editable.pptx');
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
console.log(JSON.stringify(allCounts));

if (process.env.DRAFT_ONLY !== '1') {
  const { finalizePresentation } = await import(pathToFileURL(path.join(skillDir, 'container_tools/artifact_tool_utils.mjs')).href);
  const result = await finalizePresentation({
    workspaceDir,
    candidatePath,
    finalPath,
    pythonExecutable,
    integrityValidatorPath: path.join(skillDir, 'container_tools/inspect_presentation_package_integrity.py'),
    layoutValidatorPath: path.join(skillDir, 'container_tools/inspect_presentation_layout_geometry.py'),
    layoutArgs: ['--expected-slide-size-emu', '15240000,8572500', '--validate-heading-fit'],
    explicitTotalSlideCount: 7,
    requiredNativeTableOwnerSlides: [],
    requiredNativeChartOwnerSlides: [],
    fontPolicy: { basis: 'design', families: ['Manrope'] },
    verifyArtifactToolImport: true,
    receiptPath: path.join(buildDir, 'editable.validation.json'),
  });
  console.log(JSON.stringify({ finalPath, sha256: result.finalSha256, slideCount: result.packageIntegrity.slide_count }));
}
