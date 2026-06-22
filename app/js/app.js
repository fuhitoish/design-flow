import {
  MODULES,
  PHASE_MAP,
  FLOW_ORDER,
  CORE_STEPS,
  MODULE_CHECKS,
  COPY_STEP,
  FINAL_GATE,
  PRODUCTION_STEP,
  GATE_LOG_STEPS,
} from './steps.js';
import {
  loadAll,
  upsertProject,
  deleteProject,
  getProject,
  createEmptyProject,
  exportProject,
  importProjectFile,
  today,
} from './store.js';
import { createBellagioSample } from './sample.js';

let state = {
  view: 'dashboard',
  projectId: null,
  stepKey: '1',
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

init();

function init() {
  window.addEventListener('hashchange', route);
  route();
}

function route() {
  const hash = location.hash.slice(1) || 'dashboard';
  const [view, id, step] = hash.split('/');
  if (view === 'project' && id) {
    state.view = 'project';
    state.projectId = id;
    state.stepKey = step || getProject(id)?.currentStepKey || '1';
  } else {
    state.view = 'dashboard';
    state.projectId = null;
  }
  render();
}

function navigate(hash) {
  location.hash = hash;
}

function render() {
  const app = $('#app');
  if (state.view === 'dashboard') {
    app.innerHTML = renderDashboard();
    bindDashboard();
  } else {
    const project = getProject(state.projectId);
    if (!project) {
      navigate('dashboard');
      return;
    }
    app.innerHTML = renderProject(project);
    bindProject(project);
    lucide.createIcons();
  }
}

/* ── Dashboard ── */

function renderDashboard() {
  const projects = loadAll().sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  return `
    <header class="top-bar">
      <a href="../DOCS/index.html" class="back-link"><i data-lucide="arrow-left"></i> ガイドに戻る</a>
      <span class="app-badge">試用システム Phase 1</span>
    </header>
    <main class="dashboard">
      <div class="dashboard-head">
        <div>
          <h1>Design Flow</h1>
          <p class="lead">案件を作成し、Step ごとにチェックリストと記録を進めます。データはブラウザに保存されます。</p>
        </div>
        <div class="dash-actions">
          <button type="button" class="btn btn-primary" id="btn-new">+ 新規案件</button>
          <button type="button" class="btn btn-secondary" id="btn-sample">サンプルを追加</button>
          <label class="btn btn-secondary">
            JSON インポート
            <input type="file" id="import-file" accept=".json" hidden>
          </label>
        </div>
      </div>
      <div class="project-grid">
        ${projects.length ? projects.map(renderProjectCard).join('') : `
          <div class="empty-state card">
            <p>案件がありません。「新規案件」または「サンプルを追加」から始めてください。</p>
          </div>
        `}
      </div>
    </main>
  `;
}

function renderProjectCard(p) {
  const phase = PHASE_MAP[p.currentStepKey] || PHASE_MAP['1'];
  const mod = MODULES[p.moduleType];
  const done = countCompletedSteps(p);
  const total = FLOW_ORDER.length;
  const pct = Math.round((done / total) * 100);
  return `
    <article class="project-card card" data-id="${p.id}">
      <div class="card-top">
        <h2>${esc(p.name || '（無題）')}</h2>
        <span class="mod-tag mod-${p.moduleType.toLowerCase()}">${mod?.label || p.moduleType}</span>
      </div>
      <p class="card-client">${esc(p.client || '—')}</p>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      <p class="card-meta">
        <span>${phase.step}</span>
        <span>${phase.industry}</span>
        <span>${done}/${total} 完了</span>
      </p>
      <div class="card-actions">
        <button type="button" class="btn btn-sm btn-primary btn-open" data-id="${p.id}">開く</button>
        <button type="button" class="btn btn-sm btn-ghost btn-export" data-id="${p.id}">JSON</button>
        <button type="button" class="btn btn-sm btn-danger btn-delete" data-id="${p.id}">削除</button>
      </div>
    </article>
  `;
}

function bindDashboard() {
  lucide.createIcons();
  $('#btn-new')?.addEventListener('click', () => {
    const p = createEmptyProject();
    upsertProject(p);
    navigate(`project/${p.id}/1`);
  });
  $('#btn-sample')?.addEventListener('click', () => {
    const p = createBellagioSample();
    upsertProject(p);
    navigate(`project/${p.id}/6`);
  });
  $('#import-file')?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const p = await importProjectFile(file);
      navigate(`project/${p.id}/${p.currentStepKey}`);
    } catch {
      alert('JSON の読み込みに失敗しました。');
    }
    e.target.value = '';
  });
  $$('.btn-open').forEach((btn) => {
    btn.addEventListener('click', () => {
      const p = getProject(btn.dataset.id);
      navigate(`project/${btn.dataset.id}/${p?.currentStepKey || '1'}`);
    });
  });
  $$('.btn-export').forEach((btn) => {
    btn.addEventListener('click', () => {
      const p = getProject(btn.dataset.id);
      if (p) exportProject(p);
    });
  });
  $$('.btn-delete').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (confirm('この案件を削除しますか？')) {
        deleteProject(btn.dataset.id);
        render();
      }
    });
  });
}

