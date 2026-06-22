/** Design Flow 試用システム — Step / モジュール定義（PLAN.md v1.1 準拠） */

export const MODULES = {
  A: { id: 'A', label: '印刷物・パンフレット', folder: 'module-A-pamphlet' },
  B: { id: 'B', label: 'Web サイト・LP', folder: 'module-B-web' },
  C: { id: 'C', label: 'ポスター・単一広告', folder: 'module-C-poster' },
  D: { id: 'D', label: 'バナー・SNS 画像', folder: 'module-D-banner' },
};

export const PHASE_MAP = {
  1: { step: 'Step 1', industry: 'Brief / 要件定義', diamond: 'Discover', status: 'core_1' },
  2: { step: 'Step 2', industry: 'Research / 戦略', diamond: 'Discover', status: 'core_2' },
  3: { step: 'Step 3', industry: 'Concept / コンテンツ設計', diamond: 'Define', status: 'core_3' },
  4: { step: 'Step 4', industry: 'Visual / Art Direction', diamond: 'Define → Develop', status: 'core_4', star: true },
  5: { step: 'Step 5', industry: 'Layout / Wireframe', diamond: 'Develop', status: 'module', star: true },
  copy: { step: '本番原稿ロック', industry: 'Copy Finalization', diamond: 'Develop → Deliver', status: 'copy_final' },
  gate: { step: '最終ゲート', industry: 'Pre-production Sign-off', diamond: 'Develop → Deliver', status: 'gate', star: true },
  6: { step: 'Step 6', industry: 'Production / 実装', diamond: 'Deliver', status: 'production' },
};

export const FLOW_ORDER = ['1', '2', '3', '4', '5', 'copy', 'gate', '6'];

