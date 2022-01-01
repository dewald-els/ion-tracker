import { CreateHabitModal } from "../../modals/create-habit/create-habit.modal";
import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.page.html",
  styleUrls: ["./tabs.page.scss"],
})
export class TabsPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async onCreateHabitClick(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CreateHabitModal,
      swipeToClose: true,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
  }
}
