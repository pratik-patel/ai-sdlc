const app = document.querySelector('#app');
const THREAD_ID = 'wth_customer_escalation';

let work = null;
let submitting = false;
let toastTimer = null;

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function slug(value = '') {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: options.body ? { 'content-type': 'application/json', ...(options.headers || {}) } : options.headers
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error?.message || 'The work thread could not be updated.');
  return payload.data;
}

function statusLabel(value) {
  return String(value).replaceAll('_', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

function trustMark(clause) {
  return `<span class="trust-mark ${slug(clause.epistemic)}"><span aria-hidden="true"></span>${escapeHtml(statusLabel(clause.epistemic))}</span>`;
}

function decisionMark(clause) {
  return `<span class="decision-mark ${slug(clause.decision)}">${escapeHtml(statusLabel(clause.decision))}</span>`;
}

function showToast(message) {
  const region = document.querySelector('#toast-region');
  if (!region) return;
  region.innerHTML = `<div class="toast" role="status">${escapeHtml(message)}</div>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { if (region) region.innerHTML = ''; }, 4200);
}

function episodeMap(data) {
  return `<ol class="episode-map" aria-label="Intent to Trusted Draft workflow">
    ${data.moments.map((moment, index) => `<li class="episode-step ${moment.state}" ${moment.state === 'active' ? 'aria-current="step"' : ''}>
      <span class="episode-index">${moment.state === 'complete' ? '✓' : index + 1}</span>
      <span><strong>${escapeHtml(moment.eyebrow)}</strong><small>${moment.state === 'active' ? 'Working now' : moment.state === 'complete' ? 'Decision captured' : 'Will emerge when needed'}</small></span>
    </li>`).join('')}
  </ol>`;
}

function workThreadHeader(data) {
  const { thread, progress } = data;
  return `<header class="work-thread-header">
    <a class="brand" href="#/work/${THREAD_ID}" aria-label="AgentGrid work thread home"><span class="brand-mark">AG</span><span><strong>AgentGrid</strong><small>Work through consequence</small></span></a>
    <div class="thread-identity">
      <span class="thread-kicker">Work Thread · ${escapeHtml(thread.id)}</span>
      <strong>${escapeHtml(thread.title)}</strong>
    </div>
    <div class="thread-state">
      <span class="status ${slug(thread.status)}">${escapeHtml(statusLabel(thread.status))}</span>
      <span class="progress-copy">${progress.completed} of ${progress.total} decisions captured</span>
      <button class="text-action" type="button" data-action="reset-thread">Restart</button>
      <button class="avatar" type="button" data-action="show-identity" aria-label="Signed in as Maya Chen">MC</button>
    </div>
    <div class="progress-line" aria-label="${progress.percent}% of draft workflow complete"><span style="width:${progress.percent}%"></span></div>
  </header>`;
}

function activeMoment(data) {
  const { moment, thread } = data;
  if (thread.status === 'trusted_draft') return committedMoment(data);
  const options = moment.options.map((option, index) => `<button class="choice" type="button" data-action="respond" data-option="${escapeHtml(option.id)}" ${submitting ? 'disabled' : ''}>
    <span class="choice-key">${String.fromCharCode(65 + index)}</span>
    <span><strong>${escapeHtml(option.label)}</strong><small>${escapeHtml(option.description)}</small></span>
    <span class="choice-arrow" aria-hidden="true">→</span>
  </button>`).join('');
  const latestContribution = data.contributions.at(-1);
  return `<section class="dialogue" aria-labelledby="moment-title">
    <div class="dialogue-agent"><span class="agent-orbit" aria-hidden="true"><span></span></span><span><strong>${escapeHtml(moment.agent)}</strong><small>Working from ${data.clauses.filter((clause) => clause.epistemic === 'sourced').length} sourced clauses and ${data.gaps.filter((gap) => gap.state !== 'resolved').length} open gaps</small></span></div>
    <div class="moment-copy">
      <span class="moment-eyebrow">${escapeHtml(moment.eyebrow)}</span>
      <h1 id="moment-title">${escapeHtml(moment.title)}</h1>
      <p class="agent-message">${escapeHtml(moment.message)}</p>
    </div>
    ${latestContribution && moment.id === 'authority_envelope' ? `<blockquote class="contribution"><span>Priya Singh · Policy owner</span><p>${escapeHtml(latestContribution.statement)}</p><cite>${escapeHtml(latestContribution.source)}</cite></blockquote>` : ''}
    <div class="question-block">
      <h2>${escapeHtml(moment.question)}</h2>
      <div class="choices">${options}</div>
      <p class="consequence"><span>Consequence</span>${escapeHtml(moment.consequence)}</p>
    </div>
  </section>`;
}

function committedMoment(data) {
  const accepted = data.clauses.filter((clause) => clause.decision === 'accepted as draft');
  const unresolved = data.gaps.filter((gap) => gap.state !== 'resolved');
  return `<section class="dialogue committed" aria-labelledby="moment-title">
    <div class="commit-signal" aria-hidden="true">✓</div>
    <div class="moment-copy">
      <span class="moment-eyebrow">Trusted Draft committed</span>
      <h1 id="moment-title">The team can now compose from the same working agreement.</h1>
      <p class="agent-message">The draft preserves why the work began, which evidence shaped it, who made each material decision, and what must be proven before release.</p>
    </div>
    <div class="commit-summary" aria-label="Trusted Draft summary">
      <div><strong>${accepted.length}</strong><span>accepted clauses</span></div>
      <div><strong>${data.decisions.length}</strong><span>material decisions</span></div>
      <div><strong>${unresolved.length}</strong><span>visible obligations</span></div>
    </div>
    <div class="next-episode">
      <span class="moment-eyebrow">Next connected episode</span>
      <strong>${escapeHtml(data.thread.nextEpisode)}</strong>
      <p>The Living Specification, Service Sketch, authority, evidence, and gaps will continue—not be recreated in a builder form.</p>
    </div>
  </section>`;
}

function livingSpecification(data) {
  const current = data.thread.currentMoment;
  return `<section class="living-spec" aria-labelledby="living-title">
    <header class="living-head">
      <div><span class="section-kicker">Living Specification</span><h2 id="living-title">What the team currently believes</h2></div>
      <span class="version">draft 0.${Math.min(data.decisions.length + 1, 9)}</span>
    </header>
    <div class="clause-list">
      ${data.clauses.map((clause) => `<article class="clause ${clause.revealedAt === current ? 'changed-now' : ''}">
        <div class="clause-top"><span class="clause-family">${escapeHtml(clause.family)}</span>${clause.revealedAt === current ? '<span class="changed-label">Changed now</span>' : ''}</div>
        <p>${escapeHtml(clause.statement)}</p>
        <div class="clause-meta">${trustMark(clause)}${decisionMark(clause)}</div>
        <div class="clause-source"><span>Source</span>${escapeHtml(clause.source)}</div>
      </article>`).join('')}
    </div>
  </section>`;
}

function serviceSketch(data) {
  return `<section class="service-sketch" aria-labelledby="sketch-title">
    <header><span class="section-kicker">Service Sketch</span><h2 id="sketch-title">Responsibility moves through the work</h2></header>
    <ol class="sketch-flow">
      ${data.serviceSketch.map((step, index) => `<li class="sketch-node ${slug(step.type)} ${step.revealedAt === data.thread.currentMoment ? 'changed-now' : ''}">
        <span class="sketch-type">${escapeHtml(step.type)}</span><strong>${escapeHtml(step.label)}</strong>${index < data.serviceSketch.length - 1 ? '<span class="flow-arrow" aria-hidden="true">→</span>' : ''}
      </li>`).join('')}
    </ol>
  </section>`;
}

function continuityRail(data) {
  const openGaps = data.gaps.filter((gap) => gap.state !== 'resolved');
  const latest = data.decisions.at(-1);
  return `<section class="continuity-rail" aria-label="Decisions, gaps, and continuity">
    <div class="continuity-block">
      <span class="section-kicker">Why this thread exists</span>
      <strong>${escapeHtml(data.thread.arrival.reason)}</strong>
      <small>${escapeHtml(data.thread.arrival.source)} · ${escapeHtml(data.thread.arrival.consequence)}</small>
    </div>
    <div class="continuity-block">
      <span class="section-kicker">Open obligations · ${openGaps.length}</span>
      ${openGaps.length ? openGaps.map((gap) => `<div class="gap"><span class="gap-state ${slug(gap.state)}"></span><span><strong>${escapeHtml(gap.title)}</strong><small>${escapeHtml(gap.owner)} · ${escapeHtml(statusLabel(gap.state))}</small></span></div>`).join('') : '<strong>No unresolved material gaps</strong>'}
    </div>
    <div class="continuity-block latest-decision">
      <span class="section-kicker">Latest decision</span>
      ${latest ? `<strong>${escapeHtml(latest.decision)}</strong><small>${escapeHtml(latest.momentTitle)} · ${escapeHtml(latest.madeBy)}</small>` : '<strong>No decision captured yet</strong><small>The source of arrival is already preserved.</small>'}
      ${data.decisions.length ? `<details><summary>Review decision ledger (${data.decisions.length})</summary><ol>${data.decisions.map((decision) => `<li><strong>${escapeHtml(decision.decision)}</strong><small>${escapeHtml(decision.momentTitle)} · ${escapeHtml(decision.madeBy)}</small></li>`).join('')}</ol></details>` : ''}
    </div>
  </section>`;
}

function render() {
  if (!work) return;
  const emphasis = work.thread.status === 'trusted_draft' ? 'is-committed' : `moment-${work.thread.currentMoment}`;
  app.innerHTML = `<div class="product ${emphasis}">
    ${workThreadHeader(work)}
    <main class="experience">
      ${episodeMap(work)}
      <div class="adaptive-surface">
        ${activeMoment(work)}
        <div class="materialized-work">${livingSpecification(work)}${serviceSketch(work)}</div>
      </div>
      ${continuityRail(work)}
    </main>
    <div id="toast-region" aria-live="polite"></div>
  </div>`;
  document.title = `${work.thread.status === 'trusted_draft' ? 'Trusted Draft' : work.moment.eyebrow} · AgentGrid`;
}

async function loadThread() {
  app.innerHTML = '<div class="boot-screen"><div class="boot-mark">AG</div><p>Restoring the work thread…</p></div>';
  try {
    work = await api(`/api/work-threads/${THREAD_ID}/intent-draft`);
    render();
  } catch (error) {
    app.innerHTML = `<div class="error-state"><strong>Work thread unavailable</strong><p>${escapeHtml(error.message)}</p><button type="button" data-action="retry">Try again</button></div>`;
  }
}

app.addEventListener('click', async (event) => {
  const target = event.target.closest('[data-action]');
  if (!target || submitting) return;
  const action = target.dataset.action;
  if (action === 'show-identity') {
    showToast('Maya Chen · Technical service owner · Customer Operations');
    return;
  }
  if (action === 'retry') return loadThread();
  if (action === 'reset-thread') {
    submitting = true;
    try {
      work = await api(`/api/work-threads/${THREAD_ID}/commands/reset`, { method: 'POST', body: '{}' });
      submitting = false;
      render();
      showToast('The prototype thread was restarted.');
    } catch (error) { submitting = false; showToast(error.message); }
    return;
  }
  if (action === 'respond') {
    submitting = true;
    const priorMoment = work.moment.id;
    render();
    try {
      work = await api(`/api/work-threads/${THREAD_ID}/commands/respond`, {
        method: 'POST',
        body: JSON.stringify({ optionId: target.dataset.option, madeBy: 'Maya Chen' })
      });
      submitting = false;
      render();
      const focusTarget = document.querySelector('#moment-title');
      focusTarget?.setAttribute('tabindex', '-1');
      focusTarget?.focus();
      showToast(priorMoment === 'trusted_draft' ? 'Trusted Draft committed. Composition can begin from this agreement.' : 'Decision captured. The contract and service sketch have been updated.');
    } catch (error) {
      submitting = false;
      render();
      showToast(error.message);
    }
  }
});

if (!location.hash) location.hash = `#/work/${THREAD_ID}`;
loadThread();
