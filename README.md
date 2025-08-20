🗓️ ToDo — React + TypeScript + Vite

カレンダーと連動して 毎日のタスク進捗を“リング”で可視化する ToDo Web アプリです。タスクの 登録・編集・削除（CRUD）／一覧・詳細表示 に加えて、繰り返しルール と 終了日ステッパー、当日／当月の進捗リング を実装。データはブラウザの localStorage に永続化します。

✨ 主な機能（完成 & 予定）

✅ タスクの CRUD：作成／編集（タイトル・繰り返し・終了日）／削除

🗂️ 一覧・詳細表示：

一覧：カレンダー各セルに当日の進捗リングを表示（0〜100%）

詳細：日別モーダルでその日のタスクをチェック・編集

🔁 繰り返しルール：none | daily | weekly | monthly | yearly

daily：n 日ごと（上下ボタンで間隔を調整）

weekly：曜日を複数選択

monthly：開始日の“日付”基準。月末は自動補正

yearly：開始日の“月/日”で毎年発生

📅 終了日ステッパー：年・月・日を上下ボタンで直感的に設定

🎯 YEAR / WEEK ゴール：自由記述で目標を保存（自動で localStorage に保存）

📈 進捗の可視化：当日・当月の完了率を SVG リングで表示

💾 永続化：localStorage（キー: todoapp:v1）

独自要件として、🔁 繰り返し + 📅 終了日ステッパー + 📈 進捗リング + 🎯 ゴール入力を追加実装しています。

🛠 技術スタック

分野

使用技術

フロントエンド

React + TypeScript

UI / Icons

カスタム CSS, react-icons, @fontsource/dotgothic16

カレンダー

react-calendar

状態管理

React Hooks（useState / useEffect）

永続化

localStorage

品質（任意）

ESLint, Prettier

テスト（任意）

Vitest + React Testing Library

CI/CD（任意）

GitHub Actions

📸 スクリーンショット（開発中）

docs/images/ に入れて README から参照すると見やすいです。以下は例：

当日カード

日別モーダル

カレンダー（月）

🚀 クイックスタート

# 依存インストール

npm install

# 開発サーバ（HMR）

npm run dev

# 本番ビルド

npm run build

# ビルドのローカル確認

npm run preview

🧭 使い方

右側の カードで当日のタスクを確認し、チェックで完了にします。

カレンダーの任意日付をクリックすると、日別モーダルが開きます。

**「＋ 追加する」**でタスクを作成。右端の ✏️ ボタンで編集できます。

繰り返しは「なし／毎日／毎週／毎月／毎年」から選択。daily は n 日ごと、weekly は曜日を複数選択。

終了日を設定する場合はチェック ON → 年・月・日ステッパーで調整。

当日／当月のリングが自動で更新され、完了率がひと目で分かります。

🧱 データモデル

export type Task = {
id: string; // 任意 ID（UUID など）
title: string; // タスク名
date: string; // 開始日 (YYYY-MM-DD)
repeat: "none" | "daily" | "weekly" | "monthly" | "yearly";
repeatInterval?: number; // daily: 何日ごと
repeatDays?: number[]; // weekly: 曜日（複数可）
repeatEndDate?: string; // 繰り返し終了 (YYYY-MM-DD)
completedDates: string[]; // 完了した日付（YYYY-MM-DD）
};

保存：localStorage.setItem("todoapp:v1", JSON.stringify(tasks))

出現判定：isOnDate(task, ymd) にロジックを集約

進捗計算：getProgressFor(ymd)（当日）／getMonthlyProgress(baseDate)（月間）

📂 ディレクトリ（抜粋）

├─ index.html
├─ src/
│ ├─ main.tsx
│ ├─ App.tsx # 画面本体
│ ├─ App.css # レイアウト/モーダル等
│ └─ index.css # ベーススタイル/フォント
└─ public/
└─ fonts/Jersey15-Regular.ttf

🧪 開発メモ & 既知の課題

🗑️ 繰り返しタスクの削除体験：

「この日のみ削除」/「この日以降をすべて削除」の二択ダイアログを検討中

実装案：skipDates: string[] を Task に追加し、その日のみ非表示

🗓️ weekly の曜日インデックス：UI（月始）と Date.getDay()（日始）の差を吸収する変換レイヤーを追加予定

⚡ パフォーマンス：getMonthlyProgress などを useMemo でメモ化

🛡️ バリデーション：タイトル必須・最大長、weekly 未選択時の警告

♿ アクセシビリティ：モーダルの初回フォーカス制御、Esc で閉じる

🧰 テスト：isOnDate の境界（閏年・月末・曜日）を中心に UT 追加

🗺️ ロードマップ（アイデア）

⛓️ スキップ機能：特定日だけ繰り返しを除外

🌐 デプロイ：Vercel / Netlify

🧾 OpenAPI + Go バックエンド連携（将来のサーバ永続化）

🏷️ タグ/優先度/期限 の追加

📳 通知（Web Push）

📱 PWA 対応

🤝 貢献

Issue / PR 歓迎！スタイルや UI の改善提案も大歓迎です。

📄 ライセンス

MIT
