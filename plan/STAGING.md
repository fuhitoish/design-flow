# Staging 環境（GitHub Pages）

試用アプリを **常に同じ URL** から開けるようにするための staging です。

## URL

| 用途 | URL |
|---|---|
| 試用アプリ（メイン） | https://fuhitoish.github.io/design-flow/pilot/trial/ |
| 計画ガイド | https://fuhitoish.github.io/design-flow/plan/ |
| サンプル案件 | https://fuhitoish.github.io/design-flow/pilot/samples/case-01-bellagio-miyabi-pamphlet/ |
| リポジトリトップ | https://fuhitoish.github.io/design-flow/ |

### 旧 URL からの移行

| 旧 | 新 |
|---|---|
| `/app/` | `/pilot/trial/`（`app/index.html` がリダイレクト） |
| `/DOCS/` | `/plan/`（`DOCS/index.html` がリダイレクト） |

## リポジトリ構成

```
plan/     … 計画・設計
pilot/    … 実験・試用（trial / templates / samples）
app/      … 本番アプリ（Phase 2・準備中）
```

## なぜ Staging か

| | ローカル（open-app.bat） | Staging（GitHub Pages） |
|---|---|---|
| 開き方 | bat 実行・サーバー待ち | URL をブックマークして開くだけ |
| 環境 | Node/Python が必要な場合あり | ブラウザだけ |
| 更新 | git pull 後に再デプロイ不要（file://） | `main` に push で自動反映 |
| データ | その PC のブラウザ内 | そのブラウザ内（localStorage） |

案件データは引き続き **ブラウザの localStorage** に保存されます（サーバーには送りません）。  
PC を替えたときは JSON エクスポート / インポートで移行してください。

## 初回セットアップ

1. リポジトリを GitHub に push（`.github/workflows/deploy-staging.yml` を含む）
2. GitHub → **Settings** → **Pages**
3. **Build and deployment** → Source: **GitHub Actions**
4. **Actions** タブで `Deploy staging` が緑になるまで待つ
5. 試用アプリ URL をブックマーク

手動で再デプロイする場合: Actions → `Deploy staging` → **Run workflow**

## 注意

- リポジトリが **Public** の場合、staging URL は誰でも開けます（個人用ツール想定）
- 非公開にしたい場合は GitHub の Private Pages（有料）か、別の認証付きホスティングを検討
- Phase 2 本番アプリは `app/` に実装予定。試用は `pilot/` のまま維持
