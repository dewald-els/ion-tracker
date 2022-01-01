import { sqlDeleteHabit, sqlSelectAllHabits } from "./../sql/schema";
import { environment } from "./../../environments/environment";
import { SQLiteService } from "./sqlite.service";
import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { Habit } from "../models/habit.model";
import {
  capSQLiteChanges,
  capSQLiteValues,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { sqlInsertHabit } from "../sql/schema";

const { dbName, version, encryption } = environment.sqlite;

@Injectable({
  providedIn: "root",
})
export class HabitService {
  public habitsChanged$: BehaviorSubject<void> = new BehaviorSubject(null);
  private _habits: Habit[] = [];

  constructor(private readonly sqlite: SQLiteService) {}

  async init(): Promise<void> {
    try {
      let db: SQLiteDBConnection = await this.sqlite.createConnection(
        dbName,
        false,
        encryption,
        version
      );

      await db.open();
      const { sql } = sqlSelectAllHabits();
      const results: capSQLiteValues = await db.query(sql);
      const habits = results.values.map((habit: Habit) => ({
        ...habit,
        completed: 0,
      }));

      this._habits.push(...habits);

      await this.sqlite.closeConnection(dbName);

      this.habitsChanged$.next();

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  get habits(): Habit[] {
    return this._habits;
  }

  get completedHabits() {
    return this._habits.filter((habit: Habit) => habit.completed === 1);
  }

  get incompletedHabits() {
    return this._habits.filter((habit: Habit) => habit.completed === 0);
  }

  public completeHabit(habitId: number) {
    for (const habit of this._habits) {
      if (habit.id === habitId) {
        habit.completed = 1;
        break;
      }
    }
    this.habitsChanged$.next();
  }

  async addHabit(habitTitle: string) {
    try {
      let db: SQLiteDBConnection = await this.sqlite.createConnection(
        dbName,
        false,
        encryption,
        version
      );

      await db.open();
      const { sql, values } = sqlInsertHabit(habitTitle);
      const result: capSQLiteChanges = await db.run(sql, values);

      if (result.changes && result.changes.changes <= 0) {
        throw new Error("Could not insert habit " + habitTitle);
      }

      const newHabitId = result.changes.lastId;

      this._habits.push({
        id: newHabitId,
        title: habitTitle,
        deleted: 0,
        completed: 0,
        created_at: Date.now().toString(),
        updated_at: Date.now().toString(),
      });

      await this.sqlite.closeConnection(dbName);

      this.habitsChanged$.next();

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteHabit(habitId: number): Promise<void> {
    try {
      let db: SQLiteDBConnection = await this.sqlite.createConnection(
        dbName,
        false,
        encryption,
        version
      );

      await db.open();
      const { sql, values } = sqlDeleteHabit(habitId);
      const result: capSQLiteChanges = await db.run(sql, values);

      if (result.changes && result.changes.changes <= 0) {
        throw new Error("deleteHabit: Could not delete habit " + habitId);
      }

      await this.sqlite.closeConnection(dbName);
      this._habits = this._habits.filter((habit: Habit) => {
        return habit.id !== habitId;
      });
      this.habitsChanged$.next();

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
