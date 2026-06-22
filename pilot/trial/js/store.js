/** localStorage 永続化 */

const STORAGE_KEY = 'design-flow-projects-v1';

export function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAll(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProject(id) {
  return loadAll().find((p) => p.id === id) ?? null;
}

export function upsertProject(project) {
  const list = loadAll();
  const i = list.findIndex((p) => p.id === project.id);
  project.updatedAt = new Date().toISOString();
  if (i >= 0) list[i] = project;
  else list.push(project);
  saveAll(list);
  return project;
}

export function deleteProject(id) {
  saveAll(loadAll().filter((p) => p.id !== id));
}

export function exportProject(project) {
  const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `design-flow-${slug(project.name || 'project')}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function importProjectFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data.id || !data.name) throw new Error('invalid');
        data.id = crypto.randomUUID();
        data.importedAt = new Date().toISOString();
        upsertProject(data);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function slug(s) {
  return s.replace(/[^\w\u3040-\u30ff\u4e00-\u9faf-]+/g, '-').slice(0, 40);
}

export function createEmptyProject() {
  const now = new Date().toISOString();
  const fields = {};
  const checks = {};

  ['1', '2', '3', '4'].forEach((k) => {
    fields[k] = {};
    checks[k] = {};
  });
  checks['5'] = {};
  checks.copy = {};
  checks['6'] = {};

  return {
    id: crypto.randomUUID(),
    name: '',
    client: '',
    moduleType: 'A',
    startDate: today(),
    dueDate: '',
    owner: 'Fuhito',
    currentStepKey: '1',
    copySkipped: false,
    fields,
    checks,
    gateAnswers: {},
    gateMemo: {},
    gateLog: {},
    retroLog: [],
    changeRequests: [],
    stepNotes: {},
    nextAction: '',
    blockers: '',
    createdAt: now,
    updatedAt: now,
  };
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}
