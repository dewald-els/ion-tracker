import { Habit } from "../models/habit.model";

export const createSchemaSQL: string = `
  #--------- TABLES -------------------------------------------
  #------ Habit Table
  CREATE TABLE IF NOT EXISTS habit (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    deleted INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    last_modified INTEGER DEFAULT (strftime('%s', 'now'))
  );
  #------ Habit History Table
  CREATE TABLE IF NOT EXISTS habit_history (
    id INTEGER PRIMARY KEY NOT NULL,
    habit_id INTEGER NOT NULL,
    FOREIGN KEY(habit_id) REFERENCES habit(id),
    completed INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    last_modified INTEGER DEFAULT (strftime('%s', 'now'))
  );
  #--------- INDEXES -------------------------------------------
  CREATE INDEX IF NOT EXISTS habits_index_title ON habit (title);
  #--------- TRIGGERS -------------------------------------------
  #------ Habit Triggers
  CREATE TRIGGER IF NOT EXISTS habit_trigger_last_modified
  AFTER UPDATE ON habit
  FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified
  BEGIN
    UPDATE habit SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;
  END;
  #------- Habit History Triggers
  CREATE TRIGGER IF NOT EXISTS habit_history_trigger_last_modified
  AFTER UPDATE ON habit_history
  FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified
  BEGIN
    UPDATE habit_history SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;
  END;
`;

export const insertHabit = (habit: Habit) => {
  return {
    cmd: `INSERT INTO habit (title) VALUES (?)`,
    values: [habit.title]
  }
}
