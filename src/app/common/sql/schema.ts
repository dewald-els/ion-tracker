import { Habit } from "../models/habit.model";

export const createSchemaSQL: string = `
CREATE TABLE IF NOT EXISTS habit (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  deleted INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (date('now')),
  last_modified TEXT DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS habit_history (
  id INTEGER PRIMARY KEY NOT NULL,
  habit_id INTEGER NOT NULL,
  completed INTEGER NOT NULL DEFAULT (0),
  created_at TEXT DEFAULT (date('now')),
  last_modified TEXT DEFAULT (date('now'))
);

CREATE INDEX IF NOT EXISTS habit_title ON habit (title);
CREATE INDEX IF NOT EXISTS habit_deleted ON habit (deleted);
CREATE INDEX IF NOT EXISTS habit_last_modified ON habit (last_modified);
CREATE INDEX IF NOT EXISTS habit_history_habit_id ON habit_history (habit_id);
CREATE INDEX IF NOT EXISTS habit_history_last_modified ON habit_history (last_modified);
`;

export interface SQLiteCommand {
  cmd: string;
  values: any[];
}

export function selectAllHabits(): SQLiteCommand {
  return {
    cmd: `SELECT * FROM habit WHERE deleted = 0;`,
    values: [],
  };
}

export function selectAllHabitHistory(): SQLiteCommand {
  return {
    cmd: `SELECT * FROM habit_history;`,
    values: [],
  };
}

export function insertHabit(habit: Habit): SQLiteCommand {
  return {
    cmd: `INSERT INTO habit (title) VALUES (?);`,
    values: [habit.title],
  };
}

export function updateHabit(habit: Habit): SQLiteCommand {
  return {
    cmd: `UPDATE habit SET title=?, last_modified=?, deleted=?, WHERE id=?;`,
    values: [habit.title, new Date().getTime(), habit.deleted, habit.id],
  };
}

export function deleteHabit(habitId: number): SQLiteCommand {
  return {
    cmd: `UPDATE habit SET last_modified=?, deleted=1, WHERE id=?;`,
    values: [new Date().getTime(), habitId],
  };
}

export function insertHabitHistory(habit: Habit): SQLiteCommand {
  return {
    cmd: `INSERT INTO habit_history (habit_id, completed) VALUES (?, ?);`,
    values: [habit.id, habit.completed],
  };
}

export function selectHistoryByDate(date) {
  return {
    cmd: `SELECT * FROM habit_history WHERE created_at = ?`,
    values: [date],
  };
}
