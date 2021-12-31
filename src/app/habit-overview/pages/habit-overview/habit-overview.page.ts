import { SQLiteService } from "./../../../common/services/sqlite.service";
import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { HabitHistoryService } from "src/app/common/services/habit-history.service";

@Component({
  selector: "app-habit-overview",
  templateUrl: "./habit-overview.page.html",
  styleUrls: ["./habit-overview.page.scss"],
})
export class HabitOverviewPage implements OnInit {
  private isDbReady$: Subscription;

  constructor(
    private readonly sqlService: SQLiteService,
    private readonly habitHistoryService: HabitHistoryService
  ) {
    this.isDbReady$ = this.sqlService.initialized$.subscribe(
      async (isReady: boolean) => {
        if (isReady === true) {
          await this.habitHistoryService.loadData();
        }
      }
    );
  }

  ngOnInit() {}
}
