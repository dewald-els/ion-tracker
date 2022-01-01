import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-habit",
  templateUrl: "./create-habit.modal.html",
  styleUrls: ["./create-habit.modal.scss"],
})
export class CreateHabitModal implements OnInit {
  habitTitle = "";
  constructor(private readonly modalCtrl: ModalController) {}

  ngOnInit() {}

  async onTrackTitleClick(): Promise<void> {
    this.modalCtrl.dismiss();
  }
}
