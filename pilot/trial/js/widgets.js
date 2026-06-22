/** 試用 UI ウィジェット — REVISE R1/R2 簡易版 */
import { helpTip } from './glossary.js';

const COLOR_ROLES = [
  { id: 'primary', label: 'Primary' }, { id: 'secondary', label: 'Secondary' },
  { id: 'accent', label: 'Accent' }, { id: 'background', label: 'Background' },
  { id: 'text', label: 'Text' }, { id: 'neutral', label: 'Neutral' },
];
const TOOLS = [
  { id: 'illustrator', label: 'Illustrator', icon: 'Ai' },
  { id: 'photoshop', label: 'Photoshop', icon: 'Ps' },
  { id: 'indesign', label: 'InDesign', icon: 'Id' },
  { id: 'figma', label: 'Figma', icon: 'Fg' },
];
const DELIVERABLES = [
  { id: 'print-pdf', label: '印刷入稿 PDF' },
  { id: 'source-ai', label: '編集用 AI / INDD' },
  { id: 'proof', label: '色校正' },
  { id: 'sample', label: '実物サンプル' },
];
const PRODUCTION_Q = [
  { id: 'kerning', label: '字詰め・行間' },
  { id: 'colorTune', label: '色の微調整' },
  { id: 'fold', label: '折り・加工確認' },
  { id: 'curved', label: '曲面 mock 検証' },
  { id: 'postal', label: '郵送サイズ確認' },
];
const DEFAULT_PAGES = [
  { label: '表1', role: '表紙', copy: '', priority: '1' },
  { label: 'P1', role: 'オープニング', copy: '', priority: '1' },
  { label: 'P2-3', role: '見開き', copy: '', priority: '1' },
  { label: 'P4-5', role: '詳細', copy: '', priority: '2' },
  { label: 'P6', role: 'FAQ', copy: '', priority: '3' },
  { label: 'P7', role: 'CTA', copy: '', priority: '1' },
  { label: '表8', role: '裏表紙', copy: '', priority: '2' },
];
const WF_ZONES = [
  { id: 'head', label: '見出し', y: 8 },
  { id: 'hero', label: 'ビジュアル', y: 28 },
  { id: 'body', label: '本文', y: 62 },
  { id: 'cta', label: 'CTA', y: 85 },
];

