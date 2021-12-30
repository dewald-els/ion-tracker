import { HabitService } from "../../../common/services/habit.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-daily-progress-bar",
  templateUrl: "./daily-progress-bar.component.html",
  styleUrls: ["./daily-progress-bar.component.scss"],
})
export class DailyProgressBarComponent {
  constructor(private readonly habitService: HabitService) {}

  get width() {
    const completed = this.habitService.habits.filter(
      (habit) => habit.completed === true
    );
    if (this.habitService.habits.length > 0) {
      return (
        Math.round((completed.length / this.habitService.habits.length) * 100) +
        "%"
      );
    }
    return 0;
  }
}
