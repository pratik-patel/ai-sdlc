import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('case-study-slides/svg');
fs.mkdirSync(OUT, { recursive: true });

const esc = (s) => String(s)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

function lines(text, x, y, cls, lineHeight = 24, anchor = 'start') {
  return `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">` +
    text.map((line, i) => `<tspan x="${x}" dy="${i ? lineHeight : 0}">${esc(line)}</tspan>`).join('') +
    '</text>';
}

function bullets(items, x, y, widthChars = 58, lineHeight = 22, gap = 8) {
  let cy = y;
  let out = '';
  for (const item of items) {
    const words = item.split(/\s+/);
    const wrapped = [];
    let row = '';
    for (const word of words) {
      if ((row + ' ' + word).trim().length > widthChars) {
        wrapped.push(row);
        row = word;
      } else row = (row + ' ' + word).trim();
    }
    if (row) wrapped.push(row);
    out += `<circle cx="${x}" cy="${cy - 5}" r="3" fill="#B8C2EA"/>`;
    out += lines(wrapped, x + 17, cy, 'body', lineHeight);
    cy += wrapped.length * lineHeight + gap;
  }
  return { out, y: cy };
}

function metricBand(metrics) {
  const x = 858, y = 690, w = 650, h = 150;
  const colW = w / metrics.length;
  let out = `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="url(#metricBg)" stroke="#8794CE" stroke-width="1.5"/>`;
  metrics.forEach((m, i) => {
    const cx = x + colW * i;
    if (i) out += `<line x1="${cx}" y1="${y + 20}" x2="${cx}" y2="${y + h - 20}" stroke="#263153"/>`;
    out += `<text x="${cx + colW / 2}" y="${y + 61}" class="metric" text-anchor="middle">${esc(m.value)}</text>`;
    out += lines(m.label, cx + colW / 2, y + 91, 'metricLabel', 20, 'middle');
  });
  out += '</g>';
  return out;
}

function deltaVisual() {
  const nodes = [
    [140, 320, 'Flight ops'], [260, 274, 'Scheduling'], [405, 309, 'Training'],
    [510, 382, 'Payroll'], [440, 470, 'Accommodation'], [290, 504, 'Routing'],
    [145, 455, 'Profiles'], [95, 385, 'Crew rules']
  ];
  let out = `<g><rect x="36" y="220" width="740" height="342" rx="18" fill="#F8F9FC" stroke="#20BED6" stroke-width="1.5"/>`;
  out += `<text x="406" y="257" text-anchor="middle" class="vizTitle dark">ENGINEERING CONTEXT LAYER</text>`;
  out += `<circle cx="405" cy="395" r="96" fill="url(#contextGlow)" stroke="#4B68D8" stroke-width="2"/>`;
  out += `<text x="405" y="386" text-anchor="middle" class="vizH dark">Unified context model</text>`;
  out += `<text x="405" y="411" text-anchor="middle" class="vizSmall">code + data + dependencies</text>`;
  for (const [x,y,label] of nodes) {
    out += `<line x1="405" y1="395" x2="${x}" y2="${y}" stroke="#A7B1CF" stroke-width="1.5" stroke-dasharray="4 5"/>`;
    out += `<circle cx="${x}" cy="${y}" r="28" fill="#FFFFFF" stroke="#7C89B8"/>`;
    out += `<text x="${x}" y="${y + 4}" text-anchor="middle" class="vizMicro">${esc(label)}</text>`;
  }
  out += `<g transform="translate(54,278)"><text class="vizMetric" x="0" y="0">6.2M</text><text class="vizSmall" x="0" y="20">lines of code</text><text class="vizMetric" x="0" y="72">52,017</text><text class="vizSmall" x="0" y="92">data interactions</text></g>`;
  out += `<g transform="translate(625,300)"><rect width="122" height="194" rx="14" fill="#071127" stroke="#2782F8"/><text x="61" y="31" text-anchor="middle" class="vizCap light">HARNESS</text><text x="61" y="66" text-anchor="middle" class="vizSmall light">understand</text><text x="61" y="98" text-anchor="middle" class="vizSmall light">generate</text><text x="61" y="130" text-anchor="middle" class="vizSmall light">verify</text><text x="61" y="168" text-anchor="middle" class="vizCap cyan">AT SCALE</text></g>`;
  out += '</g>';
  return out;
}