function ex(p) { if (!p.extras) p.extras = {}; return p.extras; }
function esc(s) { return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

export function ensureExtras(p) {
  const e = ex(p);
  if (!e.colorRoles) {
    e.colorRoles = {};
    COLOR_ROLES.forEach((r) => { e.colorRoles[r.id] = { hex: '', name: '', reason: '' }; });
  }
  if (!e.copySections.length) e.copySections.push({ name: '表紙', chars: '40', draft: '' });
  if (!e.typo) e.typo = { heading: 'Noto Serif JP', body: 'Noto Sans JP', hSize: '20', bodySize: '10', en: 'DM Sans' };
  if (!e.personas) e.personas = [];
  if (!e.inspirationUrls) e.inspirationUrls = [];
  if (!e.moodUrls) e.moodUrls = [];
  if (!e.copySections) e.copySections = [];
  if (!e.spec) e.spec = { size: 'A4', pages: '8', binding: 'saddle', paper: 'coat', qty: '', deadline: '' };
  if (!e.pageMapPages) e.pageMapPages = DEFAULT_PAGES.map((x) => ({ ...x }));
  if (!e.wireframeZones) e.wireframeZones = {};
  if (!e.imageSpec) e.imageSpec = { ratio: '1:√2', placement: 'hero' };
  if (!e.copyAreas) e.copyAreas = { leftTop: '', leftBottom: '', rightTop: '', rightBottom: '' };
  if (!e.tools) e.tools = [];
  if (!e.deliverables) e.deliverables = [];
  if (!e.productionQ) e.productionQ = {};
  if (!e.progress) e.progress = 'not_started';
  if (!e.changeRequests) e.changeRequests = [];
  if (!e.refImages) e.refImages = [];
  if (!p.lifecyclePhase) p.lifecyclePhase = 'plan';
  return p;
}

export function renderStepWidgets(p, stepKey) {
  ensureExtras(p);
  const h = [];
  if (stepKey === '1') { h.push(urlListWidget(p, 'refImages', '参考画像 URL')); h.push(docWidget()); }
  if (stepKey === '2') { h.push(personaWidget(p)); h.push(urlListWidget(p, 'inspirationUrls', 'インスピレーション画像')); }
  if (stepKey === '3') h.push(copySectionsWidget(p));
  if (stepKey === '4') { h.push(colorWidget(p)); h.push(typoWidget(p)); h.push(urlListWidget(p, 'moodUrls', 'ムードボード')); }
  if (stepKey === '5' && p.moduleType === 'A') { h.push(specWidget(p)); h.push(pageMapWidget(p)); h.push(wfWidget(p)); h.push(imageSpecWidget(p)); }
  if (stepKey === 'copy' && !p.copySkipped) h.push(copySpreadWidget(p));
  if (stepKey === '6') { h.push(lifecycleWidget(p)); h.push(toolsWidget(p)); h.push(deliverWidget(p)); h.push(prodQWidget(p)); h.push(crWidget(p)); }
  return h.join('');
}

export function bindStepWidgets(p, stepKey, onChange) {
  ensureExtras(p);
  const e = ex(p);

  document.querySelectorAll('[data-persona]').forEach((el) => {
    el.addEventListener('input', () => { const [i, f] = el.dataset.persona.split('.'); e.personas[+i][f] = el.value; onChange(false); });
  });
  document.querySelectorAll('[data-del-persona]').forEach((btn) => {
    btn.addEventListener('click', () => { e.personas.splice(+btn.dataset.delPersona, 1); onChange(); });
  });
  document.querySelector('.btn-add-persona')?.addEventListener('click', () => { e.personas.push({ name: '', age: '', note: '', imageUrl: '' }); onChange(); });

  bindUrls(p, 'refImages', onChange);
  bindUrls(p, 'inspirationUrls', onChange);
  bindUrls(p, 'moodUrls', onChange);

  document.querySelectorAll('[data-color]').forEach((el) => {
    el.addEventListener('input', () => {
      const [role, part] = el.dataset.color.split('.');
      e.colorRoles[role][part] = el.value;
      syncColors(p); onChange(false);
    });
  });

  document.querySelectorAll('[data-typo]').forEach((el) => {
    el.addEventListener('input', () => { e.typo[el.dataset.typo] = el.value; onChange(false); });
  });

  document.querySelectorAll('[data-spec]').forEach((el) => {
    el.addEventListener('input', () => { e.spec[el.dataset.spec] = el.value; syncSpec(p); onChange(false); });
  });
  document.querySelectorAll('[data-pm]').forEach((el) => {
    el.addEventListener('input', () => { const [i, f] = el.dataset.pm.split('.'); e.pageMapPages[+i][f] = el.value; syncPageMap(p); onChange(false); });
  });
  document.querySelectorAll('[data-wf]').forEach((el) => {
    el.addEventListener('input', () => { e.wireframeZones[el.dataset.wf] = el.value; syncWf(p); onChange(false); });
  });
  document.querySelectorAll('[data-is]').forEach((el) => {
    el.addEventListener('change', () => { e.imageSpec[el.dataset.is] = el.value; syncImageSpec(p); onChange(false); });
  });
  document.querySelectorAll('[data-ca]').forEach((el) => {
    el.addEventListener('input', () => { e.copyAreas[el.dataset.ca] = el.value; syncCopyAreas(p); onChange(false); });
  });
  document.querySelectorAll('[data-tool]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tool; const i = e.tools.indexOf(id);
      if (i >= 0) e.tools.splice(i, 1); else e.tools.push(id);
      p.fields['6'] = p.fields['6'] || {}; p.fields['6'].tool = e.tools.join(', '); onChange();
    });
  });
  document.querySelectorAll('[data-dlv]').forEach((el) => {
    el.addEventListener('change', () => {
      const id = el.dataset.dlv;
      if (el.checked && !e.deliverables.includes(id)) e.deliverables.push(id);
      if (!el.checked) e.deliverables = e.deliverables.filter((x) => x !== id);
      syncDeliver(p); onChange(false);
    });
  });
  document.querySelectorAll('[data-pq]').forEach((el) => {
    el.addEventListener('change', () => { e.productionQ[el.dataset.pq] = el.checked; syncProdQ(p); onChange(false); });
  });
  document.querySelectorAll('[data-cs]').forEach((el) => {
    el.addEventListener('input', () => { const [i, f] = el.dataset.cs.split('.'); e.copySections[+i][f] = el.value; syncSections(p); onChange(false); });
  });
  document.querySelector('.btn-add-section')?.addEventListener('click', () => { e.copySections.push({ name: '', chars: '', draft: '' }); onChange(); });
  $('#field-progress')?.addEventListener('change', (ev) => { e.progress = ev.target.value; onChange(false); });
  $('#btn-add-cr')?.addEventListener('click', () => {
    const t = $('#cr-text')?.value?.trim(); if (!t) return;
    e.changeRequests.push({ date: new Date().toISOString().slice(0, 10), text: t });
    $('#cr-text').value = ''; onChange();
  });
  $('#doc-upload')?.addEventListener('change', (ev) => {
    e.documents = [...(e.documents || []), ...[...ev.target.files].map((f) => f.name)];
    onChange();
  });
}

