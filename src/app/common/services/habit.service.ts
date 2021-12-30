import { insertHabit, selectAllHabits } from "./../sql/schema";
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
      const habits = await this.sqliteService.select(db, selectAllHabits());
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

  async addHabit(habit: Habit) {
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
    } catch (error) {
      console.error(error.message);
    } finally {
      await this.sqliteService.closeConnection();
    }
  }
}