function umbVisual() {
  const lanes = [
    ['CUSTOM SOFTWARE', 'product changes'], ['PACKAGED APPS', 'configuration + integration'],
    ['JAVA / PLATFORM', 'upgrade + compatibility'], ['DATA + CLOUD', 'interfaces + operations']
  ];
  let out = `<g><rect x="36" y="220" width="740" height="342" rx="18" fill="#071127" stroke="#20BED6" stroke-width="1.5"/>`;
  out += `<text x="406" y="258" text-anchor="middle" class="vizTitle light">ONE TRANSFORMATION, MULTIPLE ENGINEERING SYSTEMS</text>`;
  lanes.forEach((l, i) => {
    const y = 285 + i * 58;
    out += `<rect x="67" y="${y}" width="224" height="42" rx="8" fill="#101B35" stroke="#2C8BFA"/>`;
    out += `<text x="84" y="${y+18}" class="vizCap cyan">${l[0]}</text><text x="84" y="${y+34}" class="vizMicro light">${l[1]}</text>`;
    out += `<line x1="292" y1="${y+21}" x2="392" y2="${y+21}" stroke="#3D77E5" stroke-width="2"/>`;
  });
  out += `<rect x="392" y="284" width="165" height="218" rx="20" fill="url(#coordFill)" stroke="#7E8FE8" stroke-width="1.5"/>`;
  out += `<text x="474" y="354" text-anchor="middle" class="vizCap light">AI DELIVERY</text><text x="474" y="378" text-anchor="middle" class="vizCap light">COORDINATION</text><text x="474" y="421" text-anchor="middle" class="vizSmall light">shared context</text><text x="474" y="445" text-anchor="middle" class="vizSmall light">sequenced change</text><text x="474" y="469" text-anchor="middle" class="vizSmall light">cross-stack proof</text>`;
  ['release plan','dependency map','integrated evidence'].forEach((t,i) => {
    const y=306+i*74;
    out += `<line x1="557" y1="${y+20}" x2="621" y2="${y+20}" stroke="#3D77E5" stroke-width="2"/>`;
    out += `<rect x="621" y="${y}" width="126" height="42" rx="8" fill="#101B35" stroke="#24BDD6"/><text x="684" y="${y+26}" text-anchor="middle" class="vizMicro light">${t}</text>`;
  });
  out += '</g>';
  return out;
}

function veridyanVisual() {
  const steps = ['Requirements','Experience design','Build','Test','Release'];
  let out = `<g><rect x="36" y="220" width="740" height="342" rx="18" fill="#F7F9FC" stroke="#20BED6" stroke-width="1.5"/>`;
  out += `<text x="406" y="257" text-anchor="middle" class="vizTitle dark">AI ACROSS THE DELIVERY LIFECYCLE</text>`;
  steps.forEach((s,i)=>{
    const x=67+i*136;
    out += `<circle cx="${x+48}" cy="340" r="43" fill="${i===4?'#E5F9F0':'#E9EEFF'}" stroke="${i===4?'#21A96D':'#5169D7'}" stroke-width="1.5"/>`;
    out += `<text x="${x+48}" y="338" text-anchor="middle" class="vizMicro dark">${s}</text>`;
    out += `<text x="${x+48}" y="356" text-anchor="middle" class="vizMicro ${i===4?'green':'blue'}">AI supported</text>`;
    if(i<steps.length-1) out += `<line x1="${x+92}" y1="340" x2="${x+135}" y2="340" stroke="#7F8DB8" stroke-width="2"/>`;
  });
  out += `<rect x="67" y="424" width="650" height="90" rx="14" fill="#071127"/>`;
  out += `<text x="92" y="457" class="vizCap cyan">FIVE PORTALS REQUIRED</text>`;
  for(let i=0;i<5;i++){
    const x=92+i*119;
    out += `<rect x="${x}" y="473" width="95" height="25" rx="6" fill="${i===0?'#164C3A':'#141F3D'}" stroke="${i===0?'#32C98A':'#53658E'}"/>`;
    out += `<text x="${x+47.5}" y="490" text-anchor="middle" class="vizMicro light">${i===0?'released?':'portal '+(i+1)}</text>`;
  }
  out += `<text x="717" y="540" text-anchor="end" class="vizMicro">Portal names and release status require confirmation</text>`;
  out += '</g>';
  return out;
}