/* ── Project view ── */

function renderProject(p) {
  const phase = PHASE_MAP[state.stepKey] || PHASE_MAP['1'];
  return `
    <header class="top-bar project-bar">
      <a href="#dashboard" class="back-link"><i data-lucide="arrow-left"></i> 案件一覧</a>
      <div class="project-title-bar">
        <input type="text" class="project-name-input" id="project-name" value="${esc(p.name)}" placeholder="プロジェクト名">
        <span class="phase-pill">${phase.industry}</span>
      </div>
      <button type="button" class="btn btn-sm btn-secondary" id="btn-export">エクスポート</button>
    </header>
    <div class="project-layout">
      <aside class="sidebar">
        ${renderSidebar(p)}
      </aside>
      <main class="step-panel" id="step-panel">
        ${renderStepContent(p, state.stepKey)}
      </main>
    </div>
  `;
}

function renderSidebar(p) {
  const items = FLOW_ORDER.map((key) => {
    const ph = PHASE_MAP[key];
    const active = key === state.stepKey;
    const done = isStepComplete(p, key);
    const locked = isStepLocked(p, key);
    const star = ph.star ? ' ★' : '';
    return `
      <button type="button" class="nav-item ${active ? 'active' : ''} ${done ? 'done' : ''} ${locked ? 'locked' : ''}"
        data-step="${key}" ${locked ? 'disabled' : ''}>
        <span class="nav-dot">${done ? '✓' : locked ? '·' : '○'}</span>
        <span class="nav-text">
          <strong>${ph.step}${star}</strong>
          <small>${ph.industry}</small>
        </span>
      </button>
    `;
  }).join('');

  return `
    <div class="sidebar-meta card">
      <label>クライアント<input type="text" id="field-client" value="${esc(p.client)}"></label>
      <label>モジュール
        <select id="field-module" ${isModuleLocked(p) ? 'disabled' : ''}>
          ${Object.values(MODULES).map((m) => `
            <option value="${m.id}" ${p.moduleType === m.id ? 'selected' : ''}>${m.label}</option>
          `).join('')}
        </select>
      </label>
      <label>次のアクション<input type="text" id="field-next" value="${esc(p.nextAction)}"></label>
      <label>ブロック要因<input type="text" id="field-blockers" value="${esc(p.blockers)}"></label>
    </div>
    <nav class="step-nav">${items}</nav>
    <div class="sidebar-footer card">
      <h4>ゲート通過記録</h4>
      ${renderGateLogMini(p)}
    </div>
  `;
}

function renderGateLogMini(p) {
  return `<ul class="gate-mini">${GATE_LOG_STEPS.map(({ key, label, phase }) => {
    const log = p.gateLog?.[key];
    return `<li class="${log?.date ? 'passed' : ''}"><span>${label}</span><span>${log?.date || '—'}</span></li>`;
  }).join('')}</ul>`;
}

function renderStepContent(p, key) {
  if (key === 'gate') return renderFinalGate(p);
  if (key === 'copy') return renderCopyStep(p);
  if (key === '6') return renderProductionStep(p);
  if (key === '5') return renderModuleStep(p);
  return renderCoreStep(p, key);
}

function renderCoreStep(p, key) {
  const def = CORE_STEPS[key];
  const ph = PHASE_MAP[key];
  return stepShell(def.title, def.subtitle, ph, renderFields(p, key, def.fields), renderChecks(p, key, def.checks), renderRetro(p));
}

