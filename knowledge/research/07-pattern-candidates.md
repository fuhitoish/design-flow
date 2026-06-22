# 07 — 型候補一覧（DPL データ化ロードマップ）

[01〜06](./00-index.md) から抽出した **Design Pattern Library 候補** のマスターリスト。  
優先度は Fuhito の実務（モジュール A・和・高級・試用 FB）ベース。

---

## 優先度の定義

| 記号 | 意味 | 目安 |
|---|---|---|
| **P0** | 最初の DPL リリースに含める | 10〜20 型 |
| **P1** | 2 波目 | +15 型 |
| **P2** | モジュール B 以降・上級者向け | 必要に応じて |

---

## P0 — 最優先（Phase K1 種まき）

### 色（COLOR）

| ID | 名前 | 出典 |
|---|---|---|
| COLOR-SCHEME-01 | モノクロマティック | 01 |
| COLOR-SCHEME-02 | アナロガス | 01 |
| COLOR-SCHEME-03 | 60-30-10 テンプレ | 01 |
| COLOR-ROLE-SET | 6 ロール空テンプレ | 01 |

### タイポ（TYPE）

| ID | 名前 | 出典 |
|---|---|---|
| TYPE-SCALE-01 | √2 モジュラースケール | 02, 05 |
| TYPE-HIERARCHY-A4 | A4 パンフ標準階層 | 02 |
| TYPE-PAIR-01 | 明朝見出し + ゴシック本文 | 02 |
| TYPE-PAIR-02 | 同一ファミリー・ウェイト分け | 02 |
| TYPE-PAIR-03 | 和欧数字分離 | 02 |

### グリッド・レイアウト（GRID / LAYOUT）

| ID | 名前 | 出典 |
|---|---|---|
| GRID-A4-1COL | A4 1 段・標準マージン | 03 |
| GRID-A4-2COL | A4 2 段組 | 03 |
| GRID-MARGIN-SET | マージン 3 種 | 03 |
| LAYOUT-PAGE-HERO | ヒーロー型 | 03 |
| LAYOUT-PAGE-SPLIT-LR | 左右分割 | 03 |
| WHITESPACE-MINIMAL | 余白・ミニマル | 03 |

### 構図・視線（EYE / COVER）

| ID | 名前 | 出典 |
|---|---|---|
| EYE-Z | Z パターン | 04 |
| EYE-F | F パターン | 04 |
| EYE-CENTER | 中心集中型 | 04 |
| COMP-RULE-THIRDS | 三分割法 | 04, 05 |
| COVER-LAYOUT-01 | 表紙・タイトル上/ビジュアル下 | 04 |

### 比率（PROP）

| ID | 名前 | 出典 |
|---|---|---|
| PROP-SILVER | 白銀比 √2 分割 | 05 |
| PROP-THIRDS | 三分割 | 05 |
| PROP-ASPECT-SET | 画像枠 6 種 | 05 |

### 印刷・モジュール A（PRINT）

| ID | 名前 | 出典 |
|---|---|---|
| PRINT-BIND-8P | 中綴じ 8P 台割 | 06 |
| PRINT-FOLD-2 | 二つ折り 4 面 | 06 |
| PRINT-FOLDER-2PKT | 二つ折り 2 ポケット | 06 |
| PRINT-SET-GIFT | ギフト同封セット | 06 |
| PRINT-PAGE-ROLES-8P | 8P ページ役割 | 06 |

**P0 合計: 約 28 型**（最初はこのうち **15 型** に絞って SVG 化してもよい）

---

## P1 — 第 2 波

| ID | 名前 | 出典 |
|---|---|---|
| COLOR-SCHEME-04 | 和色・夏涼パレット | 01 |
| COLOR-SCHEME-05 | 補色アクセント（小面積） | 01 |
| TYPE-SCALE-02 | 黄金比スケール | 02 |
| TYPE-PAIR-03b | 明朝のみ・高級 | 02 |
| TYPE-READABILITY-SENIOR | シニア向け可読性 | 02 |
| GRID-MODULAR-12 | 12 モジュール | 03 |
| LAYOUT-PAGE-CARDS | カードグリッド | 03 |
| EYE-GUTENBERG | Gutenberg 型 | 04 |
| COVER-LAYOUT-02 | 表紙・全面ビジュアル+帯 | 04 |
| PROP-GOLDEN | 黄金比分割 | 05 |
| PRINT-BIND-12P | 中綴じ 12P | 06 |
| PRINT-FOLD-3 | 三つ折り | 06 |

---

## P2 — 将来（モジュール B/C/D）

| カテゴリ | 例 |
|---|---|
| Web 12 カラム | GRID-12COL-WEB |
| バナーセーフゾーン | BANNER-SAFE-* |
| ポスター遠距離視認 | POSTER-DISTANCE-* |
| トライアド配色 | COLOR-SCHEME-TRIAD |

---

## 収集タスク（次にやること）

### リサーチ深化

- [ ] 社内過去案件から **実績パレット 5 組** を CMYK で抜き出す
- [ ] 社内 **8P 台割 3 パターン** を模式図化
- [ ] 2 ポケットフォルダの **展開図 1 件** を実寸スキャン or 再構成
- [ ] 日本郵便 **定形外サイズ** 最新表をリンク保存
- [ ] 書籍 2〜3 冊から各カテゴリ **引用メモ** を追記

### データ化（Phase K2）

- [x] P0 から **15 型** を選定 → `manifest.json` `p0_release`
- [x] 各型: JSON + SVG 模式図（主要型）
- [x] `knowledge/patterns/manifest.json` 作成
- [x] pilot/trial Step 4/5 で **型 picker** 接続試験

---

## 試用案件との対応

| 試用 FB | 関連する型候補 |
|---|---|
| 和の比率 1.414 | PROP-SILVER, TYPE-SCALE-01 |
| 視線誘導トレンド | EYE-Z, EYE-F, EYE-CENTER |
| 2 ポケットフォルダ | PRINT-FOLDER-2PKT, PRINT-SET-GIFT |
| 色を論理的に | COLOR-ROLE-SET, COLOR-SCHEME-03 |
| グリッド選択 | GRID-A4-*, GRID-MARGIN-SET |
| 台割・ページ管理 | PRINT-BIND-8P, PRINT-PAGE-ROLES-8P |

---

## 改訂

| 日付 | 内容 |
|---|---|
| 2026-06-22 | 初版 — 01〜06 から候補を統合 |