function eyVisual() {
  let out = `<g><rect x="36" y="220" width="740" height="342" rx="18" fill="#071127" stroke="#20BED6" stroke-width="1.5"/>`;
  out += `<text x="406" y="258" text-anchor="middle" class="vizTitle light">ENTERPRISE ADOPTION OPERATING MODEL</text>`;
  const rings = [[405,392,126,'#2639B8'],[405,392,91,'#1D64C7'],[405,392,56,'#1EA7CE']];
  for(const [cx,cy,r,c] of rings) out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${c}" stroke-width="22" opacity=".8"/>`;
  out += `<circle cx="405" cy="392" r="37" fill="#0D1733" stroke="#43D0E1"/><text x="405" y="388" text-anchor="middle" class="vizCap light">~2,000</text><text x="405" y="407" text-anchor="middle" class="vizMicro light">participants</text>`;
  const labels=[[405,241,'ENABLEMENT'],[620,327,'GOVERNANCE'],[619,477,'COST CONTROL'],[191,477,'OPERATIONS'],[191,327,'MEASUREMENT']];
  labels.forEach(([x,y,t])=>{out += `<rect x="${x-68}" y="${y-18}" width="136" height="36" rx="18" fill="#111D3B" stroke="#5875D8"/><text x="${x}" y="${y+4}" text-anchor="middle" class="vizCap light">${t}</text>`});
  out += `<text x="67" y="528" class="vizSmall light">Scale requires governed access, support capacity, outcome measurement and unit economics.</text>`;
  out += `<text x="717" y="548" text-anchor="end" class="vizMicro">Participant definition and reporting period require confirmation</text>`;
  out += '</g>';
  return out;
}

function consilioVisual() {
  const rows=[['STARTING CONDITION','[content owner input]'],['AI APPROACH','[content owner input]'],['DELIVERY MODEL','[content owner input]'],['MEASURABLE OUTCOME','[content owner input]'],['LESSON LEARNED','[content owner input]']];
  let out = `<g><rect x="36" y="220" width="740" height="342" rx="18" fill="#F7F9FC" stroke="#20BED6" stroke-width="1.5"/>`;
  out += `<text x="406" y="257" text-anchor="middle" class="vizTitle dark">CASE EVIDENCE REQUIRED BEFORE PUBLICATION</text>`;
  rows.forEach((r,i)=>{const y=279+i*50;out += `<rect x="66" y="${y}" width="680" height="39" rx="8" fill="${i%2?'#EEF2FA':'#FFFFFF'}" stroke="#CFD7EA"/><text x="82" y="${y+25}" class="vizCap blue">${r[0]}</text><text x="330" y="${y+25}" class="vizSmall">${r[1]}</text>`});
  out += `<rect x="66" y="530" width="680" height="22" rx="6" fill="#FFF4D9"/><text x="406" y="546" text-anchor="middle" class="vizMicro amber">No differentiated claim has been inferred from the incomplete transcript.</text>`;
  out += '</g>';
  return out;
}

