import { HabitService } from "./../../services/habit.service";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-daily-progress-bar",
  templateUrl: "./daily-progress-bar.component.html",
  styleUrls: ["./daily-progress-bar.component.scss"],
})
export class DailyProgressBarComponent implements OnInit {
  width = "0%";

  constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.habitService.habitsChanged$.subscribe(() => {
      const completedHabitsCount = this.habitService.completedHabits.length;
      const totalHabitsCount = this.habitService.habits.length;
      if (totalHabitsCount === 0) {
        this.width = "0%";
      } else {
        this.width =
          Math.round((completedHabitsCount / totalHabitsCount) * 100) + "%";
      }
    });
  }
}
