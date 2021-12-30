import { Habit } from "./../../../common/models/habit.model";
import { HabitService } from "../../../common/services/habit.service";
import { Component, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "app-habit-list",
  templateUrl: "./habit-list.component.html",
  styleUrls: ["./habit-list.component.scss"],
})
export class HabitListComponent implements OnInit {
  @Output() create: EventEmitter<void> = new EventEmitter();

  habits: Habit[] = [];

  constructor(private readonly habitService: HabitService) {}

  async ngOnInit() {
    try {
      const _habits = await this.habitService.getHabits();
      this.habits = _habits;
    } catch (error) {
      console.log(error);
    }
  }

  onCreateClick() {
    this.create.emit();
  }
}
