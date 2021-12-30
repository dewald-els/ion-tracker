import { Habit } from "./../../../common/models/habit.model";
import { HabitService } from "../../../common/services/habit.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-daily-progress-bar",
  templateUrl: "./daily-progress-bar.component.html",
  styleUrls: ["./daily-progress-bar.component.scss"],
})
export class DailyProgressBarComponent {
  habits: Habit[] = [];

  constructor(private readonly habitService: HabitService) {}

  async ngOnInit(): Promise<void> {
    this.habits = await this.habitService.getHabits();
  }

  get width() {
    const completed = this.habits.filter((habit) => habit.completed === true);
    if (this.habits.length > 0) {
      return Math.round((completed.length / this.habits.length) * 100) + "%";
    }
    return 0;
  }
}
