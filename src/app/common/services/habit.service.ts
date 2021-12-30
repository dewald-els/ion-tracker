import { Injectable } from '@angular/core';
import { Habit } from '../models/habit.model';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private _habits: Habit[] = [];

  constructor(private sqliteService: SQLiteService) {

  }

  get habits(): Habit[] {
    return this._habits;
  }

  async addHabit(habit: Habit) {
    try {
      const result: boolean = await this.sqliteService.createHabit(habit);
      this._habits.push(habit);
    }
    catch(error) {
      console.error(error.message);
    }
  }

}
