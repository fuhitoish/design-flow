/** サンプル案件（Bellagio Miyabi）— 試用システム用プリセット */

import { createEmptyProject } from './store.js';

export function createBellagioSample() {
  const p = createEmptyProject();
  p.name = 'Bellagio Miyabi 宿泊体験パンフレット 2026';
  p.client = 'Bellagio Miyabi（架空）';
  p.moduleType = 'A';
  p.startDate = '2026-06-01';
  p.dueDate = '2026-06-25';
  p.currentStepKey = '6';
  p.nextAction = 'Illustrator 本実装（WF 準拠）';
  p.blockers = 'なし';

  p.fields['1'] = {
    projectName: 'Bellagio Miyabi 宿泊体験パンフレット',
    background: 'リブランディング後の認知拡大。週末ステイの訴求強化。',
    goal: '30代共働き夫婦に、週末の非日常体験として認知させ、予約 CTA へ誘導する。',
    target: '30代・都市部・共働き・子なし or 子どもが小さい夫婦',
    specInitial: 'A4 中綴じ 8P、マット系高級紙',
    moduleReason: '印刷物・宿泊パンフレットのためモジュール A',
  };

  p.fields['2'] = {
    personaDeep: '週末の「ご褒美」需要。SNS 映えより静けさ・質。価格より体験の独自性。',
    competitors: '競合7社：高級旅館パンフは金箔・赤が多い。差別化は深緑×金の落ち着き。',
    dontDo: '過度なゴールド、派手な和柄、安売り感のある価格表記',
    trends: 'サステナビリティは取り入れる。過剰な3Dモックは無視。',
  };

  p.fields['3'] = {
    keyMessage: '静寂の中で、自分を取り戻す週末。',
    visualDirection: '洗練・静謐・温もり。深緑・金・クリーム。',
    keywords: '静寂, 週末, 非日常, 和モダン, 癒し',
    copyDraft: '（各ページ仮原稿 — 字数確定済み。P6 FAQ は300字以内に調整済み）',
    charCount: '表紙20字 / P2-3各400字 / P6 FAQ 280字 等',
    assets: 'ロゴ・施設写真12点支給済み',
  };

  p.fields['4'] = {
    colors: 'Miyabi Green #2D4A3E（深い静けさ）\nGold #B8975A（控えめな高級感）\nCream #F5F0E8（本文地）',
    typography: '見出し: Noto Serif JP Medium\n本文: Noto Sans JP Regular\nh1 42pt / h2 24pt / 本文 10.5pt',
    visualImg: '自然光の室内写真、余白多め、人物はシルエット or 後ろ姿',
    grid: 'A4 天地左右15mm、2段組（本文）、見開きP2-3は1段',
  };

  p.fields['5'] = {
    spec: 'A4 中綴じ 8P、本文マット135kg、表紙グロス157kg + matt PP',
    pageMap: '表1:表紙 / 表2:連絡先 / P1:コンセプト / P2-3:見開き客室 / P4:料理 / P5:アクセス / P6:FAQ / P7:予約',
    wireframe: '全ページ WF 完了。表紙 h1 は42ptで2行収まり確認済み。',
    imageSpec: 'P2 キービジュアル 180×120mm 横トリミング',
  };

  p.fields.copy = {
    copyMaster: '本番原稿確定（06-17）。仮から文言微修正のみ。',
    approval: 'クライアント OK（メール 06-17）',
    wfCheck: 'FAQ 280字 — WF ボックス内収まり OK',
  };

  p.fields['6'] = {
    tool: 'Adobe Illustrator',
    deliverable: '入稿 PDF + AI データ',
    notes: 'WF 準拠で本実装中',
  };

  ['1', '2', '3', '4'].forEach((k) => {
    p.checks[k] = Object.fromEntries(
      Array.from({ length: 8 }, (_, i) => [`c${i + 1}`, true])
    );
  });
  p.checks['5'] = { c1: true, c2: true, c3: true, c4: true, c5: true, c6: true };
  p.checks.copy = { c1: true, c2: true, c3: true };
  p.checks['6'] = { c1: true, c2: true, c3: false, c4: false, c5: false };

  p.gateAnswers = { g1: 'yes', g2: 'yes', g3: 'yes', g4: 'yes', g5: 'yes', g6: 'yes' };
  p.gateMemo = {
    memoKeyMessage: '静寂の中で自分を取り戻す週末',
    memoColor: '深緑は静けさ、金は控えめな高級感',
    memoLayout: 'P2-3見開きで没入感、FAQは2カラム',
  };

  p.gateLog = {
    '1': { date: '2026-06-03', reviewer: 'Fuhito', note: '8P中綴じ確定' },
    '2': { date: '2026-06-06', reviewer: 'Fuhito', note: '競合7社分析' },
    '3': { date: '2026-06-10', reviewer: 'Fuhito', note: '仮原稿確定' },
    '4': { date: '2026-06-14', reviewer: 'Fuhito', note: '★ トンマナ' },
    '5': { date: '2026-06-17', reviewer: 'Fuhito', note: '★ WF完了' },
    copy: { date: '2026-06-17', reviewer: 'Fuhito', note: '本番原稿' },
    gate: { date: '2026-06-18', reviewer: 'Fuhito', note: '全6項目 YES' },
  };

  p.retroLog = [
    { date: '2026-06-12', foundAt: '5（台割）', retroTo: '3', reason: 'P6 FAQ仮原稿300字超過', resolution: 'copy-draft 削減→再カウント' },
    { date: '2026-06-15', foundAt: '5（WF）', retroTo: '4', reason: '表紙h1が48ptで2行に割れた', resolution: 'h1を42ptに変更、4-2更新' },
  ];

  return p;
}