function $(sel) { return document.querySelector(sel); }

function bindUrls(p, key, onChange) {
  document.querySelectorAll(`[data-url="${key}"]`).forEach((el) => {
    el.addEventListener('input', () => { ex(p)[key][+el.dataset.idx] = el.value; onChange(false); });
  });
  document.querySelectorAll(`[data-add-url="${key}"]`).forEach((btn) => {
    btn.addEventListener('click', () => { ex(p)[key].push(''); onChange(); });
  });
}

function urlListWidget(p, key, title) {
  const list = ex(p)[key]; if (!list.length) list.push('');
  return `<div class="widget-card"><h4>${title} ${helpTip(key)}</h4>${list.map((u, i) => `<input type="text" data-url="${key}" data-idx="${i}" value="${esc(u)}" placeholder="https://">`).join('')}<button type="button" class="btn btn-sm btn-secondary" data-add-url="${key}">+ 追加</button></div>`;
}

function docWidget() {
  return `<div class="widget-card"><h4>要件ドキュメント ${helpTip('documents')}</h4><p class="hint">ファイル名を記録（将来アップロード対応）</p><input type="file" id="doc-upload" multiple></div>`;
}

function personaWidget(p) {
  return `<div class="widget-card"><h4>ペルソナ ${helpTip('personaDeep')}</h4><div class="persona-grid">${ex(p).personas.map((person, i) => `
    <div class="persona-card"><input data-persona="${i}.name" value="${esc(person.name)}" placeholder="名前">
    <input data-persona="${i}.age" value="${esc(person.age)}" placeholder="年齢"><textarea data-persona="${i}.note" rows="2">${esc(person.note)}</textarea>
    <button type="button" class="btn btn-sm btn-ghost" data-del-persona="${i}">削除</button></div>`).join('')}</div>
    <button type="button" class="btn btn-sm btn-secondary btn-add-persona">+ ペルソナ</button></div>`;
}

function copySectionsWidget(p) {
  return `<div class="widget-card"><h4>セクション別原稿 ${helpTip('copySections')}</h4>
    ${ex(p).copySections.map((s, i) => `<div class="section-row"><input data-cs="${i}.name" value="${esc(s.name)}" placeholder="セクション"><input data-cs="${i}.chars" value="${esc(s.chars)}" placeholder="字数"><input data-cs="${i}.draft" value="${esc(s.draft)}" placeholder="仮文"></div>`).join('')}
    <button type="button" class="btn btn-sm btn-secondary btn-add-section">+ セクション</button></div>`;
}

function colorWidget(p) {
  const sw = COLOR_ROLES.map((r) => `<div class="swatch" style="background:${esc(ex(p).colorRoles[r.id]?.hex || '#ddd')}" title="${r.label}"></div>`).join('');
  const rows = COLOR_ROLES.map((r) => {
    const v = ex(p).colorRoles[r.id];
    return `<div class="color-row"><span>${r.label}</span><input type="color" data-color="${r.id}.hex" value="${esc(v.hex || '#cccccc')}"><input data-color="${r.id}.hex" value="${esc(v.hex)}" placeholder="#hex"><input data-color="${r.id}.name" value="${esc(v.name)}" placeholder="色名"><input data-color="${r.id}.reason" value="${esc(v.reason)}" placeholder="理由"></div>`;
  }).join('');
  return `<div class="widget-card"><h4>カラーロール ${helpTip('colorRoles')}</h4><div class="swatch-row">${sw}</div>${rows}</div>`;
}

