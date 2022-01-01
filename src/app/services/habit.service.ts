import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { Habit } from "../models/habit.model";

@Injectable({
  providedIn: "root",
})
export class HabitService {
  public habitsChanged$: BehaviorSubject<void> = new BehaviorSubject(null);
  private readonly _habits: Habit[] = [];

  constructor() {}

  get habits(): Habit[] {
    return this._habits;
  }

  get completedHabits() {
    return this._habits.filter((habit: Habit) => habit.completed === 1);
  }

  get incompletedHabits() {
    return this._habits.filter((habit: Habit) => habit.completed === 0);
  }

  completeHabit(habitId: string) {
    for (const habit of this._habits) {
      if (habit.id === habitId) {
        habit.completed = 1;
        break;
      }
    }
    this.habitsChanged$.next();
  }

  addHabit(habitTitle: string) {
    this._habits.push({
      id: Math.random().toString(16).slice(2),
      title: habitTitle,
      deleted: 0,
      completed: 0,
      created_at: Date.now().toString(),
      updated_at: Date.now().toString(),
    });
    this.habitsChanged$.next();
  }
}
