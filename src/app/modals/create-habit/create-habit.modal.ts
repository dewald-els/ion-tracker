import { HabitService } from "./../../services/habit.service";
import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-habit",
  templateUrl: "./create-habit.modal.html",
  styleUrls: ["./create-habit.modal.scss"],
})
export class CreateHabitModal implements OnInit {
  habitTitle = "";
  constructor(
    private readonly modalCtrl: ModalController,
    private readonly habitService: HabitService
  ) {}

  ngOnInit() {}

  onCancelClick() {
    this.modalCtrl.dismiss();
  }

  async onTrackTitleClick(): Promise<void> {
    if (this.habitTitle.trim() === "") {
      throw new Error("No title provided");
    }
    this.habitService.addHabit(this.habitTitle);
    this.modalCtrl.dismiss();
  }
}