const cases = [
  {
    file: '07-delta-engineering-harness.svg', industry: 'Transportation & Logistics',
    client: ['A global enterprise operating a', 'large, modern engineering environment'],
    lead: ['Engineering harness for a complex environment'],
    challenge: ['Forward engineering spans millions of lines of code and more than 50,000 data', 'interactions. Tightly coupled dependencies require reliable context before AI can', 'change the system.'],
    solution: ['Create a context layer that maps code, data flows, business rules and dependencies.', 'Use an engineering harness to give AI governed context before it proposes a change.', 'Generate changes through repeatable patterns and verify them against system-level evidence.', 'Use this case as the presenter handoff into the context and harness story.'],
    benefits: ['More consistent changes across a large engineering estate.', 'Faster impact analysis and less manual discovery.', 'Verification evidence can scale with the volume of AI-generated change.'],
    metrics: [{value:'6.2M',label:['lines of code','reported figure']},{value:'52,017',label:['data interactions','reported figure']},{value:'[TBD]',label:['dependencies','to validate']}],
    note: 'Figures come from the supplied reference. Confirm definitions and publication permission.', visual: deltaVisual
  },
  {
    file: '08-umb-coordinated-transformation.svg', industry: 'Banking',
    client: ['A diversified financial institution with', 'multiple products and technology stacks'],
    lead: ['Coordinated transformation across technologies'],
    challenge: ['The program must move several forms of engineering work together. Custom software,', 'packaged applications and platform upgrades share dependencies, integration points', 'and release risk.'],
    solution: ['Plan the transformation as one portfolio rather than separate codebase initiatives.', 'Coordinate product changes, packaged application work, Java or platform upgrades and integrations.', 'Use shared context and cross-stack verification to expose dependencies before release.', 'Measure flow across teams and programs, including handoffs and blocked work.'],
    benefits: ['A single delivery view across products and technology stacks.', 'Earlier visibility into cross-team dependencies and release conflicts.', 'AI improves the whole program when coordination evidence guides local engineering work.'],
    metrics: [{value:'[TBD]',label:['programs','in scope']},{value:'[TBD]',label:['delivery teams','coordinated']},{value:'[TBD]',label:['productivity','change']}],
    note: 'All scale and outcome figures require confirmation from the content owner.', visual: umbVisual
  },
  {
    file: '09-veridyan-end-to-end-ai-delivery.svg', industry: 'Healthcare & Life Sciences',
    client: ['A startup-like product environment building', 'a portfolio of digital portals'],
    lead: ['End-to-end AI delivery with a lean team'],
    challenge: ['The organization needs five portals and has limited external support. The delivery', 'model must carry each product from requirements through release without creating', 'disconnected handoffs.'],
    solution: ['Use AI to structure requirements and maintain traceability into design and implementation.', 'Apply AI during experience design, development, testing and release preparation.', 'Reuse patterns and evidence across the portal portfolio while preserving product differences.', 'Confirm the released portal, timing and remaining portal scope before final publication.'],
    benefits: ['One continuous delivery model across the full lifecycle.', 'A lean team can reuse context and verification assets across portals.', 'Results and timing remain intentionally unstated until the full case evidence is supplied.'],
    metrics: [{value:'5',label:['portals','required']},{value:'[NAME]',label:['portal released','confirm']},{value:'[TBD]',label:['cycle time','and team size']}],
    note: 'The five-portal requirement came from the supplied material. Release status, results and timing require confirmation.', visual: veridyanVisual
  },
  {
    file: '10-ey-enterprise-adoption-at-scale.svg', industry: 'Professional Services', hideBrand: true,
    client: ['A global enterprise scaling AI adoption', 'across teams, programs and functions'],
    lead: ['Enterprise adoption at scale'],
    challenge: ['Adoption at this scale creates an operating-system problem. Access, support and', 'governance must keep pace with enablement, measurement and cost control as many', 'teams use AI every day.'],
    solution: ['Establish a governed access model with clear ownership, approved tools and support paths.', 'Build enablement around real roles and workflows, then track adoption and proficiency by cohort.', 'Measure productivity and quality by program instead of relying on raw activity metrics.', 'Manage tokens and model usage through budgets, routing, observability and unit-cost targets.'],
    benefits: ['Leaders can distinguish participation from sustained, productive use.', 'Governance and support scale with the number of teams and programs.', 'Cost management connects token consumption to verified delivery outcomes.'],
    metrics: [{value:'~2,000',label:['participants','definition TBD']},{value:'[TBD]',label:['programs / teams','in scope']},{value:'[VALIDATE]',label:['tokens + cost','do not publish yet']}],
    note: 'Validate participant count, reporting period, token volume, productivity method and disclosure permission.', visual: eyVisual
  },
  {
    file: '11-consilio-distinct-ai-use-case.svg', industry: 'Legal Technology',
    client: ['A legal technology organization with', 'a distinct business and engineering need'],
    lead: ['Distinct AI use case pending case evidence'],
    challenge: ['The available transcript does not establish the starting condition, delivery scope or', 'measurable result. A specific claim would be speculative until the content owner', 'supplies the facts.'],
    solution: ['Document the business problem and the engineering constraint in concrete terms.', 'Specify the AI approach, including where people review or approve the work.', 'Describe the delivery model, system boundaries and operating controls.', 'Add a measured outcome with baseline, comparison period and evidence source.'],
    benefits: ['A dedicated example that does not duplicate another legal technology story.', 'A credible lesson grounded in the actual delivery model and measured result.', 'Publication remains blocked until the five required fact groups are complete.'],
    metrics: [{value:'[BASELINE]',label:['starting','condition']},{value:'[OUTCOME]',label:['measured','result']},{value:'[LESSON]',label:['evidence-backed','takeaway']}],
    note: 'Content-owner input required. No client, tool, outcome or productivity claim has been inferred.', visual: consilioVisual
  }
];

