# Vercel設定完全ガイド（2025年版）

## � 1. Vercelアカウント・プロジェクト作成

### 手順1: Vercelアカウント作成

1. [vercel.com](https://vercel.com) にアクセス
2. GitHubアカウントでサインアップ・ログイン

### 手順2: GitHubリポジトリをインポート

1. Vercel Dashboard → 「Add New...」→ 「Project」
2. GitHubからこのToDoリポジトリを選択
3. 「Import」をクリック
4. 設定はデフォルトのまま「Deploy」

## 🔑 2. シークレット情報の取得

### VERCEL_TOKEN

1. Vercel Dashboard → 右上アバター → 「Account Settings」
2. 左メニュー「Tokens」をクリック
3. 「Create Token」→ 名前を入力（例: `github-actions`）
4. スコープは「Full Account」を選択
5. 生成されたトークンをコピー保存

### VERCEL_ORG_ID

1. Vercel Dashboard → 右上アバター → 「Account Settings」
2. 「General」タブ → 「Your ID」の値をコピー

### VERCEL_PROJECT_ID

1. Vercelで作成したプロジェクトを選択
2. 「Settings」タブ → 「General」
3. 「Project ID」の値をコピー

## ⚙️ 3. GitHubシークレット設定

GitHubリポジトリで以下を設定：

1. リポジトリページ → 「Settings」タブ
2. 左メニュー「Secrets and variables」→ 「Actions」
3. 「New repository secret」で以下を追加：

| Name           | Value                     | 説明           |
| -------------- | ------------------------- | -------------- |
| `VERCEL_TOKEN` | 手順2で取得したトークン   | Vercel API認証 |
| `ORG_ID`       | 手順2で取得したOrg ID     | 組織ID         |
| `PROJECT_ID`   | 手順2で取得したProject ID | プロジェクトID |

## 🔄 4. 自動デプロイの確認

1. `main`ブランチにコミット・プッシュ
2. GitHub Actions → 「CI/CD Pipeline」で実行状況確認
3. `deploy-vercel`ジョブが成功することを確認
4. Vercel Dashboard で デプロイ状況確認

## 📝 トラブルシューティング

### よくある問題

**❌ トークンエラー**

- シークレットの名前が正確か確認
- トークンの有効期限をチェック

**❌ ビルドエラー**

- `vercel.json`の設定確認
- `package.json`のbuildコマンド確認

**❌ ルーティングエラー**

- `vercel.json`のroutes設定確認
- SPAリダイレクト設定確認

### 手動デプロイ（確認用）

```bash
# Vercel CLIインストール
npm install -g vercel

# ログイン
vercel login

# 初回セットアップ
vercel

# 本番デプロイ
vercel --prod
```