export const CORE_STEPS = {
  '1': {
    title: 'Step 1 — 要件定義',
    subtitle: '何のため・誰に・どんな制約で作るか。モジュールを選ぶ。',
    fields: [
      { id: 'projectName', label: '制作物名', type: 'text', required: true, help: 'projectName' },
      { id: 'background', label: '企画背景（なぜ今必要か）', type: 'textarea', help: 'background' },
      { id: 'goal', label: '最終ゴール（1〜2文）', type: 'textarea', required: true, help: 'goal' },
      { id: 'target', label: 'メインターゲット（一言）', type: 'text', help: 'target' },
      { id: 'specInitial', label: '媒体・仕様（分かっている範囲）', type: 'textarea', help: 'specInitial' },
      { id: 'specTodo', label: '要確認事項', type: 'text', help: 'specTodo' },
      { id: 'mustHaveList', label: '必須要素リスト + 優先度', type: 'textarea', help: 'mustHaveList' },
      { id: 'constraints', label: '制約・ルール', type: 'textarea', help: 'constraints' },
      { id: 'moduleReason', label: 'モジュール選択理由', type: 'text' },
    ],
    checks: [
      { id: 'c1', label: '制作物名・背景・目的が明記' },
      { id: 'c2', label: '最終ゴールが1〜2文で言語化' },
      { id: 'c3', label: 'ターゲットがペルソナとして記述' },
      { id: 'c4', label: '制作物種別を1つ選択' },
      { id: 'c5', label: '媒体・仕様の初期確定（未確定は記録）' },
      { id: 'c6', label: '必須要素リスト + 優先度' },
      { id: 'c7', label: '制約・ルールを記載' },
      { id: 'c8', label: '参考画像 3〜5 枚を収集' },
    ],
    retroTarget: 'step-1-requirements',
  },
  '2': {
    title: 'Step 2 — リサーチ・戦略',
    subtitle: '競合・トレンド・差別化。やってはいけないことを明文化。',
    fields: [
      { id: 'personaDeep', label: 'ペルソナ深堀り（カードで登録）', type: 'textarea', help: 'personaDeep' },
      { id: 'competitors', label: '競合・参考企業の分析メモ', type: 'textarea', help: 'competitors' },
      { id: 'dontDo', label: 'やってはいけないこと', type: 'textarea', required: true, help: 'dontDo' },
      { id: 'trends', label: 'トレンド（取り入れる / 無視する）', type: 'textarea', help: 'trends' },
      { id: 'inspirationUrls', label: 'インスピレーション画像メモ', type: 'textarea', help: 'inspirationUrls' },
    ],
    checks: [
      { id: 'c1', label: 'ペルソナの深堀り（3〜5点）' },
      { id: 'c2', label: '競合・参考 5〜10 社のビジュアル分析' },
      { id: 'c3', label: 'やってはいけないことを明文化' },
      { id: 'c4', label: 'トレンド調査と判断' },
      { id: 'c5', label: 'インスピレーション画像 20〜30 枚以上' },
    ],
    retroTarget: 'step-2-research',
  },
  '3': {
    title: 'Step 3 — コンセプト・仮原稿',
    subtitle: 'キーメッセージ・方向性・構成。原稿は仮で OK（字数は本番想定）。',
    fields: [
      { id: 'keyMessage', label: '一番伝えたいこと（1〜2文）', type: 'textarea', required: true, help: 'keyMessage' },
      { id: 'visualDirection', label: 'ビジュアル方向性（形容詞 2〜3 + メモ）', type: 'textarea', help: 'visualDirection' },
      { id: 'keywords', label: 'キーワード（3〜5個）', type: 'text', help: 'keywords' },
      { id: 'copyDraft', label: '仮原稿', type: 'textarea', rows: 8, help: 'copyDraft' },
      { id: 'charCount', label: 'セクション別文字数（表で設定）', type: 'textarea', help: 'charCount' },
      { id: 'assets', label: '素材の確保状況', type: 'textarea', help: 'assets' },
    ],
    checks: [
      { id: 'c1', label: 'キーメッセージ策定（1〜2文）' },
      { id: 'c2', label: 'ビジュアル方向性 + ムードボード 3〜5 枚' },
      { id: 'c3', label: 'キーワード 3〜5 個' },
      { id: 'c4', label: '仮原稿（字数・段落・見出しが本番想定）' },
      { id: 'c5', label: '素材の確保 or 入手計画' },
      { id: 'c6', label: 'セクション別文字数見積もり' },
    ],
    retroTarget: 'step-3-content-lock',
  },
  '4': {
    title: 'Step 4 — トンマナ確定 ★',
    subtitle: '色・フォント・ビジュアル・グリッド。以降変更しない。',
    fields: [
      { id: 'colors', label: 'カラーパレット（ロール入力で自動生成）', type: 'textarea', rows: 4, help: 'colorRoles' },
      { id: 'typography', label: 'タイポグラフィ（プレビューで設定）', type: 'textarea', rows: 3, help: 'typography' },
      { id: 'visualImg', label: '画像・ビジュアル方向', type: 'textarea', help: 'visualImg' },
      { id: 'grid', label: 'グリッド・余白ルール', type: 'textarea', help: 'grid' },
      { id: 'brandOverride', label: '既存ガイドライン適用メモ（あれば）', type: 'text' },
    ],
    checks: [
      { id: 'c1', label: 'メイン・サブ・アクセント・ニュートラル決定 + 理由' },
      { id: 'c2', label: 'RGB / CMYK 両方記載・色見本確認' },
      { id: 'c3', label: '見出し・本文フォント + サイズ階層' },
      { id: 'c4', label: '和文・洋文・数字混在の表示確認' },
      { id: 'c5', label: '画像タイプ・トーンの言語化 + 参考 5〜10 枚' },
      { id: 'c6', label: 'グリッドシステム確定' },
      { id: 'c7', label: 'ホワイトスペース戦略を言語化' },
      { id: 'c8', label: 'Step 3 のキーメッセージと整合' },
    ],
    retroTarget: 'step-4-visual-foundation',
  },
};

