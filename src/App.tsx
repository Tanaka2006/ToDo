import { RiPencilFill, RiCheckboxBlankLine, RiCheckFill } from 'react-icons/ri';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import '@fontsource/dotgothic16/400.css';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

// 進捗計算・保存
type Repeat = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
export type Task = {
  id: string; // 任意ID
  title: string; // タスク名
  date: string; // 開始日
  repeat: Repeat; // 繰り返し
  repeatInterval?: number; // daily の間隔
  repeatDays?: number[]; // weekly の曜日
  repeatEndDate?: string; // 繰り返し終了
  completedDates: string[]; // 完了した日付
};

const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(
    2,
    '0',
  )}`;
const isOnDate = (task: Task, ymd: string) => {
  const cur = new Date(ymd);
  const start = new Date(task.date);
  cur.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  if (cur < start) return false;
  if (task.repeatEndDate) {
    const end = new Date(task.repeatEndDate);
    end.setHours(0, 0, 0, 0);
    if (cur > end) return false;
  }
  switch (task.repeat) {
    case 'none':
      return ymd === task.date;
    case 'daily': {
      const diff = Math.floor((+cur - +start) / 86400000);
      const k = Math.max(1, task.repeatInterval ?? 1);
      return diff % k === 0;
    }
    case 'weekly': {
      const days = task.repeatDays?.length ? task.repeatDays : [(start.getDay() + 6) % 7];
      const curMon0 = (cur.getDay() + 6) % 7;
      return days.includes(curMon0);
    }
    case 'monthly': {
      const sd = start.getDate();
      const last = new Date(cur.getFullYear(), cur.getMonth() + 1, 0).getDate();
      const eff = Math.min(sd, last);
      return cur.getDate() === eff;
    }
    case 'yearly':
      return cur.getDate() === start.getDate() && cur.getMonth() === start.getMonth();
  }
};

// 進捗度リング
const Ring: React.FC<{ progress: number; size?: number; stroke?: number }> = ({
  progress,
  size = 70,
  stroke = 10,
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const off = C * (1 - p);
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#3e2b1d" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#d78a27"
        strokeWidth={stroke}
        strokeDasharray={C}
        strokeDashoffset={off}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};
// 年・月・日を上下ボタンで調整するステッパー
const EndDateStepper: React.FC<{
  value?: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  const init = value ? new Date(value) : new Date();
  const [y, setY] = React.useState(init.getFullYear());
  const [m, setM] = React.useState(init.getMonth() + 1);
  const [d, setD] = React.useState(init.getDate());

  const daysInMonth = (yy: number, mm1to12: number) => new Date(yy, mm1to12, 0).getDate();
  React.useEffect(() => {
    const last = daysInMonth(y, m);
    if (d > last) setD(last);
  }, [y, m, d]);
  React.useEffect(() => {
    const pad2 = (n: number) => String(n).padStart(2, '0');
    onChange(`${y}-${pad2(m)}-${pad2(d)}`);
  }, [y, m, d, onChange]);

  return (
    <div className="tm-selects">
      {/* 年 */}
      <div className="tm-step">
        <div className="updown-buttons">
          <button className="up" onClick={() => setY(y + 1)}>
            <FaChevronUp />
          </button>
          <button className="down" onClick={() => setY(y - 1)}>
            <FaChevronDown />
          </button>
        </div>
        <div className="tm-label-text">{y}年</div>
      </div>

      {/* 月 */}
      <div className="tm-step">
        <div className="updown-buttons">
          <button className="up" onClick={() => setM(m === 12 ? 1 : m + 1)}>
            <FaChevronUp />
          </button>
          <button className="down" onClick={() => setM(m === 1 ? 12 : m - 1)}>
            <FaChevronDown />
          </button>
        </div>
        <div className="tm-label-text">{m}月</div>
      </div>

      {/* 日 */}
      <div className="tm-step">
        <div className="updown-buttons">
          <button className="up" onClick={() => setD(d === daysInMonth(y, m) ? 1 : d + 1)}>
            <FaChevronUp />
          </button>
          <button className="down" onClick={() => setD(d === 1 ? daysInMonth(y, m) : d - 1)}>
            <FaChevronDown />
          </button>
        </div>
        <div className="tm-label-text">{d}日</div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  //  YEAR / WEEK のユーザー入力テキスト
  const [yearGoal, setYearGoal] = useState(localStorage.getItem('yearGoal') || '');
  const [weekGoal, setWeekGoal] = useState(localStorage.getItem('weekGoal') || '');
  const [editing, setEditing] = useState<'year' | 'week' | null>(null);
  const [value, setValue] = useState<Date | null>(new Date());
  const [currentCardDate, setCurrentCardDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);
  const addDays = (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };
  useEffect(() => {
    localStorage.setItem('yearGoal', yearGoal);
  }, [yearGoal]);
  useEffect(() => {
    localStorage.setItem('weekGoal', weekGoal);
  }, [weekGoal]);

  // 読み込み
  useEffect(() => {
    try {
      const raw = localStorage.getItem('todoapp:v1');
      if (raw) {
        const parsed = JSON.parse(raw) as Task[];
        setTasks(parsed);
      }
    } catch (e) {
      console.error('failed to load tasks:', e);
    } finally {
      setLoaded(true);
    }
  }, []);

  // 保存
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem('todoapp:v1', JSON.stringify(tasks));
    } catch (e) {
      console.error('failed to save tasks:', e);
    }
  }, [loaded, tasks]);

  // Completion Rate
  const getMonthlyProgress = (base: Date) => {
    const y = base.getFullYear();
    const m = base.getMonth();
    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0);

    let total = 0;
    let done = 0;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const ymd = fmt(d);
      const list = getTasksFor(ymd);
      if (!list.length) continue;
      total += list.length;
      for (const t of list) if (t.completedDates.includes(ymd)) done++;
    }
    return total === 0 ? 0 : done / total;
  };

  // タスク状態（localStorageに保存）
  const [detailOpen, setDetailOpen] = useState(false); // 日別編集画面
  const [editorOpen, setEditorOpen] = useState(false); // 項目モーダル
  const [editingId, setEditingId] = useState<string | null>(null);

  const getTasksFor = (ymd: string) => tasks.filter((t) => isOnDate(t, ymd));
  const getProgressFor = (ymd: string) => {
    const list = getTasksFor(ymd);
    if (!list.length) return 0;
    const done = list.filter((t) => t.completedDates.includes(ymd)).length;
    return done / list.length;
  };
  const toggleDone = (taskId: string, ymd: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const set = new Set(t.completedDates);
        if (set.has(ymd)) {
          set.delete(ymd);
        } else {
          set.add(ymd);
        }
        return { ...t, completedDates: Array.from(set) };
      }),
    );
  };

  // 新規作成
  const addTaskFor = (ymd: string) => {
    const id = crypto.randomUUID?.() ?? String(Date.now());
    setTasks((prev) => [
      ...prev,
      {
        id,
        title: '新しい項目',
        date: ymd,
        repeat: 'none',
        completedDates: [],
      },
    ]);
  };
  // 編集開始（既存）
  const openEditor = (id: string) => {
    setEditingId(id);
    setEditorOpen(true);
  };
  // 編集保存
  const saveEditor = (updated: Partial<Task>, opts?: { close?: boolean }) => {
    if (!editingId) return;
    setTasks((prev) => prev.map((t) => (t.id === editingId ? { ...t, ...updated } : t)));
    if (opts?.close) {
      setEditorOpen(false);
    }
  };
  // 削除
  const deleteTask = () => {
    if (!editingId) return;
    setTasks((prev) => prev.filter((t) => t.id !== editingId));
    setEditorOpen(false);
  };

  return (
    <div className="app-container">
      {/* ヘッダー */}
      <header className="app-header">
        <div className="header-left">
          <Ring progress={0.72} size={60} stroke={10} />
        </div>
      </header>
      <div className="top-panel">
        {/* YEAR/WEEK/Completion */}
        <div className="top-left">
          {/* YEAR  */}
          <div className="goal-block">
            <div className="goal-head">
              <div className="goal-label">YEAR </div>
              <button
                className="edit"
                onClick={() => setEditing(editing === 'year' ? null : 'year')}
                aria-label="Edit YEAR"
                title="Edit YEAR"
              >
                <RiPencilFill />
              </button>
            </div>
            {editing === 'year' ? (
              <input
                className="goal-input"
                autoFocus
                value={yearGoal}
                onChange={(e) => setYearGoal(e.target.value)}
                onBlur={() => setEditing(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setEditing(null);
                }}
              />
            ) : (
              <div className="goal-text" onClick={() => setEditing('year')}>
                {yearGoal}
              </div>
            )}
          </div>

          {/* WEEK  */}
          <div className="goal-block">
            <div className="goal-head">
              <div className="goal-label">WEEK </div>
              <button
                className="edit"
                onClick={() => setEditing(editing === 'week' ? null : 'week')}
                aria-label="Edit WEEK"
                title="Edit WEEK"
              >
                <RiPencilFill />
              </button>
            </div>
            {editing === 'week' ? (
              <input
                className="goal-input"
                autoFocus
                value={weekGoal}
                onChange={(e) => setWeekGoal(e.target.value)}
                onBlur={() => setEditing(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setEditing(null);
                }}
              />
            ) : (
              <div className="goal-text" onClick={() => setEditing('week')}>
                {weekGoal}
              </div>
            )}
          </div>
          {/* Completion Rate */}
          <div className="completion">
            <div className="comp-title">Completion Rate</div>
            <div className="comp-row">
              <div className="comp-month">
                {currentCardDate.toLocaleString('en-US', { month: 'long' })}
              </div>
              <div className="comp-ring">
                <Ring progress={getMonthlyProgress(new Date())} size={180} stroke={20} />
                <div className="comp-percent">
                  {Math.round(getMonthlyProgress(new Date()) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 当日のプレビュー */}
        <div className="top-right">
          <div className="card-header">
            <button
              className="arrow"
              onClick={() => setCurrentCardDate(addDays(currentCardDate, -1))}
            >
              <MdNavigateBefore />
            </button>
            <div className="card-title">
              {currentCardDate.toLocaleString('en-US', { month: 'long' })}, &nbsp;
              {currentCardDate.getDate()}
            </div>
            <button
              className="arrow"
              onClick={() => setCurrentCardDate(addDays(currentCardDate, +1))}
            >
              <MdNavigateNext />
            </button>
          </div>
          <ul className="card-list">
            {getTasksFor(fmt(currentCardDate)).map((t) => {
              const ymd = fmt(currentCardDate);
              const checked = t.completedDates.includes(ymd);
              return (
                <li key={t.id} className="card-item">
                  <label className="chk">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDone(t.id, ymd)}
                    />
                    <span className="cbx" aria-hidden>
                      <RiCheckboxBlankLine className="cbx-box" />
                      {checked && <RiCheckFill className="cbx-check" />}
                    </span>
                    <span className="title">{t.title}</span>
                  </label>
                </li>
              );
            })}
          </ul>

          <button
            className="card-edit"
            onClick={() => {
              setValue(currentCardDate);
              setDetailOpen(true);
            }}
          >
            <RiPencilFill />
          </button>
        </div>
      </div>
      {/* カレンダー */}
      <div>
        <Calendar
          locale="en"
          showFixedNumberOfWeeks={false} // 週の数を固定表示
          formatDay={() => ''}
          onChange={(date) => setValue(date as Date)} // カレンダーのクリック時に呼ばれる
          onClickDay={(d) => {
            setDetailOpen(true);
            setValue(d as Date);
          }}
          value={value ?? undefined} // 現在の選択日付を反映させる
          tileContent={({ date }) => (
            <div
              style={{
                height: '116px',
                textAlign: 'start',
                position: 'relative',
              }}
            >
              <span className="rc-day-num">{date.getDate()}</span>
              <div className="cell-ring">
                <Ring progress={getProgressFor(fmt(date))} />
              </div>
            </div>
          )}
        />
      </div>
      {/*編集画面*/}
      {detailOpen && (
        <div className="day-overlay" onClick={() => setDetailOpen(false)}>
          <div className="day-panel" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <button
                className="arrow"
                onClick={() => setValue(addDays(new Date(value ?? new Date()), -1))}
              >
                <MdNavigateBefore />
              </button>
              <h2 className="card-title">
                {new Date(value ?? new Date()).toLocaleString('en-US', {
                  month: 'long',
                })}
                , {new Date(value ?? new Date()).getDate()}
              </h2>
              <button
                className="arrow"
                onClick={() => setValue(addDays(new Date(value ?? new Date()), +1))}
              >
                <MdNavigateNext />
              </button>
            </div>

            <ul className="day-list">
              {getTasksFor(fmt(value ?? new Date())).map((t) => {
                const ymd = fmt(value ?? new Date());
                const checked = t.completedDates.includes(ymd);
                return (
                  <li key={t.id} className="day-item">
                    <label className="chk">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDone(t.id, ymd)}
                      />
                      <span className="cbx" aria-hidden>
                        <RiCheckboxBlankLine className="cbx-box" />
                        {checked && <RiCheckFill className="cbx-check" />}
                      </span>
                      <span className="title">{t.title}</span>
                    </label>
                    <button className="edit" onClick={() => openEditor(t.id)}>
                      <RiPencilFill />
                    </button>
                  </li>
                );
              })}
              {getTasksFor(fmt(value ?? new Date())).length === 0 && (
                <li className="day-empty">＋ 追加する を押してタスクを作成</li>
              )}
            </ul>

            <button className="add" onClick={() => addTaskFor(fmt(value ?? new Date()))}>
              ＋ 追加する
            </button>

            <div className="day-progress">
              <Ring progress={getProgressFor(fmt(value ?? new Date()))} size={90} stroke={10} />
              <div className="day-progress-num">
                {Math.round(getProgressFor(fmt(value ?? new Date())) * 100)}%
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 項目編集画面 */}
      {editorOpen && editingId && (
        <div className="task-modal-bg" onClick={() => setEditorOpen(false)}>
          <div className="task-modal" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const t = tasks.find((x) => x.id === editingId)!;
              const upd = (u: Partial<Task>) => saveEditor(u);
              const setRepeat = (r: Repeat) => upd({ repeat: r });

              return (
                <>
                  <input
                    className="tm-title"
                    value={t.title}
                    onChange={(e) => upd({ title: e.target.value })}
                    placeholder="タスク名"
                  />

                  <div className="tm-row">
                    <div className="tm-label">繰り返し</div>
                    <div className="tm-repeat">
                      {(['none', 'daily', 'weekly', 'monthly', 'yearly'] as Repeat[]).map((r) => (
                        <button
                          type="button"
                          key={r}
                          className={`tm-chip ${t.repeat === r ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setRepeat(r);
                          }}
                        >
                          {r === 'none'
                            ? 'なし'
                            : r === 'daily'
                              ? '毎日'
                              : r === 'weekly'
                                ? '毎週'
                                : r === 'monthly'
                                  ? '毎月'
                                  : '毎年'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {t.repeat === 'daily' && (
                    <div className="tm-row">
                      <div className="tm-num-wrap">
                        <div className="updown-buttons">
                          <button
                            type="button"
                            className="up"
                            onClick={() =>
                              upd({
                                repeatInterval: Math.max(1, (t.repeatInterval ?? 1) - 1),
                              })
                            }
                          >
                            <FaChevronUp />
                          </button>
                          <button
                            type="button"
                            className="down"
                            onClick={() =>
                              upd({
                                repeatInterval: Math.max(1, (t.repeatInterval ?? 1) + 1),
                              })
                            }
                          >
                            <FaChevronDown />
                          </button>
                        </div>

                        <div className="tm-num-text">
                          <span className="tm-num-display">{t.repeatInterval ?? 1}</span>
                          <span>日ごとに繰り返す</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {t.repeat === 'weekly' && (
                    <div className="tm-row">
                      <div className="tm-weekdays">
                        {['月', '火', '水', '木', '金', '土', '日'].map((lab, idx) => {
                          const has = t.repeatDays?.includes(idx);
                          return (
                            <button
                              type="button"
                              key={idx}
                              className={`tm-wd ${has ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                const cur = new Set(t.repeatDays ?? []);
                                if (has) {
                                  cur.delete(idx);
                                } else {
                                  cur.add(idx);
                                }
                                upd({ repeatDays: Array.from(cur).sort() });
                              }}
                            >
                              {lab}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {t.repeat !== 'none' && (
                    <div className="tm-row tm-end">
                      <label className="chk tm-end-check">
                        <input
                          type="checkbox"
                          checked={!!t.repeatEndDate}
                          onChange={(e) => {
                            upd({
                              repeatEndDate: e.target.checked ? fmt(new Date()) : undefined,
                            });
                          }}
                        />
                        <span className="cbx" aria-hidden>
                          <RiCheckboxBlankLine className="cbx-box" />
                          {!!t.repeatEndDate && <RiCheckFill className="cbx-check" />}
                        </span>
                        <span className="title">繰り返し終了日を設定する</span>
                      </label>
                      {!!t.repeatEndDate && (
                        <EndDateStepper
                          value={t.repeatEndDate}
                          onChange={(v) => upd({ repeatEndDate: v })}
                        />
                      )}
                    </div>
                  )}

                  <button className="tm-delete" onClick={deleteTask}>
                    <FaTrash />
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
