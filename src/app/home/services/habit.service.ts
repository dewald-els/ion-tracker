import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private _habits = [];

  get habits() {
    return this._habits;
  }

  addHabit(habit) {
    if (Array.isArray(habit)) {
      this._habits.push(...habit)
    } else {
      this._habits.push(habit);
    }
  }

}
