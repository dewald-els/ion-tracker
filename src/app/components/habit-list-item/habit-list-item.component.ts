import { HabitService } from "./../../services/habit.service";
import { Habit } from "./../../models/habit.model";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-habit-list-item",
  templateUrl: "./habit-list-item.component.html",
  styleUrls: ["./habit-list-item.component.scss"],
})
export class HabitListItemComponent implements OnInit {
  @Input() habit: Habit;

  constructor(private readonly habitService: HabitService) {}

  ngOnInit() {}

  onHabitChecked() {
    this.habitService.completeHabit(this.habit.id);
  }
}
