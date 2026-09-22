import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const caseStudyDir = path.dirname(fileURLToPath(import.meta.url));
const svgDir = path.join(caseStudyDir, 'svg');
const slides = (await fs.readdir(svgDir)).filter((name) => name.endsWith('.svg'));

for (const slideName of slides) {
  const slidePath = path.join(svgDir, slideName);
  let svg = await fs.readFile(slidePath, 'utf8');
  const linkedImages = [...svg.matchAll(/<image\s+href="(\.\.\/assets\/[^\"]+\.(?:jpg|jpeg|png|webp))"/g)];
  if (linkedImages.length === 0) continue;
  for (const [, imageHref] of linkedImages) {
    const imagePath = path.resolve(path.dirname(slidePath), imageHref);
    const extension = path.extname(imagePath).toLowerCase();
    const mimeType = extension === '.jpg' || extension === '.jpeg' ? 'image/jpeg'
      : extension === '.png' ? 'image/png' : 'image/webp';
    const imageBase64 = (await fs.readFile(imagePath)).toString('base64');
    svg = svg.replaceAll(`href="${imageHref}"`, `href="data:${mimeType};base64,${imageBase64}"`);
    process.stdout.write(`${slideName}: embedded ${path.basename(imagePath)}\n`);
  }
  await fs.writeFile(slidePath, svg);
}
