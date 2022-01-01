import { sqlCreateSchema } from "./sql/schema";
import { environment } from "./../environments/environment";
import { Capacitor } from "@capacitor/core";
import { SQLiteService } from "./services/sqlite.service";
import { Component, OnInit } from "@angular/core";
import { SplashScreen } from "@capacitor/splash-screen";

const { dbName, version, encryption } = environment.sqlite;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private readonly sqlite: SQLiteService) {}

  async ngOnInit(): Promise<void> {
    try {
      const initialized = await this.sqlite.initializePlugin();
      const db = await this.sqlite.createConnection(
        dbName,
        false,
        encryption,
        version
      );
      await db.open();
      await db.execute(sqlCreateSchema);
      const sync = await db.createSyncTable();
      if (sync.changes.changes < 0) {
        return Promise.reject(new Error("Execute createSyncTable failed"));
      }
      await db.setSyncDate(new Date().toISOString());
      await this.sqlite.closeConnection(dbName);

      this.sqlite.sqliteInitialized$.next(true);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      await SplashScreen.hide();
    }
  }
}
