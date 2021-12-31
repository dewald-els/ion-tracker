import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CreateHabitModal } from "../home/modals/create-habit/create-habit.modal";
import { HabitService } from "../common/services/habit.service";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.page.html",
  styleUrls: ["./tabs.page.scss"],
})
export class TabsPage implements OnInit {
  constructor(
    private readonly modalCtrl: ModalController,
    private habitService: HabitService
  ) {}

  ngOnInit() {}

  async onCreateClick(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CreateHabitModal,
      swipeToClose: true,
    });
    return await modal.present();
  }
}
