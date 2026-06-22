A modular design workflow that locks requirements, copy, and visual foundations before production.

## Docs

- **[試用システム (app/)](app/index.html)** — 案件作成・Step 進行・ゲート管理（ブラウザ / localStorage）
- **[Design Flow ガイド v1.1](DOCS/index.html)** — 計画の説明（変更点・成果・流れ）
- **[Master Plan (PLAN.md)](DOCS/PLAN.md)** — 正本の設計書
- **[Templates](templates/)** — コア Step 1–4 + 制作物別モジュール + ゲート・制作（40ファイル）
- **[Sample Case (HTML)](samples/case-01-bellagio-miyabi-pamphlet/index.html)** — 記入済みサンプル案件（ビジュアル版）
- **[Sample Case (text)](samples/case-01-bellagio-miyabi-pamphlet/)** — 同上・テキスト版

### アプリを開く（いちばん簡単）

| 方法 | 操作 |
|---|---|
| **ダブルクリック** | リポジトリ直下の [`open-app.bat`](open-app.bat) |
| **黒い窓を出さない** | [`open-app.vbs`](open-app.vbs) をダブルクリック（デスクトップにショートカット可） |
| **PowerShell** | `.\open-app.ps1` |

ローカルサーバー（ポート `5180`）を自動起動し、ブラウザで `http://127.0.0.1:5180/app/` を開きます。  
すでに起動中ならブラウザだけ開きます。初回は `npx serve` の取得で数十秒かかることがあります。

### ガイド HTML

```powershell
start DOCS/index.html
```
