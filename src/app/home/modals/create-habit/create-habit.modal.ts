import { HabitService } from "./../../../common/services/habit.service";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Habit } from "src/app/common/models/habit.model";

@Component({
  selector: "app-create-habit",
  templateUrl: "./create-habit.modal.html",
  styleUrls: ["./create-habit.modal.scss"],
})
export class CreateHabitModal implements OnInit {
  public showCustomDate = false;
  public showCustomTime = false;

  public error = "";
  public title = "";

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly habitService: HabitService
  ) {}

  ngOnInit() {}

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  async onCreateClick() {
    this.error = "";

    if (this.title.trim() === "") {
      this.error = "Please add a title";
      return;
    }

    try {
      await this.habitService.addHabit({
        title: this.title,
        completed: false,
        deleted: 0,
      });

      this.modalCtrl.dismiss({
        title: this.title,
        deleted: false,
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}
