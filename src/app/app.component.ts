import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SQLiteService } from "./common/services/sqlite.service";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private sqliteService: SQLiteService,
    private platform: Platform
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.platform.ready();
      await SplashScreen.show();
      await this.sqliteService.initializePlugin();
      await this.sqliteService.createConnection();
      this.sqliteService.createHabitSchema();
      this.sqliteService.initialized$.next(true);
    } catch (error) {
      console.error("App.init" + error.message);
    } finally {
      await SplashScreen.hide();
    }
  }
}
