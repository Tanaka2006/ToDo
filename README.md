<h1 align="center">🗓️ ToDo Calendar</h1>

<p align="center">
  <em>React + TypeScript + Vite</em><br>
  <small>カレンダー連動・進捗リング搭載のToDoアプリ</small>
</p>

<div align="center">

[![CI/CD Pipeline](https://github.com/Tanaka2006/ToDo/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Tanaka2006/ToDo/actions/workflows/ci-cd.yml)
[![Security Audit](https://github.com/Tanaka2006/ToDo/actions/workflows/security.yml/badge.svg)](https://github.com/Tanaka2006/ToDo/actions/workflows/security.yml)
[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://Tanaka2006.github.io/ToDo/)

</div>

<h2 align="start">✨ 主な機能（完成 & 予定）</h2>

<li>✅ タスクの CRUD：作成／編集（タイトル・繰り返し・終了日）／削除</li>

<li>🗂️ 一覧：カレンダー各セルに当日の進捗リングを表示（0〜100%）</li>

<li>詳細：日別モーダルでその日のタスクをチェック・編集</li>

<li>🔁 繰り返しルール：none | daily | weekly | monthly | yearly</li>

daily：n 日ごと（上下ボタンで間隔を調整）

weekly：曜日を複数選択

monthly：開始日の“日付”基準。月末は自動補正

yearly：開始日の“月/日”で毎年発生

<li>📅 繰り返し終了日ステッパー：年・月・日を上下ボタンで直感的に設定</li>

<li>🎯 YEAR / WEEK ゴール：自由記述で目標を保存（自動で localStorage に保存）</li>

<li>📈 進捗の可視化：当日・当月の完了率を SVG リングで表示</li>

<li>💾 永続化：localStorage（キー: todoapp:v1）</li>

独自要件として、🔁 繰り返し + 📅 繰り返し終了日ステッパー + 📈 進捗リング + 🎯 ゴール入力を追加実装しています。

<h2 align="left">🛠 技術スタック</h2>

<table>
  <thead>
    <tr>
      <th align="left">分野</th>
      <th align="left">使用技術</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>フロントエンド</td>
      <td>React + TypeScript（Vite）</td>
    </tr>
    <tr>
      <td>フォント</td>
      <td>
        <strong>Jersey 15</strong>：<code>/public/fonts/Jersey15-Regular.ttf</code> を <code>@font-face</code> で読み込み<br>
        <strong>DotGothic16</strong>：<code>@fontsource/dotgothic16</code> をインストールして読み込み
      </td>
    </tr>
    <tr>
      <td>UI / Icons</td>
      <td>独自CSS（App.css, index.css）＋ react-calendar の上書き / <code>react-icons</code></td>
    </tr>
    <tr>
      <td>カレンダー</td>
      <td><code>react-calendar</code></td>
    </tr>
    <tr>
      <td>状態管理</td>
      <td>React Hooks（<code>useState</code> / <code>useEffect</code>）</td>
    </tr>
    <tr>
      <td>永続化</td>
      <td><code>localStorage</code>（キー: <code>todoapp:v1</code>）</td>
    </tr>
    <tr>
      <td>コード品質</td>
      <td><strong>ESLint</strong> + <strong>Prettier</strong> で自動フォーマット・静的解析</td>
    </tr>
    <tr>
      <td>CI/CD</td>
      <td><strong>GitHub Actions</strong> で自動テスト・ビルド・デプロイ</td>
    </tr>
    
  </tbody>
</table>
<h2>🎨 デザイン（Figma）</h2>
<p>
   <a href="https://www.figma.com/design/qN2YVkk0N9sYMzGQsiUcRc/%E7%84%A1%E9%A1%8C?node-id=638-6&t=awxn3oFtJw27Gkf2-1" target="_blank">Figma プレビュー（View Only）</a>
</p>
<h2 align="start">📸 スクリーンショット</h2>

[トップ画面](docs/images/main.png)

[当日カード](docs/images/card.png)

[日別モーダル](docs/images/day-modal.png)

[カレンダー](docs/images/calendar.png)

<h2 align="start">🧭 使い方</h2>
右側の カードで当日のタスクを確認し、チェックで完了にします。

カレンダーの任意日付をクリックすると、日別モーダルが開きます。

**「＋ 追加する」**でタスクを作成。右端の ✏️ ボタンで編集できます。

繰り返しは「なし／毎日／毎週／毎月／毎年」から選択。➡︎ daily は n 日ごと、weekly は曜日を複数選択。そして、繰り返し終了日を設定することもできます。

終了日を設定する場合はチェック ON → 年・月・日ステッパーで調整。

当日／当月のリングが自動で更新され、完了率がひと目で分かります。

<h2 align="start">🧱 データモデル</h2>

export type Task = {<br>
id: string; // 任意 ID（UUID など）<br>
title: string; // タスク名<br>
date: string; // 開始日 (YYYY-MM-DD)<br>
repeat: "none" | "daily" | "weekly" | "monthly" | "yearly";<br>
repeatInterval?: number; // daily: 何日ごと<br>
repeatDays?: number[]; // weekly: 曜日（複数可）<br>
repeatEndDate?: string; // 繰り返し終了 (YYYY-MM-DD)<br>
completedDates: string[]; // 完了した日付（YYYY-MM-DD）<br>
};

保存：localStorage.setItem("todoapp:v1", JSON.stringify(tasks))

出現判定：isOnDate(task, ymd) にロジックを集約

進捗計算：getProgressFor(ymd)（当日）／getMonthlyProgress(baseDate)（月間）

<h2 align="start">📂 ディレクトリ（抜粋）</h2>

```
├─ index.html
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx  # 画面本体
│  ├─ App.css  # レイアウト/モーダル等
│  └─ index.css  # ベーススタイル/フォント
├─ public/
│  └─ fonts/
│     └─ Jersey15-Regular.ttf
├─ .github/
│  ├─ workflows/
│  │  ├─ ci-cd.yml       # CI/CDパイプライン
│  │  └─ security.yml    # セキュリティ監査
│  └─ dependabot.yml     # 依存関係自動更新
├─ .vscode/
│  └─ settings.json      # VS Code設定（フォーマット・Lint）
├─ .prettierrc          # Prettier設定
├─ eslint.config.js     # ESLint設定
└─ package.json
```

<h2 align="start">🚀 開発環境</h2>

<details>
<summary><strong>💻 Code Formatter・Linter</strong></summary>
<br>

<table>
  <thead>
    <tr>
      <th align="left">ツール</th>
      <th align="left">役割</th>
      <th align="left">設定ファイル</th>
      <th align="left">実行コマンド</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>ESLint</strong></td>
      <td>TypeScript・React対応の静的解析<br>コードの問題を自動検出</td>
      <td><code>eslint.config.js</code></td>
      <td><code>npm run lint</code></td>
    </tr>
    <tr>
      <td><strong>Prettier</strong></td>
      <td>コード自動フォーマット<br>統一されたコードスタイル</td>
      <td><code>.prettierrc</code></td>
      <td><code>npm run format</code></td>
    </tr>
    <tr>
      <td><strong>VS Code設定</strong></td>
      <td>保存時自動フォーマット・Lint修正<br>開発効率の向上</td>
      <td><code>.vscode/settings.json</code></td>
      <td>自動実行（保存時）</td>
    </tr>
  </tbody>
</table>

<blockquote>
<p>💡 <strong>自動化のメリット</strong></p>
<ul>
  <li>✅ コードスタイルの統一</li>
  <li>✅ バグの早期発見</li>
  <li>✅ コードレビューの品質向上</li>
  <li>✅ 開発効率の向上</li>
</ul>
</blockquote>

</details>

<details>
<summary><strong>🔄 CI/CD（GitHub Actions）</strong></summary>
<br>

<table>
  <thead>
    <tr>
      <th align="left">ワークフロー</th>
      <th align="left">トリガー</th>
      <th align="left">実行内容</th>
      <th align="left">設定ファイル</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>CI/CDパイプライン</strong></td>
      <td>
        • Push (main, develop)<br>
        • Pull Request (main)
      </td>
      <td>
        1️⃣ コード品質チェック（ESLint・Prettier）<br>
        2️⃣ ビルドテスト（TypeScript・Vite）<br>
        3️⃣ 自動デプロイ（GitHub Pages）
      </td>
      <td><code>.github/workflows/ci-cd.yml</code></td>
    </tr>
    <tr>
      <td><strong>セキュリティ監査</strong></td>
      <td>
        • 週次スケジュール（月曜 09:00）<br>
        • package.json変更時
      </td>
      <td>
        🔍 npm audit実行<br>
        📊 脆弱性レポート生成<br>
        📦 依存関係チェック
      </td>
      <td><code>.github/workflows/security.yml</code></td>
    </tr>
    <tr>
      <td><strong>依存関係自動更新</strong></td>
      <td>週次スケジュール（月曜 09:00）</td>
      <td>
        🔄 npm依存関係の更新PR作成<br>
        🔄 GitHub Actions更新PR作成
      </td>
      <td><code>.github/dependabot.yml</code></td>
    </tr>
  </tbody>
</table>

<h4>📊 ワークフロー実行状況</h4>
<div align="center">

[![CI/CD Pipeline](https://github.com/Tanaka2006/ToDo/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Tanaka2006/ToDo/actions/workflows/ci-cd.yml)
[![Security Audit](https://github.com/Tanaka2006/ToDo/actions/workflows/security.yml/badge.svg)](https://github.com/Tanaka2006/ToDo/actions/workflows/security.yml)

</div>

<blockquote>
<p>🚀 <strong>CI/CDの効果</strong></p>
<ul>
  <li>✅ コードの品質保証</li>
  <li>✅ デプロイの自動化</li>
  <li>✅ セキュリティリスクの早期発見</li>
  <li>✅ 依存関係の最新化</li>
</ul>
</blockquote>

</details>

<details>
<summary><strong>⚡ 開発コマンド</strong></summary>
<br>

<table>
  <thead>
    <tr>
      <th align="left">分類</th>
      <th align="left">コマンド</th>
      <th align="left">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3"><strong>開発</strong></td>
      <td><code>npm run dev</code></td>
      <td>🔥 開発サーバー起動（ホットリロード付き）</td>
    </tr>
    <tr>
      <td><code>npm run build</code></td>
      <td>🏗️ プロダクションビルド</td>
    </tr>
    <tr>
      <td><code>npm run preview</code></td>
      <td>👀 ビルド結果をプレビュー</td>
    </tr>
    <tr>
      <td rowspan="4"><strong>コード品質</strong></td>
      <td><code>npm run lint</code></td>
      <td>🔍 ESLintによるコードチェック</td>
    </tr>
    <tr>
      <td><code>npm run lint:fix</code></td>
      <td>🔧 ESLintによる自動修正</td>
    </tr>
    <tr>
      <td><code>npm run format</code></td>
      <td>✨ Prettierによるフォーマット</td>
    </tr>
    <tr>
      <td><code>npm run format:check</code></td>
      <td>👁️ フォーマットチェック（修正なし）</td>
    </tr>
    <tr>
      <td rowspan="2"><strong>統合</strong></td>
      <td><code>npm run ci</code></td>
      <td>🔄 CI環境と同じチェック実行</td>
    </tr>
    <tr>
      <td><code>npm run deploy</code></td>
      <td>🚀 手動デプロイ（gh-pages）</td>
    </tr>
  </tbody>
</table>

<h4>📋 推奨開発フロー</h4>
<ol>
  <li><code>npm run dev</code> で開発サーバー起動</li>
  <li>コード編集（VS Codeで保存時自動フォーマット）</li>
  <li><code>npm run ci</code> でローカルチェック</li>
  <li>Git commit & push（CI/CDが自動実行）</li>
</ol>

</details>

<details>
<summary><strong>☁️ クラウドデプロイ</strong></summary>
<br>

<table>
  <thead>
    <tr>
      <th align="left">サービス</th>
      <th align="left">URL</th>
      <th align="left">デプロイ方法</th>
      <th align="left">特徴</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>GitHub Pages</strong></td>
      <td><a href="https://Tanaka2006.github.io/ToDo/" target="_blank">🔗 Live Demo</a></td>
      <td>GitHub Actions自動デプロイ</td>
      <td>✅ 無料<br>✅ 自動SSL<br>✅ Git連携</td>
    </tr>
    <tr>
      <td><strong>Vercel</strong></td>
      <td><em>設定後に表示</em></td>
      <td>GitHub連携 or CLI</td>
      <td>⚡ 高速<br>🎯 React最適化<br>🔄 プレビューURL</td>
    </tr>
    <tr>
      <td><strong>Netlify</strong></td>
      <td><em>設定後に表示</em></td>
      <td>ドラッグ&ドロップ or Git連携</td>
      <td>🛠️ 豊富な機能<br>📋 フォーム処理<br>⚡ CDN</td>
    </tr>
    <tr>
      <td><strong>Firebase Hosting</strong></td>
      <td><em>設定後に表示</em></td>
      <td>Firebase CLI</td>
      <td>🌐 グローバルCDN<br>🔒 無料SSL<br>📊 分析機能</td>
    </tr>
  </tbody>
</table>

<h4>🎯 推奨デプロイ手順（Vercel）</h4>
<ol>
  <li><a href="https://vercel.com/" target="_blank">Vercel</a> でアカウント作成</li>
  <li>「Import Git Repository」でGitHubリポジトリを選択</li>
  <li>フレームワーク「Vite」を選択（自動検出）</li>
  <li>「Deploy」をクリック → 自動デプロイ開始</li>
  <li>カスタムドメイン設定（オプション）</li>
</ol>

<h4>⚙️ 手動デプロイコマンド</h4>

```bash
# Netlify CLI
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist

# Firebase CLI
npm install -g firebase-tools
npm run build
firebase login
firebase init hosting
firebase deploy

# Vercel CLI
npm install -g vercel
npm run build
vercel --prod
```

<blockquote>
<p>💡 <strong>デプロイサービス比較</strong></p>
<ul>
  <li>🆓 <strong>無料で始めたい</strong> → GitHub Pages / Vercel</li>
  <li>⚡ <strong>高速・最適化重視</strong> → Vercel</li>
  <li>🛠️ <strong>機能豊富</strong> → Netlify</li>
  <li>🏢 <strong>企業・スケール重視</strong> → AWS / Firebase</li>
</ul>
</blockquote>

</details>
