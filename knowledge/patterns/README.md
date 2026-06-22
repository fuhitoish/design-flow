# patterns/ — Design Pattern Library（型 DB v0.1）

`research/` で整理した知識を **選択可能な型** として JSON 化したデータです。

## ファイル構成

| ファイル | 内容 |
|---|---|
| [manifest.json](./manifest.json) | 全型の索引・バージョン |
| [color.json](./color.json) | 配色・カラーロール |
| [typography.json](./typography.json) | タイポスケール・ペア |
| [grid.json](./grid.json) | グリッド・ページレイアウト |
| [eye.json](./eye.json) | 視線誘導・構図 |
| [proportion.json](./proportion.json) | 比率・プロポーション |
| [print.json](./print.json) | モジュール A（印刷物） |
| [svg/](./svg/) | 模式図（視覚型のみ） |

## レコード形式

```json
{
  "id": "COLOR-SCHEME-01",
  "name": "モノクロマティック",
  "category": "color",
  "summary": "…",
  "when_to_use": "…",
  "when_not": "…",
  "params": {},
  "modules": ["A", "B", "C", "D"],
  "tags": [],
  "priority": "P0",
  "svg": "svg/example.svg",
  "apply": { "field": "colors", "template": "…" }
}
```

## 接続先

- [pilot/trial/](../../pilot/trial/) — Step 4/5 パターン picker（試験接続）
- [research/07-pattern-candidates.md](../research/07-pattern-candidates.md) — 候補マスター
