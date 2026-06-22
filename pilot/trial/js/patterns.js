/** Design Pattern Library loader — knowledge/patterns/ */

const PATTERNS_ROOT = new URL('../../knowledge/patterns/', import.meta.url);

let cache = null;

export async function loadPatterns() {
  if (cache) return cache;
  const manifest = await fetch(new URL('manifest.json', PATTERNS_ROOT)).then((r) => {
    if (!r.ok) throw new Error('manifest');
    return r.json();
  });
  const patterns = [];
  for (const cat of manifest.categories) {
    const data = await fetch(new URL(cat.file, PATTERNS_ROOT)).then((r) => {
      if (!r.ok) throw new Error(cat.file);
      return r.json();
    });
    patterns.push(...data.patterns);
  }
  cache = { manifest, patterns };
  return cache;
}

/** Step 向けにフィルタ（P0 リリース分のみ） */
export function patternsForStep(manifest, patterns, stepKey, moduleType) {
  const p0 = new Set(manifest.p0_release);
  return patterns.filter((p) => {
    if (!p0.has(p.id) || !p.apply) return false;
    if (String(p.apply.step) !== String(stepKey)) return false;
    if (p.modules?.length && !p.modules.includes(moduleType)) return false;
    return true;
  });
}

export function svgUrl(pattern) {
  if (!pattern.svg) return null;
  return new URL(pattern.svg, PATTERNS_ROOT).href;
}

export function groupByCategory(items) {
  return items.reduce((acc, p) => {
    const k = p.category || 'other';
    if (!acc[k]) acc[k] = [];
    acc[k].push(p);
    return acc;
  }, {});
}

export const CATEGORY_LABELS = {
  color: '配色',
  typography: 'タイポグラフィ',
  grid: 'グリッド・レイアウト',
  eye: '視線・構図',
  proportion: '比率',
  print: '印刷・モジュール A',
};
