import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.modal.html',
  styleUrls: ['./create-habit.modal.scss']
})
export class CreateHabitModal implements OnInit {

  public showCustomDate = false;
  public showCustomTime = false;

  public error = '';

  public defaultTimes = [
    {
      checked: false,
      text: 'Morning at 08:00'
    },
    {
      checked: false,
      text: 'Afternoon at 12:00'
    },
    {
      checked: false,
      text: 'Evening at 20:00'
    },
  ];

  public title = '';
  public remindAt = '';
  public time = '';

  constructor(private readonly modalCtrl: ModalController) { }

  ngOnInit() {}

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  onCustomDateClick() {
    this.showCustomDate = !this.showCustomDate;
  }

  onCustomTimeClick() {
    this.showCustomTime = !this.showCustomTime;
  }

  onCreateClick() {

    this.error = '';

    if (this.title.trim() === '') {
      this.error = 'Please add a title';
      return;
    }
    if (this.remindAt === '') {
      this.error = 'Please add a date';
      return;
    }
    if (this.time === '') {
      this.error = 'Please choose a time';
      return;
    }

    this.modalCtrl.dismiss({
      title: this.title,
      remindAt: this.remindAt + ' ' + this.time
    });
  }

}
