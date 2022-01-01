import { HabitHistoryService } from "./../../services/habit-history.service";
import { HabitService } from "./../../services/habit.service";
import { Habit } from "./../../models/habit.model";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AlertButton, AlertController, IonItemSliding } from "@ionic/angular";

@Component({
  selector: "app-habit-list-item",
  templateUrl: "./habit-list-item.component.html",
  styleUrls: ["./habit-list-item.component.scss"],
})
export class HabitListItemComponent implements OnInit {
  @Input() habit: Habit;
  @ViewChild("item") slideItem: IonItemSliding;

  constructor(
    private readonly habitService: HabitService,
    private readonly habitHistoryService: HabitHistoryService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async onHabitChecked() {
    if (this.habit.completed === 1) {
      return;
    }
    try {
      await this.habitHistoryService.addToHistory(this.habit.id);
      this.habitService.completeHabit(this.habit.id);
    } catch (error) {
      console.error("Error completing habit: " + error.message);
    }
  }

  async onHabitDeleteClick(): Promise<void> {
    const deleteBtn: AlertButton = {
      text: "Delete",
      role: "destructive",
      handler: async () => {
        await this.habitService.deleteHabit(this.habit.id);
      },
    };
    const cancelBtn: AlertButton = {
      text: "Cancel",
      handler: () => {
        this.slideItem.close();
      },
    };
    const alert = await this.alertCtrl.create({
      header: "Delete habit",
      message: `Are you sure you want to delete ${this.habit.title}?`,
      buttons: [cancelBtn, deleteBtn],
    });

    await alert.present();
  }
}
