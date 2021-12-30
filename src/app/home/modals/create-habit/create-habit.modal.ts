import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.modal.html',
  styleUrls: ['./create-habit.modal.scss'],
})
export class CreateHabitModal implements OnInit {
  public showCustomDate = false;
  public showCustomTime = false;

  public error = '';
  public title = '';
  public remindMe = true;

  constructor(private readonly modalCtrl: ModalController) {}

  ngOnInit() {}

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  onCreateClick() {
    this.error = '';

    if (this.title.trim() === '') {
      this.error = 'Please add a title';
      return;
    }

    this.modalCtrl.dismiss({
      title: this.title,
      deleted: false,
    });
  }
}
