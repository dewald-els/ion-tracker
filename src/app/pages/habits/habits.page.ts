import { SQLiteService } from "./../../services/sqlite.service";
import { HabitHistoryService } from "./../../services/habit-history.service";
import { HabitService } from "./../../services/habit.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-habits",
  templateUrl: "./habits.page.html",
  styleUrls: ["./habits.page.scss"],
})
export class HabitsPage {
  dbReady$: Subscription;

  constructor(
    private readonly sqlite: SQLiteService,
    private readonly habitService: HabitService,
    private readonly habitHistoryService: HabitHistoryService
  ) {
    this.dbReady$ = this.sqlite.sqliteInitialized$.subscribe({
      next: async (ready) => {
        if (ready !== true) {
          return;
        }

        await this.habitService.init();

        const habitHistory =
          await this.habitHistoryService.habitsCompletedToday();
        for (const history of habitHistory) {
          this.habitService.completeHabit(history.habit_id);
        }
      },
    });
  }
}
