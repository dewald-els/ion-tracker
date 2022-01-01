import { Habit } from "./../../models/habit.model";
import { HabitService } from "./../../services/habit.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-habit-list",
  templateUrl: "./habit-list.component.html",
  styleUrls: ["./habit-list.component.scss"],
})
export class HabitListComponent implements OnInit {
  constructor(private habitService: HabitService) {}

  get completedHabits(): Habit[] {
    return this.habitService.completedHabits;
  }

  get incompletedHabits(): Habit[] {
    return this.habitService.incompletedHabits;
  }

  ngOnInit() {}
}
