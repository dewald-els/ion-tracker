import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateHabitModal } from '../home/modals/create-habit/create-habit.modal';
import { HabitService } from '../common/services/habit.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private readonly modalCtrl: ModalController, private habitService: HabitService) { }

  ngOnInit() {
  }

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
