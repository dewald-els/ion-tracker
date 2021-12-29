import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.modal.html',
  styleUrls: ['./create-habit.modal.scss'],
})
export class CreateHabitModal implements OnInit {

  @Output() dismiss: EventEmitter<any> = new EventEmitter();

  constructor(private readonly modalCtrl: ModalController) { }

  ngOnInit() {}

  onDismiss() {
    this.dismiss.emit(null);
    this.modalCtrl.dismiss();
  }

}