function renderModuleStep(p) {
  const def = MODULE_CHECKS[p.moduleType];
  const ph = PHASE_MAP['5'];
  return stepShell(def.title, def.subtitle, ph, renderFields(p, '5', def.fields), renderChecks(p, '5', def.checks), renderRetro(p));
}

function renderCopyStep(p) {
  const ph = PHASE_MAP.copy;
  const skipBlock = `
    <label class="skip-copy">
      <input type="checkbox" id="copy-skipped" ${p.copySkipped ? 'checked' : ''}>
      文案変更なし — 仮原稿 = 本番としてスキップ
    </label>
  `;
  return stepShell(
    COPY_STEP.title,
    COPY_STEP.subtitle,
    ph,
    skipBlock + (p.copySkipped ? '<p class="hint">スキップ時は status に記録して次へ進めます。</p>' : renderFields(p, 'copy', COPY_STEP.fields)),
    p.copySkipped ? '' : renderChecks(p, 'copy', COPY_STEP.checks),
    renderRetro(p)
  );
}

function renderFinalGate(p) {
  const ph = PHASE_MAP.gate;
  const items = FINAL_GATE.items.map((item) => {
    const val = p.gateAnswers?.[item.id] || '';
    return `
      <div class="gate-row">
        <span class="gate-label">${esc(item.label)}</span>
        <div class="gate-btns">
          <button type="button" class="gate-btn yes ${val === 'yes' ? 'on' : ''}" data-gate="${item.id}" data-val="yes">YES</button>
          <button type="button" class="gate-btn no ${val === 'no' ? 'on' : ''}" data-gate="${item.id}" data-val="no">NO</button>
        </div>
        <small class="retro-hint">NO → ${item.retro}</small>
      </div>
    `;
  }).join('');

  const memos = FINAL_GATE.memoFields.map((f) => `
    <label>${f.label}<input type="text" data-gate-memo="${f.id}" value="${esc(p.gateMemo?.[f.id] || '')}"></label>
  `).join('');

  const allYes = FINAL_GATE.items.every((i) => p.gateAnswers?.[i.id] === 'yes');

  return `
    <div class="step-header">
      <p class="section-label">${ph.industry} · ${ph.diamond}</p>
      <h2>${FINAL_GATE.title}</h2>
      <p class="step-sub">${FINAL_GATE.subtitle}</p>
    </div>
    <div class="card gate-card">${items}</div>
    <div class="card"><h3>口述メモ（任意）</h3><div class="field-grid">${memos}</div></div>
    ${renderRetro(p)}
    <div class="step-actions">
      <button type="button" class="btn btn-primary" id="btn-complete" ${allYes ? '' : 'disabled'}>
        最終ゲート通過 → Step 6 へ
      </button>
      ${!allYes ? '<p class="action-hint">6項目すべて YES で通過できます。</p>' : ''}
    </div>
  `;
}

function renderProductionStep(p) {
  const def = PRODUCTION_STEP;
  const ph = PHASE_MAP['6'];
  return stepShell(def.title, def.subtitle, ph, renderFields(p, '6', def.fields), renderChecks(p, '6', def.checks), renderRetro(p), true);
}

function stepShell(title, subtitle, ph, fieldsHtml, checksHtml, retroHtml, isFinal = false) {
  return `
    <div class="step-header">
      <p class="section-label">${ph.industry} · ${ph.diamond}</p>
      <h2>${title}</h2>
      <p class="step-sub">${subtitle}</p>
    </div>
    ${fieldsHtml ? `<div class="card"><h3>記入</h3>${fieldsHtml}</div>` : ''}
    ${checksHtml ? `<div class="card"><h3>チェックリスト</h3>${checksHtml}</div>` : ''}
    <div class="card">
      <h3>この Step のメモ</h3>
      <textarea class="step-note" rows="3" placeholder="自由メモ…"></textarea>
    </div>
    ${retroHtml}
    <div class="step-actions">
      ${isFinal ? `
        <button type="button" class="btn btn-primary" id="btn-complete-final">案件を完了にする</button>
      ` : `
        <button type="button" class="btn btn-primary" id="btn-complete">この Step を完了して次へ</button>
        <p class="action-hint" id="complete-hint"></p>
      `}
    </div>
  `;
}

