# 手動デプロイガイド - CI/CD + 手動デプロイ構成

## 🏗️ 新しい開発フロー

### **CI/CD（自動）+ デプロイ（手動）**の最適構成

✅ **GitHub Actions CI/CD**: 品質保証・ビルドテスト（自動実行）
- ESLint・Prettier チェック
- TypeScript・Vite ビルドテスト
- アーティファクト生成

✅ **デプロイ**: 手動実行（確実・安定）
- Vercel・Netlify・GitHub Pages
- 問題が起きても即座に修正可能
- デプロイタイミングを完全制御

### 🔄 開発ワークフロー
1. **コード変更** → Git commit & push
2. **GitHub Actions** → 自動で品質チェック・ビルドテスト
3. **CI/CD成功確認** → 手動デプロイ実行
4. **本番サイト更新完了** 🎉

---

## 🎯 1. Vercel（最推奨・最簡単）

### 特徴
- ✅ **超簡単**: GitHubリポジトリを選択するだけ
- ⚡ **超高速**: 世界最速レベルのデプロイ・表示速度
- 🔄 **自動更新**: Git push時に自動デプロイ
- 🌍 **グローバルCDN**: 世界中で高速アクセス
- 📱 **プレビュー**: プルリクエスト毎にプレビューURL生成
- 💰 **無料**: 個人使用は完全無料

### 🔄 既存プロジェクトの場合（現在の状況）

