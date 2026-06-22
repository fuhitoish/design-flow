A modular design workflow that locks requirements, copy, and visual foundations before production.

## リポジトリ構成

```
design-flow/
├── plan/       計画・設計（PLAN.md、ガイド HTML）
├── pilot/      実験・試用（試用アプリ、テンプレ、サンプル）
├── app/        本番 Web アプリ（Phase 2・着手準備中）
└── .github/    Staging デプロイ
```

## Staging（おすすめ）

| ページ | URL |
|---|---|
| **試用アプリ** | https://fuhitoish.github.io/design-flow/pilot/trial/ |
| **計画ガイド** | https://fuhitoish.github.io/design-flow/plan/ |
| **トップ** | https://fuhitoish.github.io/design-flow/ |

`main` に push するたびに自動更新。詳細: [plan/STAGING.md](plan/STAGING.md)

## 各フォルダ

| フォルダ | 内容 |
|---|---|
| [plan/](plan/) | 正本 [PLAN.md](plan/PLAN.md)、[ガイド HTML](plan/index.html)、プロトタイプ |
| [pilot/](pilot/) | [試用アプリ](pilot/trial/)、[テンプレ](pilot/templates/)、[サンプル](pilot/samples/) |
| [app/](app/) | 本番アプリ（これから実装） |

### ローカル起動（試用アプリ）

`open-app.bat` をダブルクリック（または `open-app.vbs`）

```powershell
start plan/index.html
```
