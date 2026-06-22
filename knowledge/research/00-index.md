# 知識収集インデックス

**目的:** デザイン手法・色理論・レイアウトなどを整理し、将来の型 DB（DPL）に何を入れるか判断する材料を揃える。  
**方針:** 網羅辞典ではなく、**Fuhito の実務（印刷物・和・高級系・モジュール A 中心）** に効く知識を優先する。

---

## 収集カテゴリ

| # | ファイル | 内容 | DPL 化の主な用途 |
|---|---|---|---|
| 01 | [01-color-theory.md](./01-color-theory.md) | 色理論・配色の型 | Step 4 カラーピッカー |
| 02 | [02-typography.md](./02-typography.md) | タイポグラフィ・文字組み | Step 4 フォント階層 |
| 03 | [03-grid-and-layout.md](./03-grid-and-layout.md) | グリッド・段組・余白 | Step 4〜5 レイアウト骨格 |
| 04 | [04-composition-eye-flow.md](./04-composition-eye-flow.md) | 構図・視線誘導 | Step 5 WF・表紙設計 |
| 05 | [05-proportion-systems.md](./05-proportion-systems.md) | 比率・プロポーション | 用紙・見開き・要素配置 |
| 06 | [06-module-a-print.md](./06-module-a-print.md) | 印刷物・パンフ・封筒 | 台割・折り・入稿 |
| 07 | [07-pattern-candidates.md](./07-pattern-candidates.md) | **型候補一覧** | 実装優先度の決定 |

---

## 2 種類の知識（再確認）

| 種類 | 説明 | 本フォルダでの扱い |
|---|---|---|
| **普遍的手法** | 色理論・グリッド・視線誘導など、媒体を問わず使える | 01〜05 |
| **媒体・案件固有の型** | A4 8P 中綴じ、二つ折りポケット等 | 06 + 07 |

Step 2（案件リサーチ）で調べる競合・ムードとは別物。  
ここは **ツールが最初から持っている「メニュー表」** の原材料。

---

## 収集時の記録フォーマット（各エントリ）

将来 JSON 化するときのメモ。調べた項目は可能なら以下で揃える。

```yaml
name:           # 手法・型の名前
category:       # color / grid / layout / eye-flow / proportion / print
summary:        # 1〜2 文で何か
when_to_use:    # 向いている状況
when_not:       # 避ける状況
params:         # 数値・比率など再現に必要なもの
modules:        # A / B / C / D
tags:           # 和 / 高級 / 夏 / テキスト多め 等
references:     # 書籍・URL・社内実績
priority:       # P0 / P1 / P2（DPL 化の優先度）
```

---

## 次のステップ

1. ~~07 の候補リストから **P0 を 10〜15 型** に絞る~~ → [patterns/manifest.json](../patterns/manifest.json) `p0_release`（15 型）
2. ~~各型について **模式図（SVG）** のラフを 1 枚ずつ作る~~ → [patterns/svg/](../patterns/svg/)（主要型）
3. ~~`knowledge/patterns/` に JSON + SVG で正式登録~~ → v0.1 完了
4. **深掘り:** 社内パレット CMYK、実寸展開図スキャン、印刷会社別入稿値
5. **app/** でカラーピッカー・WF キャンバスと DPL 本格接続（Phase R2）
