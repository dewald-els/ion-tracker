import { Component, OnInit } from '@angular/core';
import { MOCK_HABITS } from '../../mocks/habits.mocks';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.scss'],
})
export class HabitListComponent implements OnInit {

  private _habits = [];

  constructor() { }

  get habits() {
    return this._habits;
  }

  ngOnInit() {
    setTimeout(() => {
      this._habits = MOCK_HABITS;
    }, 400);
  }

}