function typoWidget(p) {
  const t = ex(p).typo;
  return `<div class="widget-card"><h4>タイポ ${helpTip('typography')}</h4>
    <div class="typo-fields"><label>見出し <input data-typo="heading" value="${esc(t.heading)}"></label><label>pt <input data-typo="hSize" value="${esc(t.hSize)}"></label>
    <label>本文 <input data-typo="body" value="${esc(t.body)}"></label><label>pt <input data-typo="bodySize" value="${esc(t.bodySize)}"></label></div>
    <div class="typo-preview"><p style="font-family:${esc(t.heading)};font-size:${esc(t.hSize)}px">見出し Sample</p><p style="font-family:${esc(t.body)};font-size:${esc(t.bodySize)}px">本文 日本語 English 123</p></div></div>`;
}

function specWidget(p) {
  const s = ex(p).spec;
  return `<div class="widget-card"><h4>仕様 ${helpTip('spec')}</h4><div class="spec-grid">
    <label>サイズ<select data-spec="size"><option>A4</option><option>A5</option></select></label>
    <label>ページ<select data-spec="pages"><option>4</option><option>8</option><option>12</option></select></label>
    <label>製本<select data-spec="binding"><option value="saddle">中綴じ</option><option value="folder">2ポケット</option></select></label>
    <label>部数<input data-spec="qty" value="${esc(s.qty)}"></label><label>納期<input type="date" data-spec="deadline" value="${esc(s.deadline)}"></label></div></div>`;
}

function pageMapWidget(p) {
  return `<div class="widget-card"><h4>台割 ${helpTip('pageMap')}</h4><div class="pagemap-grid">${ex(p).pageMapPages.map((pg, i) => `
    <div class="pagemap-card"><strong>${esc(pg.label)}</strong><input data-pm="${i}.role" value="${esc(pg.role)}"><input data-pm="${i}.copy" value="${esc(pg.copy)}" placeholder="原稿"></div>`).join('')}</div></div>`;
}

function wfWidget(p) {
  return `<div class="widget-card"><h4>配置ラフ ${helpTip('wireframe')}</h4><p class="hint">WF = ワイヤーフレーム。箱と文字だけで配置を決める</p>
    <div class="wf-canvas">${WF_ZONES.map((z) => `<div class="wf-zone" style="top:${z.y}%"><span>${z.label}</span><input data-wf="${z.id}" value="${esc(ex(p).wireframeZones[z.id] || '')}"></div>`).join('')}</div></div>`;
}

function imageSpecWidget(p) {
  const is = ex(p).imageSpec;
  return `<div class="widget-card"><h4>写真の置き場 ${helpTip('imageSpec')}</h4>
    <label>比率<select data-is="ratio">${['1:√2','16:9','4:3','1:1'].map((r) => `<option ${is.ratio===r?'selected':''}>${r}</option>`).join('')}</select></label></div>`;
}

function copySpreadWidget(p) {
  const a = ex(p).copyAreas;
  return `<div class="widget-card"><h4>割付原稿 ${helpTip('copyMaster')}</h4><div class="copy-spread">
    <div><h5>左</h5><textarea data-ca="leftTop" rows="2">${esc(a.leftTop)}</textarea><textarea data-ca="leftBottom" rows="2">${esc(a.leftBottom)}</textarea></div>
    <div><h5>右</h5><textarea data-ca="rightTop" rows="2">${esc(a.rightTop)}</textarea><textarea data-ca="rightBottom" rows="2">${esc(a.rightBottom)}</textarea></div></div></div>`;
}

function lifecycleWidget(p) {
  const pr = ex(p).progress;
  const opts = [
    ['not_started', '未着手'], ['in_progress', '作業中'], ['review', '確認待ち'], ['done', '完了'],
  ].map(([v, l]) => `<option value="${v}" ${pr === v ? 'selected' : ''}>${l}</option>`).join('');
  return `<div class="widget-card"><h4>フェーズ</h4><p class="hint">計画 → 制作 → 振り返り</p>
    <label>進捗<select id="field-progress">${opts}</select></label></div>`;
}

