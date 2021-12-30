import { Habit } from "./../../../common/models/habit.model";
import { HabitService } from "../../../common/services/habit.service";
import { Component, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "app-habit-list",
  templateUrl: "./habit-list.component.html",
  styleUrls: ["./habit-list.component.scss"],
})
export class HabitListComponent {
  @Output() create: EventEmitter<void> = new EventEmitter();

  constructor(private readonly habitService: HabitService) {}

  get habits(): Habit[] {
    return this.habitService.habits;
  }

  onCreateClick() {
    this.create.emit();
  }
}
