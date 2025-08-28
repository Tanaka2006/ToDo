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

| Name                | Value                     | 説明           |
| ------------------- | ------------------------- | -------------- |
| `VERCEL_TOKEN`      | 手順2で取得したトークン   | Vercel API認証 |
| `VERCEL_ORG_ID`     | 手順2で取得したOrg ID     | 組織ID         |
| `VERCEL_PROJECT_ID` | 手順2で取得したProject ID | プロジェクトID |

## 🔧 詳細なGitHubシークレット設定手順

### ステップバイステップ設定ガイド

1. **GitHubリポジトリにアクセス**
   - `https://github.com/Tanaka2006/ToDo` にアクセス
   - 「Settings」タブをクリック

2. **Secrets and variables にアクセス**
   - 左サイドバーの「Secrets and variables」をクリック
   - 「Actions」を選択

3. **各シークレットを個別に追加**

   **3-1. VERCEL_TOKEN**
   - 「New repository secret」をクリック
   - Name: `VERCEL_TOKEN`
   - Secret: Vercelから取得したトークン値
   - 「Add secret」をクリック

   **3-2. VERCEL_ORG_ID**
   - 「New repository secret」をクリック
   - Name: `VERCEL_ORG_ID`
   - Secret: Vercelから取得したOrg ID
   - 「Add secret」をクリック

   **3-3. VERCEL_PROJECT_ID**
   - 「New repository secret」をクリック
   - Name: `VERCEL_PROJECT_ID`
   - Secret: Vercelから取得したProject ID
   - 「Add secret」をクリック

### 設定完了の確認方法

設定が完了すると、以下のシークレットが表示されるはずです：
- ✅ `VERCEL_TOKEN`
- ✅ `VERCEL_ORG_ID` 
- ✅ `VERCEL_PROJECT_ID`

**注意:** シークレットの値は設定後は表示されません（セキュリティのため）。

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