export const MODULE_CHECKS = {
  A: {
    title: 'Step 5 — モジュール A（パンフレット）★',
    subtitle: '仕様・台割・WF・画像スペース。仮原稿でレイアウト実証。',
    fields: [
      { id: 'spec', label: '仕様（セレクタで確定）', type: 'textarea', help: 'spec' },
      { id: 'pageMap', label: '台割（ページ役割 × 原稿割り当て）', type: 'textarea', rows: 4, help: 'pageMap' },
      { id: 'wireframe', label: '配置ラフ（ワイヤーフレーム）', type: 'textarea', rows: 4, help: 'wireframe' },
      { id: 'imageSpec', label: '写真の置き場', type: 'textarea', help: 'imageSpec' },
    ],
    checks: [
      { id: 'c1', label: '仕様確定（サイズ・ページ数・用紙・折り・加工・部数・納期）' },
      { id: 'c2', label: '台割設計（全ページの役割と原稿割り当て）' },
      { id: 'c3', label: 'ワイヤーフレーム（実寸グリッド・仮原稿で実証）' },
      { id: 'c4', label: '画像スペース指定（サイズ・アスペクト・トリミング）' },
      { id: 'c5', label: 'Step 4 の色・フォント・グリッドが機能するか確認' },
      { id: 'c6', label: '入稿前確認項目の洗い出し' },
    ],
  },
  B: {
    title: 'Step 5 — モジュール B（Web / LP）★',
    subtitle: 'ブレークポイント・サイトマップ・画面 WF・インタラクション。',
    fields: [
      { id: 'spec', label: '仕様（BP・CMS・環境・主要機能）', type: 'textarea' },
      { id: 'sitemap', label: 'サイトマップ・導線', type: 'textarea', rows: 5 },
      { id: 'wireframe', label: 'WF メモ（各 BP）', type: 'textarea', rows: 6 },
      { id: 'interaction', label: 'インタラクション設計', type: 'textarea' },
    ],
    checks: [
      { id: 'c1', label: '仕様確定（ブレークポイント・CMS・環境）' },
      { id: 'c2', label: 'サイトマップ + 導線設計' },
      { id: 'c3', label: '各ブレークポイントの WF' },
      { id: 'c4', label: 'インタラクション設計（ホバー・フォーム等）' },
      { id: 'c5', label: 'CMS 仕様（該当時）' },
      { id: 'c6', label: 'Step 4 が各 BP で機能するか確認' },
    ],
  },
  C: {
    title: 'Step 5 — モジュール C（ポスター）★',
    subtitle: '掲出環境・視線誘導・実寸 WF。',
    fields: [
      { id: 'spec', label: '仕様（掲出場所・サイズ・色数）', type: 'textarea' },
      { id: 'environment', label: '環境シミュレーション', type: 'textarea' },
      { id: 'eyeFlow', label: '視線誘導設計', type: 'textarea' },
      { id: 'wireframe', label: 'WF メモ', type: 'textarea', rows: 5 },
    ],
    checks: [
      { id: 'c1', label: '仕様確定（掲出場所・サイズ・縦横比・色数）' },
      { id: 'c2', label: '環境シミュレーション（視認性・コントラスト）' },
      { id: 'c3', label: '視線誘導設計（メインコピー配置ロック）' },
      { id: 'c4', label: 'ワイヤーフレーム（仮原稿で実証）' },
    ],
  },
  D: {
    title: 'Step 5 — モジュール D（バナー / SNS）★',
    subtitle: '媒体サイズ・セーフゾーン・コピー削減・媒体別 WF。',
    fields: [
      { id: 'spec', label: 'プラットフォーム別サイズ・容量', type: 'textarea' },
      { id: 'safeZone', label: 'セーフゾーン', type: 'textarea' },
      { id: 'copyReduction', label: 'コピー削減メモ', type: 'textarea' },
      { id: 'wireframe', label: '媒体別 WF', type: 'textarea', rows: 5 },
    ],
    checks: [
      { id: 'c1', label: '各プラットフォームの規定サイズ・容量' },
      { id: 'c2', label: 'セーフゾーン確認' },
      { id: 'c3', label: '仮原稿からテキストを媒体に合わせて削減' },
      { id: 'c4', label: '媒体別ワイヤーフレーム' },
    ],
  },
};

