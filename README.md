<h1 align="center">🗓️ ToDo Calendar</h1>

<p align="center">
  <em>React + TypeScript + Vite</em><br>
  <small>カレンダー連動・進捗リング搭載のToDoアプリ</small>
</p>

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
└─ fonts/
   └─ Jersey15-Regular.ttf
```
