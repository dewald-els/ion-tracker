import { capSQLiteChanges } from "@capacitor-community/sqlite";
import { insertHabit, selectAllHabits, updateHabit } from "./../sql/schema";
import { Injectable } from "@angular/core";
import { Habit } from "../models/habit.model";
import { SQLiteService } from "./sqlite.service";

@Injectable({
  providedIn: "root",
})
export class HabitService {
  private _habits: Habit[] = [];

  constructor(private sqliteService: SQLiteService) {}

  async loadDatabase(): Promise<void> {
    try {
      const db = await this.sqliteService.createConnection();
      await this.sqliteService.openConnection(db);
      const habits = await this.sqliteService.select<Habit[]>(
        db,
        selectAllHabits()
      );
      this._habits.push(...habits);
      return Promise.resolve();
    } catch (error) {
      console.error(error.message);
    } finally {
      this.sqliteService.closeConnection();
    }
  }

  get habits(): Habit[] {
    return this._habits;
  }

  async addHabit(habit: Habit): Promise<void> {
    try {
      const db = await this.sqliteService.createConnection();
      await this.sqliteService.openConnection(db);

      const habitId: number = await this.sqliteService.insert(
        db,
        insertHabit(habit)
      );
      if (habitId === -1) {
        throw new Error("Could not insert habit");
      }
      this._habits.push({
        id: habitId,
        ...habit,
      });
      return Promise.resolve();
    } catch (error) {
      console.error(error.message);
      return Promise.reject(error);
    } finally {
      await this.sqliteService.closeConnection();
    }
  }

  async deleteHabit(habit: Habit) {
    try {
      const db = await this.sqliteService.createConnection();
      await this.sqliteService.openConnection(db);

      const result: boolean = await this.sqliteService.update(
        db,
        updateHabit({
          ...habit,
          deleted: 1,
        })
      );
      if (!result) {
        throw new Error("deleteHabit: Could not update habit");
      }
      return Promise.resolve();
    } catch (error) {
      console.error(error.message);
      return Promise.reject(error);
    } finally {
      await this.sqliteService.closeConnection();
    }
  }
}