function svg(c, index) {
  const sol = bullets(c.solution, 858, 203, 64, 21, 7);
  const benY = Math.max(468, sol.y + 22);
  const ben = bullets(c.benefits, 858, benY + 47, 66, 21, 7);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#18BED5"/><stop offset="1" stop-color="#2782F8"/></linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B142A"/><stop offset="1" stop-color="#030A1A"/></linearGradient>
    <linearGradient id="metricBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#172139"/><stop offset="1" stop-color="#0C1429"/></linearGradient>
    <linearGradient id="contextGlow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EEF1FF"/><stop offset="1" stop-color="#DCE9FA"/></linearGradient>
    <linearGradient id="coordFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#303DA8"/><stop offset="1" stop-color="#142052"/></linearGradient>
    <style>
      text{font-family:Inter,Arial,sans-serif}.industry{font-size:42px;font-weight:780;fill:#fff;letter-spacing:-.6px}.section{font-size:24px;font-weight:760;fill:#fff}.client{font-size:35px;font-weight:760;fill:url(#accent);letter-spacing:-.4px}.lead{font-size:24px;font-weight:760;fill:#fff}.copy{font-size:18px;font-weight:430;fill:#C5CDEF}.panelTitle{font-size:26px;font-weight:760;fill:#fff}.body{font-size:16.5px;font-weight:430;fill:#C5CDEF}.metric{font-size:38px;font-weight:450;fill:#19BCE4}.metricLabel{font-size:15px;font-weight:520;fill:#C7CFEE}.note{font-size:10.5px;font-weight:500;fill:#7D879F}.brand{font-size:22px;font-weight:800;font-style:italic;fill:#fff;letter-spacing:-.6px}.vizTitle{font-size:14px;font-weight:800;letter-spacing:1.5px}.vizH{font-size:16px;font-weight:760}.vizMetric{font-size:22px;font-weight:780;fill:#17203A}.vizCap{font-size:11px;font-weight:800;letter-spacing:.8px}.vizSmall{font-size:12px;font-weight:520;fill:#68738D}.vizMicro{font-size:10px;font-weight:650;fill:#69748E}.dark{fill:#17203A}.light{fill:#ECF1FF}.cyan{fill:#1BC5E1}.blue{fill:#3A55C9}.green{fill:#17885B}.amber{fill:#A36B00}
    </style>
  </defs>
  <rect width="1600" height="900" fill="#000"/>
  <text x="36" y="62" class="industry">${esc(c.industry)}</text>
  ${c.hideBrand ? '' : '<text x="1538" y="45" text-anchor="end" class="brand">HEXaware</text>'}
  <text x="36" y="111" class="section">Client</text>
  ${lines(c.client,36,151,'client',40)}
  ${c.visual()}
  ${lines(c.lead,36,610,'lead',28)}
  ${lines(c.challenge,36,654,'copy',27)}
  <path d="M842 90H1460Q1515 90 1548 150L1575 197V852H842Q812 852 812 822V120Q812 90 842 90Z" fill="url(#panel)" stroke="#7E8BC6" stroke-width="1.5"/>
  <text x="858" y="157" class="panelTitle">Solution</text>
  ${sol.out}
  <text x="858" y="${benY}" class="panelTitle">Benefits</text>
  ${ben.out}
  ${metricBand(c.metrics)}
  <text x="36" y="878" class="note">© Hexaware Technologies. Confidential briefing.</text>
  <text x="812" y="878" class="note">${esc(c.note)}</text>
  <text x="1540" y="878" text-anchor="end" class="note">${index + 7}</text>
</svg>`;
}

for (const [i, c] of cases.entries()) {
  fs.writeFileSync(path.join(OUT, c.file), svg(c, i));
}

console.log(`Generated ${cases.length} SVG slides in ${OUT}`);
