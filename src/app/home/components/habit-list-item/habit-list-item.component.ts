import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-habit-list-item',
  templateUrl: './habit-list-item.component.html',
  styleUrls: ['./habit-list-item.component.scss'],
})
export class HabitListItemComponent implements OnInit {

  @Input() habit;

  constructor() { }

  ngOnInit() { }


}