function toolsWidget(p) {
  const sel = new Set(ex(p).tools);
  return `<div class="widget-card"><h4>ツール ${helpTip('tool')}</h4><div class="tool-grid">${TOOLS.map((t) => `<button type="button" class="tool-btn ${sel.has(t.id)?'on':''}" data-tool="${t.id}"><span>${t.icon}</span>${t.label}</button>`).join('')}</div></div>`;
}

function deliverWidget(p) {
  const sel = new Set(ex(p).deliverables);
  return `<div class="widget-card"><h4>納品物 ${helpTip('deliverable')}</h4>${DELIVERABLES.map((d) => `<label class="check-inline"><input type="checkbox" data-dlv="${d.id}" ${sel.has(d.id)?'checked':''}> ${d.label}</label>`).join('')}</div>`;
}

function prodQWidget(p) {
  const q = ex(p).productionQ;
  return `<div class="widget-card"><h4>制作チェック ${helpTip('notes')}</h4>${PRODUCTION_Q.map((item) => `<label class="check-inline"><input type="checkbox" data-pq="${item.id}" ${q[item.id]?'checked':''}> ${item.label}</label>`).join('')}</div>`;
}

function crWidget(p) {
  return `<div class="widget-card"><h4>変更リクエスト</h4><ul>${ex(p).changeRequests.map((c) => `<li>${esc(c.date)} ${esc(c.text)}</li>`).join('')||'<li>なし</li>'}</ul><input id="cr-text" placeholder="変更内容"><button type="button" class="btn btn-sm btn-secondary" id="btn-add-cr">追加</button></div>`;
}

function syncColors(p) {
  p.fields['4'] = p.fields['4'] || {};
  p.fields['4'].colors = COLOR_ROLES.map((r) => { const v = ex(p).colorRoles[r.id]; return v.hex ? `${r.label}: ${v.name} ${v.hex}` : null; }).filter(Boolean).join('\n');
}
function syncSpec(p) { p.fields['5'] = p.fields['5'] || {}; const s = ex(p).spec; p.fields['5'].spec = `${s.size}/${s.pages}P ${s.binding} 部数${s.qty}`; }
function syncPageMap(p) { p.fields['5'] = p.fields['5'] || {}; p.fields['5'].pageMap = ex(p).pageMapPages.map((pg) => `${pg.label}:${pg.role}`).join('\n'); }
function syncWf(p) { p.fields['5'] = p.fields['5'] || {}; p.fields['5'].wireframe = Object.entries(ex(p).wireframeZones).map(([k,v]) => `${k}:${v}`).join('\n'); }
function syncImageSpec(p) { p.fields['5'] = p.fields['5'] || {}; p.fields['5'].imageSpec = ex(p).imageSpec.ratio; }
function syncCopyAreas(p) { p.fields.copy = p.fields.copy || {}; p.fields.copy.copyMaster = Object.entries(ex(p).copyAreas).map(([k,v]) => `[${k}]${v}`).join('\n'); }
function syncSections(p) { p.fields['3'] = p.fields['3'] || {}; p.fields['3'].charCount = ex(p).copySections.map((s) => `${s.name}:${s.chars}`).join('\n'); }
function syncDeliver(p) { p.fields['6'] = p.fields['6'] || {}; p.fields['6'].deliverable = ex(p).deliverables.join('\n'); }
function syncProdQ(p) { p.fields['6'] = p.fields['6'] || {}; p.fields['6'].notes = PRODUCTION_Q.filter((q) => ex(p).productionQ[q.id]).map((q) => q.label).join(', '); }

export function renderGateContext(p) {
  ensureExtras(p);
  const km = p.fields?.['3']?.keyMessage || '—';
  const sw = COLOR_ROLES.slice(0,4).map((r) => `<span class="gate-swatch" style="background:${ex(p).colorRoles[r.id]?.hex||'#eee'}"></span>`).join('');
  return `<div class="card gate-context"><h3>計画の引用</h3><p><strong>一番伝えたいこと:</strong> ${esc(km)}</p><p><strong>カラー:</strong> ${sw}</p></div>`;
}
