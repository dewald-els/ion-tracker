import { HabitService } from "../../../common/services/habit.service";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { HabitHistoryService } from "src/app/common/services/habit-history.service";
import {
  AlertButton,
  AlertController,
  IonItem,
  IonItemSliding,
} from "@ionic/angular";

@Component({
  selector: "app-habit-list-item",
  templateUrl: "./habit-list-item.component.html",
  styleUrls: ["./habit-list-item.component.scss"],
})
export class HabitListItemComponent implements OnInit {
  @Input() habit;
  @ViewChild("item") item: IonItemSliding;

  constructor(
    private readonly habitService: HabitService,
    private habitHistoryService: HabitHistoryService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async onCheckChange() {
    await this.habitHistoryService.completeHabit(this.habit);
  }

  async onDeleteHabitClick() {
    const handleDelete = () => {
      this.item.close();
    };

    const handleCancel = () => {
      this.item.close();
    };

    const deleteBtn: AlertButton = {
      text: "Delete",
      role: "destructive",
      handler: handleDelete,
    };

    const cancelBtn: AlertButton = {
      text: "Cancel",
      handler: handleCancel,
    };

    const alert = await this.alertCtrl.create({
      header: "Delete Habit",
      message: "Are you sure?",
      buttons: [cancelBtn, deleteBtn],
    });

    await alert.present();
  }
}
