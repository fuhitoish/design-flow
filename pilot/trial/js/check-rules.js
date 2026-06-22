/** チェックリスト自動連動 — REVISE §4.1 */

import { MODULE_CHECKS, COPY_STEP, PRODUCTION_STEP, CORE_STEPS } from './steps.js';

const filled = (v) => String(v ?? '').trim().length > 0;
const minLen = (v, n) => filled(v) && String(v).trim().length >= n;

function extras(p) {
  if (!p.extras) p.extras = {};
  return p.extras;
}

function field(p, step, id) {
  return p.fields?.[step]?.[id] ?? '';
}

const RULES = {
  '1': {
    c1: (p) => filled(field(p, '1', 'projectName')) && filled(field(p, '1', 'background')) && filled(field(p, '1', 'goal')),
    c2: (p) => minLen(field(p, '1', 'goal'), 10),
    c3: (p) => filled(field(p, '1', 'target')),
    c4: (p) => Boolean(p.moduleType),
    c5: (p) => filled(field(p, '1', 'specInitial')) || filled(field(p, '1', 'specTodo')),
    c6: (p) => filled(field(p, '1', 'mustHaveList')),
    c7: (p) => filled(field(p, '1', 'constraints')),
    c8: (p) => (extras(p).refImages?.length >= 1) || filled(field(p, '1', 'refImages')),
  },
  '2': {
    c1: (p) => (extras(p).personas?.length >= 1) || minLen(field(p, '2', 'personaDeep'), 20),
    c2: (p) => minLen(field(p, '2', 'competitors'), 20),
    c3: (p) => filled(field(p, '2', 'dontDo')),
    c4: (p) => filled(field(p, '2', 'trends')),
    c5: (p) => (extras(p).inspirationUrls?.length >= 3) || minLen(field(p, '2', 'inspirationUrls'), 10),
  },
  '3': {
    c1: (p) => minLen(field(p, '3', 'keyMessage'), 5),
    c2: (p) => filled(field(p, '3', 'visualDirection')),
    c3: (p) => filled(field(p, '3', 'keywords')),
    c4: (p) => filled(field(p, '3', 'copyDraft')) || (extras(p).copySections?.length >= 1),
    c5: (p) => filled(field(p, '3', 'assets')),
    c6: (p) => (extras(p).copySections?.length >= 1) || filled(field(p, '3', 'charCount')),
  },
  '4': {
    c1: (p) => hasColorRoles(p),
    c2: (p) => hasColorRoles(p) && extras(p).colorRoles?.primary?.hex,
    c3: (p) => filled(extras(p).typo?.heading) && filled(extras(p).typo?.body),
    c4: (p) => filled(extras(p).typo?.body),
    c5: (p) => (extras(p).moodUrls?.length >= 1) || filled(field(p, '4', 'visualImg')),
    c6: (p) => filled(field(p, '4', 'grid')),
    c7: (p) => filled(field(p, '4', 'grid')),
    c8: (p) => filled(field(p, '3', 'keyMessage')),
  },
  '5A': {
    c1: (p) => Boolean(extras(p).spec?.size && extras(p).spec?.pages),
    c2: (p) => (extras(p).pageMapPages?.filter((pg) => filled(pg.role)).length >= 3),
    c3: (p) => Object.keys(extras(p).wireframeZones || {}).length >= 2,
    c4: (p) => filled(field(p, '5', 'imageSpec')) || filled(extras(p).imageSpec?.ratio),
    c5: (p) => hasColorRoles(p),
    c6: (p) => filled(field(p, '5', 'spec')),
  },
  copy: {
    c1: (p) => filled(field(p, 'copy', 'copyMaster')) || copyAreasFilled(p),
    c2: (p) => filled(field(p, 'copy', 'wfCheck')) || copyAreasFilled(p),
    c3: (p) => filled(field(p, '3', 'assets')),
  },
  '6': {
    c1: (p) => (extras(p).tools?.length >= 1),
    c2: (p) => hasColorRoles(p),
    c3: (p) => Object.values(extras(p).productionQ || {}).some(Boolean),
    c4: (p) => (extras(p).deliverables?.length >= 1),
    c5: (p) => extras(p).progress === 'done' || extras(p).progress === 'review',
  },
};

function hasColorRoles(p) {
  const cr = extras(p).colorRoles;
  return cr && filled(cr.primary?.hex) && filled(cr.background?.hex);
}

function copyAreasFilled(p) {
  const areas = extras(p).copyAreas || {};
  return Object.values(areas).filter(filled).length >= 2;
}

export function syncAutoChecks(p) {
  if (!p.checks) p.checks = {};
  for (const stepKey of ['1', '2', '3', '4', 'copy', '6']) {
    const rules = RULES[stepKey];
    if (!rules) continue;
    if (!p.checks[stepKey]) p.checks[stepKey] = {};
    for (const [cid, fn] of Object.entries(rules)) {
      p.checks[stepKey][cid] = fn(p);
    }
  }
  const rules5 = RULES['5A'];
  if (rules5 && p.moduleType === 'A') {
    if (!p.checks['5']) p.checks['5'] = {};
    for (const [cid, fn] of Object.entries(rules5)) {
      p.checks['5'][cid] = fn(p);
    }
  }
  return p;
}

export function getCheckDefs(p, key) {
  if (key === '5') return MODULE_CHECKS[p.moduleType]?.checks || [];
  if (key === 'copy') return COPY_STEP.checks;
  if (key === '6') return PRODUCTION_STEP.checks;
  return CORE_STEPS[key]?.checks || [];
}
