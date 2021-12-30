import { selectAllHabits } from "./../sql/schema";
import { Injectable } from "@angular/core";
import { Habit } from "../models/habit.model";
import { SQLiteService } from "./sqlite.service";

@Injectable({
  providedIn: "root",
})
export class HabitService {
  private _habits: Habit[] = [];

  constructor(private sqliteService: SQLiteService) {
    this.init();
  }

  async init(): Promise<void> {
    const habits = await this.sqliteService.select(selectAllHabits());
    this._habits = [...habits];
    return Promise.resolve();
  }

  async getHabits(): Promise<Habit[]> {
    if (this._habits.length === 0) {
      await this.init();
    }

    return this._habits;
  }

  async addHabit(habit: Habit) {
    try {
      const result: boolean = await this.sqliteService.createHabit(habit);
      this._habits.push(habit);
    } catch (error) {
      console.error(error.message);
    }
  }
}
