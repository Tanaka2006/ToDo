# Vercel情報取得手順（2025年版）

## 🔑 トークン取得方法（最新UI）

### 方法1: Settings → Developer

1. Vercel Dashboard → 右上アバター → Settings
2. 左メニュー「Developer」をクリック
3. 「Personal Access Tokens」セクション
4. 「Create Token」をクリック

### 方法2: 直接URL

https://vercel.com/account/tokens

### 方法3: CLI経由

```bash
npm install -g vercel
vercel login
# ブラウザでログイン後、CLIで直接デプロイ可能
```

## 📝 ID取得方法

### ORG_ID (Team ID)

1. Dashboard → Settings → General → Team ID

### PROJECT_ID

1. プロジェクト選択 → Settings → General → Project ID

## 🚀 CLI使用の場合（トークン不要）

```bash
# プロジェクトディレクトリで実行
vercel

# 初回設定
# - Link to existing project? → No
# - Project name → todo-calendar
# - Directory → ./
# - Want to modify settings? → No

# 本番デプロイ
vercel --prod
```