export const COPY_STEP = {
  title: '本番原稿ロック',
  subtitle: '仮原稿を本番テキストに差し替え。文案変更なしならスキップ可。',
  fields: [
    { id: 'copyMaster', label: '本番原稿（割付エリアで入力）', type: 'textarea', rows: 6, help: 'copyMaster' },
    { id: 'approval', label: '承認記録（日付・担当者）', type: 'text', help: 'approval' },
    { id: 'wfCheck', label: '配置ラフとの整合メモ', type: 'textarea', help: 'wfCheck' },
  ],
  checks: [
    { id: 'c1', label: '全セクションの本番テキスト確定（承認含む）' },
    { id: 'c2', label: '文字数・段落構造が Step 5 WF と整合' },
    { id: 'c3', label: '素材が最新版に更新' },
  ],
};

export const FINAL_GATE = {
  title: '最終ゲート ★',
  subtitle: 'すべて YES で制作 GO。1 つでも NO なら遡及。',
  items: [
    { id: 'g1', label: 'キーメッセージを自分で述べられる', retro: 'Step 3' },
    { id: 'g2', label: 'ターゲット層について具体的に話せる', retro: 'Step 1 / 2' },
    { id: 'g3', label: '各色・フォントについて理由を述べられる', retro: 'Step 4' },
    { id: 'g4', label: 'ページ/セクションごとの「役割」を説明できる', retro: 'Step 5' },
    { id: 'g5', label: '仕様変更の質問に設計理由で答えられる', retro: '該当 Step' },
    { id: 'g6', label: '実装を「ほぼ想像」できる', retro: 'Step 5' },
  ],
  memoFields: [
    { id: 'memoKeyMessage', label: '一番伝えたいこと — 確認メモ', help: 'keyMessage' },
    { id: 'memoColor', label: '色の理由 — 確認メモ', help: 'colorRoles' },
    { id: 'memoLayout', label: 'レイアウト意図 — 確認メモ', help: 'wireframe' },
  ],
};

export const PRODUCTION_STEP = {
  title: 'Step 6 — 制作・納品',
  subtitle: '決定どおりに実装。レイアウト・色・構成の変更はしない。',
  fields: [
    { id: 'tool', label: '使用ツール（アイコンから選択）', type: 'text', help: 'tool' },
    { id: 'deliverable', label: '納品物（最終ファイル）', type: 'textarea', help: 'deliverable' },
    { id: 'notes', label: '制作メモ', type: 'textarea', help: 'notes' },
  ],
  checks: [
    { id: 'c1', label: '確定レイアウト・本番原稿・素材を配置' },
    { id: 'c2', label: 'Step 4 のカラー・タイポを適用' },
    { id: 'c3', label: '細部調整（字詰め・色微調整等）' },
    { id: 'c4', label: '納品ファイル作成（PDF / 入稿 / 公開）' },
    { id: 'c5', label: 'クライアント最終確認' },
  ],
};

export const GATE_LOG_STEPS = [
  { key: '1', label: 'Step 1', phase: 'Brief' },
  { key: '2', label: 'Step 2', phase: 'Research' },
  { key: '3', label: 'Step 3', phase: 'Concept' },
  { key: '4', label: 'Step 4', phase: 'Visual' },
  { key: '5', label: 'Step 5', phase: 'Layout' },
  { key: 'copy', label: '本番原稿', phase: 'Copy Final' },
  { key: 'gate', label: '最終ゲート', phase: 'Sign-off' },
  { key: '6', label: 'Step 6', phase: 'Production' },
];
