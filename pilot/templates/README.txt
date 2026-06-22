================================================================================
templates/ — Design Flow テンプレート一式
================================================================================

■ 全体像（コア + モジュール = 計画完成）

  project/          … 案件台帳・ステータス管理
  core/             … Step 1〜4（全案件共通の骨格）
  modules/          … Step 5（制作物別の肉付け・1つのみ）
  gate/             … 本番原稿ロック + 最終ゲート（Step 6 前）
  production/       … Step 6 制作チェックリスト

  コア（骨格）+ モジュール（肉付け ★）+ 本番原稿 + 最終ゲート ★ → 制作

  ※ 各 Step に業界標準フェーズを対応（PLAN.md §3）
  ※ Step 3 = 仮原稿（copy-draft） / 本番 = copy-final-lock


■ 使い方（新規案件）

  1. project/project-index.txt をコピーし、プロジェクトフォルダを作成
  2. core/step-1 → 2 → 3 → 4 を順に template.txt + サブを記入
  3. Step 1 で選んだ modules/module-X/ を記入
  4. gate/copy-final-lock.txt（本番原稿）— 必要時
  5. gate/final-gate.txt で全 YES 確認
  6. production/step-6-production.txt で制作・納品

  遡及・変更は project/status-tracker.txt に記録


■ ディレクトリ一覧

  project/
    project-index.txt
    status-tracker.txt

  core/
    README.txt
    step-1-requirements/
      template.txt, persona-sheet.txt, content-inventory.txt, constraints-reference.txt
    step-2-research/
      template.txt, competitor-analysis.txt, inspiration-log.txt, persona-deep-dive.txt
    step-3-content-lock/
      template.txt, key-message.txt, moodboard-brief.txt, copy-draft.txt, copy-master.txt,
      asset-checklist.txt, character-count.txt
    step-4-visual-foundation/
      template.txt, 4-1-color-palette.txt, 4-2-typography.txt,
      4-3-visual-direction.txt, 4-4-grid-whitespace.txt, brand-guideline-override.txt

  modules/
    README.txt
    module-A-pamphlet/     template.txt + 4 サブ
    module-B-web/          template.txt + 5 サブ
    module-C-poster/       template.txt + 3 サブ
    module-D-banner/       template.txt + 4 サブ

  gate/
    final-gate.txt
    copy-final-lock.txt       … 本番原稿（Step 6 前）

  production/
    step-6-production.txt


■ テンプレート数

  合計 40 ファイル（README 除く）

正本: plan/PLAN.md v1.1
