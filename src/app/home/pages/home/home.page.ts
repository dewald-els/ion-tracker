import { SQLiteService } from "./../../../common/services/sqlite.service";
import { HabitService } from "../../../common/services/habit.service";
import { CreateHabitModal } from "./../../modals/create-habit/create-habit.modal";
import { ModalController } from "@ionic/angular";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
  isDbReady$: Subscription;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly habitService: HabitService,
    private readonly sqlService: SQLiteService
  ) {}

  ngOnInit(): void {
    this.isDbReady$ = this.sqlService.initialized$.subscribe(
      async (isReady: boolean) => {
        if (isReady === true) {
          await this.habitService.loadDatabase();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.isDbReady$.unsubscribe();
  }

  async onCreateClick() {
    const modal = await this.modalCtrl.create({
      component: CreateHabitModal,
      swipeToClose: true,
    });
    await modal.present();
  }
}
