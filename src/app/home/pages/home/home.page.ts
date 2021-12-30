import { HabitService } from '../../../common/services/habit.service';
import { CreateHabitModal } from './../../modals/create-habit/create-habit.modal';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private readonly modalCtrl: ModalController,
    private readonly habitService: HabitService
  ) {}

  async onCreateClick() {
    const modal = await this.modalCtrl.create({
      component: CreateHabitModal,
      swipeToClose: true,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data) {
      return;
    }

    this.habitService.addHabit({
      id: Math.random().toString(16).slice(2),
      count: 0,
      deleted: false,
      ...data,
    });
  }
}
