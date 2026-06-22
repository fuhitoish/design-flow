A modular design workflow that locks requirements, copy, and visual foundations before production.

## Staging（おすすめ）

**ブックマーク用 URL（デプロイ後）:**

| ページ | URL |
|---|---|
| **試用アプリ** | https://fuhitoish.github.io/design-flow/app/ |
| **計画ガイド** | https://fuhitoish.github.io/design-flow/DOCS/ |
| **トップ（アプリへ転送）** | https://fuhitoish.github.io/design-flow/ |

`main` に push するたびに自動更新されます。ローカルサーバーや `open-app.bat` は不要です。

### 初回セットアップ（1回だけ）

1. 変更を `main` に push
2. GitHub → リポジトリ **Settings** → **Pages**
3. **Build and deployment** → Source を **GitHub Actions** に設定
4. Actions タブで `Deploy staging` ワークフローが成功するのを待つ（1〜2分）

詳細: [DOCS/STAGING.md](DOCS/STAGING.md)

---

## Docs

- **[試用システム (app/)](app/index.html)** — 案件作成・Step 進行・ゲート管理（ブラウザ / localStorage）
- **[Design Flow ガイド v1.1](DOCS/index.html)** — 計画の説明（変更点・成果・流れ）
- **[Master Plan (PLAN.md)](DOCS/PLAN.md)** — 正本の設計書
- **[Templates](templates/)** — コア Step 1–4 + 制作物別モジュール + ゲート・制作（40ファイル）
- **[Sample Case (HTML)](samples/case-01-bellagio-miyabi-pamphlet/index.html)** — 記入済みサンプル案件（ビジュアル版）
- **[Sample Case (text)](samples/case-01-bellagio-miyabi-pamphlet/)** — 同上・テキスト版

### ローカル（オフライン・開発用）

| 方法 | 操作 |
|---|---|
| **ダブルクリック** | [`open-app.bat`](open-app.bat) |
| **黒い窓を出さない** | [`open-app.vbs`](open-app.vbs) |

ローカルサーバー（ポート `5180`）を起動します。日常利用は Staging URL の方が簡単です。

```powershell
start DOCS/index.html
```
