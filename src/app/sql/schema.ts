export const sqlCreateSchema = `
  CREATE TABLE IF NOT EXISTS habit (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    deleted INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (date('now')),
    updated_at TEXT DEFAULT (date('now'))
  );
  CREATE TABLE IF NOT EXISTS habit_history (
    id INTEGER PRIMARY KEY NOT NULL,
    habit_id INTEGER NOT NULL,
    created_at TEXT DEFAULT (date('now')),
    updated_at TEXT DEFAULT (date('now'))
  );
  CREATE INDEX IF NOT EXISTS habit_title ON habit (title);
  CREATE INDEX IF NOT EXISTS habit_deleted ON habit (deleted);
  CREATE INDEX IF NOT EXISTS habit_updated_at ON habit (updated_at);
  CREATE INDEX IF NOT EXISTS habit_history_habit_id ON habit_history (habit_id);
  CREATE INDEX IF NOT EXISTS habit_history_updated_at ON habit_history (updated_at);
`;

export interface SQLiteCommand {
  sql: string;
  values: any[];
}

export const sqlInsertHabit = (habitTitle: string): SQLiteCommand => ({
  sql: "INSERT INTO habit (title) VALUES (?);",
  values: [habitTitle],
});

export const sqlInsertHabitHistory = (habitId: number): SQLiteCommand => ({
  sql: "INSERT INTO habit_history (habit_id) VALUES (?);",
  values: [habitId],
});

export const sqlDeleteHabit = (habitId: number): SQLiteCommand => ({
  sql: "UPDATE habit SET deleted = 1 WHERE id = ?;",
  values: [habitId],
});

export const sqlSelectAllHabits = (): SQLiteCommand => ({
  sql: "SELECT * FROM habit WHERE deleted = 0;",
  values: [],
});

export const sqlSelectHabitHistoryToday = (): SQLiteCommand => ({
  sql: "SELECT * FROM habit_history WHERE date(created_at) = date('now');",
  values: [],
});
