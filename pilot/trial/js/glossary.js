/** 用語ヘルプ — plan/glossary.md 準拠 */

export const FIELD_HELP = {
  projectName: 'この制作物の名前（パンフ・DM など）',
  background: 'なぜ今この制作が必要か。社内決定・背景を書く',
  goal: '最終的に何を達成したいか。1〜2 文で',
  target: '誰に届けるか。年齢・属性を一言で',
  specInitial: '分かっている仕様（サイズ・部数・同封物など）',
  specTodo: 'まだ確認が必要なこと（郵送規定など）',
  mustHaveList: '必ず入れる要素と優先度。例: 表紙ロゴ（必須）',
  constraints: '守るルール。ブランドガイド・禁止事項など',
  refImages: '参考画像のメモ or URL（3〜5 枚目安）',
  documents: '要件書・テンプレートのファイル名メモ',
  personaDeep: 'ペルソナビルダーで登録。下のカードを使う',
  competitors: '競合・参考のビジュアル分析メモ',
  dontDo: 'やってはいけないこと。デザイン判断の禁止線',
  trends: '取り入れる / 無視するトレンド',
  inspirationUrls: 'ムードボード用の画像 URL',
  keyMessage: 'この制作物で一番伝えたいこと。以降の判断基準になる 1〜2 文',
  visualDirection: '形容詞 2〜3 個 + 補足（和・涼しげ 等）',
  keywords: 'デザインのキーワード 3〜5 個',
  copyDraft: '仮原稿。未完成で OK。字数は本番想定',
  charCount: 'セクション別の字数。下の表で設定',
  copySections: 'セクション名・字数・仮テキストを一覧管理',
  assets: '写真・ロゴなど素材の確保状況',
  colorRoles: 'ベース・メイン・アクセント等を色コードで設定。スウォッチで確認',
  typography: 'フォントとサイズ。プレビューで確認',
  visualImg: '参考画像 URL を登録（言葉だけでは不十分なため）',
  grid: '余白・段組のルール。型ライブラリから選んでも OK',
  spec: 'サイズ・ページ数などを選択式で確定',
  pageMap: '各ページの役割と原稿の割り当て',
  wireframe: '配置ラフ — 色の前に箱と文字だけで配置を決める図',
  imageSpec: '写真を置く場所のサイズ・比率',
  copyMaster: '本番原稿。割付エリアごとに入力',
  approval: 'クライアントまたは社内の承認記録（日付・担当者）',
  wfCheck: '配置ラフと本番原稿の文字数・段落が合っているか',
  tool: '制作に使うソフトを選択',
  deliverable: 'クライアント・印刷会社に渡す最終ファイル',
  notes: '制作時のこだわりなど。質問に答える形式',
  progress: '制作の進捗（未着手 / 作業中 / 確認待ち / 完了）',
  changeRequests: '制作中に出た変更・差し戻しの記録',
};

export function helpTip(fieldId) {
  const text = FIELD_HELP[fieldId];
  if (!text) return '';
  return `<span class="help-tip" title="${escAttr(text)}">?</span>`;
}

function escAttr(s) {
  return String(s).replace(/"/g, '&quot;');
}