function renderFields(p, key, fields) {
  if (!fields?.length) return '';
  return `<div class="field-grid">${fields.map((f) => {
    const val = p.fields?.[key]?.[f.id] || '';
    if (f.type === 'textarea') {
      return `<label>${f.label}<textarea data-field="${key}.${f.id}" rows="${f.rows || 3}">${esc(val)}</textarea></label>`;
    }
    return `<label>${f.label}<input type="text" data-field="${key}.${f.id}" value="${esc(val)}"></label>`;
  }).join('')}</div>`;
}

function renderChecks(p, key, checks) {
  if (!checks?.length) return '';
  const done = checks.filter((c) => p.checks?.[key]?.[c.id]).length;
  return `
    <p class="check-progress">${done} / ${checks.length} 完了</p>
    <ul class="check-list">
      ${checks.map((c) => `
        <li>
          <label>
            <input type="checkbox" data-check="${key}.${c.id}" ${p.checks?.[key]?.[c.id] ? 'checked' : ''}>
            ${esc(c.label)}
          </label>
        </li>
      `).join('')}
    </ul>
  `;
}

function renderRetro(p) {
  const rows = (p.retroLog || []).map((r, i) => `
    <tr>
      <td>${esc(r.date)}</td>
      <td>${esc(r.foundAt)}</td>
      <td>${esc(r.retroTo)}</td>
      <td>${esc(r.reason)}</td>
      <td>${esc(r.resolution)}</td>
      <td><button type="button" class="btn-icon" data-del-retro="${i}">×</button></td>
    </tr>
  `).join('');

  return `
    <div class="card retro-card">
      <h3>遡及ログ</h3>
      <table class="retro-table">
        <thead><tr><th>日付</th><th>発見</th><th>遡及先</th><th>理由</th><th>解決</th><th></th></tr></thead>
        <tbody>${rows || '<tr><td colspan="6" class="empty">記録なし</td></tr>'}</tbody>
      </table>
      <div class="retro-form">
        <input type="date" id="retro-date" value="${today()}">
        <input type="text" id="retro-found" placeholder="発見 Step">
        <input type="text" id="retro-to" placeholder="遡及先">
        <input type="text" id="retro-reason" placeholder="理由">
        <input type="text" id="retro-resolution" placeholder="解決内容">
        <button type="button" class="btn btn-sm btn-secondary" id="btn-add-retro">追加</button>
      </div>
    </div>
  `;
}

/* ── Bindings ── */

function bindProject(p) {
  $('#project-name')?.addEventListener('input', (e) => {
    p.name = e.target.value;
    save(p);
  });
  $('#field-client')?.addEventListener('input', (e) => { p.client = e.target.value; save(p); });
  $('#field-next')?.addEventListener('input', (e) => { p.nextAction = e.target.value; save(p); });
  $('#field-blockers')?.addEventListener('input', (e) => { p.blockers = e.target.value; save(p); });
  $('#field-module')?.addEventListener('change', (e) => { p.moduleType = e.target.value; save(p); render(); });
  $('#btn-export')?.addEventListener('click', () => exportProject(p));

  const noteEl = $('.step-note');
  if (noteEl) {
    noteEl.value = p.stepNotes?.[state.stepKey] || '';
    noteEl.addEventListener('input', (e) => {
      if (!p.stepNotes) p.stepNotes = {};
      p.stepNotes[state.stepKey] = e.target.value;
      save(p);
    });
  }

  $$('[data-field]').forEach((el) => {
    el.addEventListener('input', () => {
      const [key, id] = el.dataset.field.split('.');
      if (!p.fields[key]) p.fields[key] = {};
      p.fields[key][id] = el.value;
      if (key === '1' && id === 'projectName') p.name = el.value;
      save(p);
      updateCompleteHint(p);
    });
  });

  $$('[data-check]').forEach((el) => {
    el.addEventListener('change', () => {
      const [key, id] = el.dataset.check.split('.');
      if (!p.checks[key]) p.checks[key] = {};
      p.checks[key][id] = el.checked;
      save(p);
      render();
    });
  });

  $$('.gate-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!p.gateAnswers) p.gateAnswers = {};
      p.gateAnswers[btn.dataset.gate] = btn.dataset.val;
      save(p);
      render();
    });
  });

  $$('[data-gate-memo]').forEach((el) => {
    el.addEventListener('input', () => {
      if (!p.gateMemo) p.gateMemo = {};
      p.gateMemo[el.dataset.gateMemo] = el.value;
      save(p);
    });
  });

  $('#copy-skipped')?.addEventListener('change', (e) => {
    p.copySkipped = e.target.checked;
    save(p);
    render();
  });

  $$('.nav-item:not(.locked)').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`project/${p.id}/${btn.dataset.step}`));
  });

  $('#btn-complete')?.addEventListener('click', () => completeStep(p));
  $('#btn-complete-final')?.addEventListener('click', () => completeProject(p));

  $('#btn-add-retro')?.addEventListener('click', () => {
    const entry = {
      date: $('#retro-date')?.value || today(),
      foundAt: $('#retro-found')?.value || '',
      retroTo: $('#retro-to')?.value || '',
      reason: $('#retro-reason')?.value || '',
      resolution: $('#retro-resolution')?.value || '',
    };
    if (!entry.reason) return;
    if (!p.retroLog) p.retroLog = [];
    p.retroLog.push(entry);
    save(p);
    render();
  });

  $$('[data-del-retro]').forEach((btn) => {
    btn.addEventListener('click', () => {
      p.retroLog.splice(Number(btn.dataset.delRetro), 1);
      save(p);
      render();
    });
  });

  updateCompleteHint(p);
}

