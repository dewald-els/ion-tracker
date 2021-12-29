import { HabitService } from './../../services/habit.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.scss'],
})
export class HabitListComponent {

  constructor(private readonly habitService: HabitService) { }

  get habits() {
    return this.habitService.habits;
  }
}