#### Step 1: 現在のデプロイ状況確認
1. [vercel.com](https://vercel.com) のダッシュボードにアクセス
2. `ToDo` プロジェクトをクリック
3. 「Deployments」タブで最新のデプロイ状況を確認

#### Step 2: 自動デプロイのトリガー
既にセットアップ済みの場合、以下のいずれかでデプロイされます：
- ✅ **自動**: GitHubにpushすると自動デプロイ
- 🔄 **手動**: Vercelダッシュボードから手動デプロイ

#### Step 3: 手動デプロイの方法
Vercelダッシュボードで：
1. プロジェクト選択 → 「Deployments」タブ
2. 最新のコミットで「Redeploy」ボタンをクリック
3. または「Settings」→「Git」で再接続

#### Step 4: URLの確認
- プロジェクトページで自動生成されたURLを確認
- 例: `https://to-do-[random].vercel.app`

### 🎊 既存プロジェクトでの完了確認！
- Vercelダッシュボードでデプロイ状況確認
- 生成されたURLでサイトアクセス確認
- 今後のGit pushで自動更新

### 📋 新規プロジェクト作成の場合

#### Step 1: Vercelアカウント作成
1. [vercel.com](https://vercel.com) にアクセス
2. 「Sign up」→ GitHubアカウントで登録

#### Step 2: プロジェクトインポート
1. Vercelダッシュボードで「Add New...」→ 「Project」
2. GitHubから `ToDo` リポジトリを選択
3. 「Import」をクリック

#### Step 3: 設定確認（通常は自動検出）
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm ci
```

#### Step 4: デプロイ実行
1. 「Deploy」ボタンをクリック
2. 約1-2分で完了
3. 生成されたURLでサイトにアクセス可能

---

## 🔥 2. Netlify（機能豊富）

### 特徴
- 🛠️ **豊富な機能**: フォーム処理、関数、認証
- 🎯 **ドラッグ&ドロップ**: ファイルをドロップするだけ
- 🔄 **Git連携**: GitHub連携で自動デプロイ
- 📊 **分析**: アクセス解析機能
- 💰 **無料プラン**: 月100GB転送量

### 手順A: ドラッグ&ドロップ（最簡単）

#### Step 1: ビルド
```bash
cd /Users/Rina/ToDo
npm run build
```

#### Step 2: Netlifyでデプロイ
1. [netlify.com](https://netlify.com) でアカウント作成
2. ダッシュボードで「Sites」ページを開く
3. `dist` フォルダを画面にドラッグ&ドロップ
4. 即座にデプロイ完了！

### 手順B: Git連携（自動更新）
1. Netlifyダッシュボードで「Add new site」→ 「Import an existing project」
2. GitHubからリポジトリ選択
3. 設定:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
4. 「Deploy site」で完了

---

## 🏢 3. GitHub Pages（GitHubネイティブ）

### 特徴
- 💰 **完全無料**: GitHub提供
- 🔗 **簡単URL**: `username.github.io/repository`
- 🔒 **自動SSL**: HTTPS対応
- 📦 **GitHubとの完全統合**

### 手順: 手動デプロイ

#### Step 1: gh-pagesパッケージ使用
```bash
cd /Users/Rina/ToDo

# gh-pagesパッケージをインストール（開発依存関係として）
npm install --save-dev gh-pages

# package.jsonにdeployスクリプトを追加済み確認
# "deploy": "npm run build && gh-pages -d dist"
```

#### Step 2: デプロイ実行
```bash
# ビルド→デプロイを一括実行
npm run deploy
```

#### Step 3: GitHub設定
1. GitHubリポジトリページ → 「Settings」
2. 左メニュー「Pages」
3. Source: 「Deploy from a branch」
4. Branch: 「gh-pages」/「/ (root)」
5. 「Save」

#### 🎊 完了！
- URL: `https://tanaka2006.github.io/ToDo/`
- 今後は `npm run deploy` でデプロイ

---

## 🔥 4. Firebase Hosting（Google製）

### 特徴
- 🌐 **グローバルCDN**: Google品質のインフラ
- 🔒 **無料SSL**: 自動HTTPS
- 📊 **分析機能**: 詳細なアクセス解析
- 🎯 **カスタムドメイン**: 独自ドメイン対応

### 手順

#### Step 1: Firebase CLIインストール
```bash
npm install -g firebase-tools
```

#### Step 2: Firebaseプロジェクト作成
1. [console.firebase.google.com](https://console.firebase.google.com) でプロジェクト作成
2. プロジェクト名: 「ToDo-Calendar」など

#### Step 3: 初期設定
```bash
cd /Users/Rina/ToDo

# Firebaseにログイン
firebase login

# プロジェクト初期化
firebase init hosting

# 設定:
# - 作成したプロジェクトを選択
# - Public directory: dist
# - Single-page app: Yes
# - GitHub auto deploys: No（今回は手動）
```

#### Step 4: デプロイ
```bash
# ビルド
npm run build

# デプロイ
firebase deploy
```

#### 🎊 完了！
- 生成されたFirebase URLでアクセス可能
- 今後は `npm run build && firebase deploy` でデプロイ

---

## 🚨 Vercel白画面問題の解決方法

### 原因と対策

#### ❌ 問題: Vercelで画面が真っ白
- **原因**: ベースパス設定の問題
- **症状**: サイトにアクセスすると何も表示されない
- **解決**: 環境変数とVite設定の修正

#### ✅ Step 1: Vercel環境変数の設定
1. Vercelプロジェクト → **Settings** → **Environment Variables**
2. 新しい環境変数を追加：
   ```
   Name: VERCEL
   Value: 1
   Environment: Production, Preview, Development (すべてチェック)
   ```
3. **Save** → **Redeploy**

#### ✅ Step 2: デプロイログの確認
Vercelの「Deployments」→ 最新デプロイ → **View Build Logs**で以下を確認：
```
🔧 Vite Config: { isVercel: true, isDev: false, base: '/', NODE_ENV: 'production' }
```

#### ✅ Step 3: 即座に動く代替方法（Netlify）
Vercelで問題が続く場合の確実な方法：

```bash
# ローカルでビルド
cd /Users/Rina/ToDo
npm run build

# Netlifyでドラッグ&ドロップデプロイ
# 1. netlify.com でアカウント作成
# 2. Sitesページで dist フォルダをドラッグ&ドロップ
# 3. 即座にサイト公開完了！
```

#### ✅ Step 4: GitHub Pagesの手動デプロイ
```bash
# GitHub Pagesに直接デプロイ
npm run deploy

# GitHubリポジトリ Settings → Pages で gh-pages ブランチを選択
# URL: https://tanaka2006.github.io/ToDo/
```

### 🎯 推奨順序
1. **Vercel環境変数設定** → 再デプロイ
2. **Netlifyドラッグ&ドロップ** （最も確実）
3. **GitHub Pages手動デプロイ** （GitHub純正）

いずれの方法でも5分以内にサイトが公開されます！

---

## 🎯 推奨デプロイ方法の比較

| サービス | 簡単さ | 速度 | 機能 | カスタムドメイン | おすすめ度 |
|---------|--------|------|------|-----------------|-----------|
| **Vercel** | ⭐⭐⭐⭐⭐ | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐ | ✅ 無料 | 🏆 **最推奨** |
| **Netlify** | ⭐⭐⭐⭐⭐ | ⚡⚡⚡⚡ | ⭐⭐⭐⭐⭐ | ✅ 無料 | 🥈 **高機能** |
| **GitHub Pages** | ⭐⭐⭐ | ⚡⚡⚡ | ⭐⭐ | ✅ 無料 | 🥉 **シンプル** |
| **Firebase** | ⭐⭐ | ⚡⚡⚡⚡ | ⭐⭐⭐⭐⭐ | ✅ 無料 | ⭐ **企業向け** |

---

## ✨ 今すぐ試すなら

### 🚀 **最速1分デプロイ（Vercel）**
1. [vercel.com](https://vercel.com) でGitHubログイン
2. リポジトリ選択 → Import → Deploy
3. 完了！

### 🎯 **最簡単デプロイ（Netlify）**
```bash
npm run build
# 生成された dist フォルダを netlify.com にドラッグ&ドロップ
```

### 🏠 **GitHub純正（GitHub Pages）**
```bash
npm run deploy
# GitHubのPagesでgh-pagesブランチを選択
```

---

## 🎊 まとめ

**一番のおすすめは Vercel です。**

理由:
- ✅ **設定不要**: リポジトリ選択だけで完了
- ⚡ **超高速**: 世界最速クラスの表示速度
- 🔄 **自動更新**: Git pushで自動デプロイ
- 📱 **プレビュー**: プルリクごとにプレビューURL
- 💰 **完全無料**: 個人使用は無料
- 🎯 **React最適化**: Vite/Reactに特化した最適化

**5分で本格的なWebサイトが公開できます！**