function updateCompleteHint(p) {
  const hint = $('#complete-hint');
  if (!hint) return;
  const key = state.stepKey;
  if (key === 'gate') return;
  if (!canCompleteStep(p, key)) {
    hint.textContent = getCompleteBlockReason(p, key);
  } else {
    hint.textContent = '';
  }
  const btn = $('#btn-complete');
  if (btn) btn.disabled = !canCompleteStep(p, key);
}

function completeStep(p) {
  const key = state.stepKey;
  if (!canCompleteStep(p, key)) return;

  if (!p.gateLog) p.gateLog = {};
  const stepInfo = GATE_LOG_STEPS.find((s) => s.key === key);
  p.gateLog[key] = {
    date: today(),
    reviewer: p.owner || 'Fuhito',
    note: p.copySkipped && key === 'copy' ? 'スキップ（仮=本番）' : '',
  };

  const idx = FLOW_ORDER.indexOf(key);
  const nextKey = FLOW_ORDER[idx + 1];
  if (nextKey) {
    p.currentStepKey = nextKey;
    save(p);
    navigate(`project/${p.id}/${nextKey}`);
  }
}

function completeProject(p) {
  if (!canCompleteStep(p, '6')) return;
  if (!p.gateLog) p.gateLog = {};
  p.gateLog['6'] = { date: today(), reviewer: p.owner || 'Fuhito', note: '完了' };
  p.currentStepKey = '6';
  p.nextAction = '納品済み';
  save(p);
  alert('案件を完了として記録しました。');
  render();
}

function save(p) {
  upsertProject(p);
}

/* ── Logic ── */

function isModuleLocked(p) {
  return Boolean(p.gateLog?.['1']?.date);
}

function isStepLocked(p, key) {
  const idx = FLOW_ORDER.indexOf(key);
  if (idx <= 0) return false;
  const prev = FLOW_ORDER[idx - 1];
  return !isStepComplete(p, prev);
}

function isStepComplete(p, key) {
  return Boolean(p.gateLog?.[key]?.date);
}

function countCompletedSteps(p) {
  return FLOW_ORDER.filter((k) => isStepComplete(p, k)).length;
}

function canCompleteStep(p, key) {
  if (key === 'copy' && p.copySkipped) return true;
  if (key === 'gate') {
    return FINAL_GATE.items.every((i) => p.gateAnswers?.[i.id] === 'yes');
  }
  const checks = getChecksForKey(p, key);
  if (!checks.length) return true;
  return checks.every((c) => p.checks?.[key]?.[c.id]);
}

function getCompleteBlockReason(p, key) {
  if (key === 'gate') return '6項目すべて YES にしてください。';
  if (key === 'copy' && p.copySkipped) return '';
  const checks = getChecksForKey(p, key);
  const missing = checks.filter((c) => !p.checks?.[key]?.[c.id]).length;
  if (missing) return `チェックリストが ${missing} 件未完了です。`;
  return '';
}

function getChecksForKey(p, key) {
  if (key === '5') return MODULE_CHECKS[p.moduleType]?.checks || [];
  if (key === 'copy') return COPY_STEP.checks;
  if (key === '6') return PRODUCTION_STEP.checks;
  if (CORE_STEPS[key]) return CORE_STEPS[key].checks;
  return [];
}

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}
