import {
  sqlInsertHabitHistory,
  sqlSelectHabitHistoryToday,
} from "./../sql/schema";
import { environment } from "./../../environments/environment";
import { SQLiteService } from "./sqlite.service";
import { Injectable } from "@angular/core";
import {
  capSQLiteChanges,
  capSQLiteValues,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { HabitHistory } from "../models/habit.model";
const { dbName, version, encryption } = environment.sqlite;

@Injectable({
  providedIn: "root",
})
export class HabitHistoryService {
  constructor(private readonly sqlite: SQLiteService) {}

  async habitsCompletedToday(): Promise<HabitHistory[]> {
    try {
      let db: SQLiteDBConnection = await this.sqlite.createConnection(
        dbName,
        false,
        encryption,
        version
      );
      await db.open();
      const { sql } = sqlSelectHabitHistoryToday();
      const result: capSQLiteValues = await db.query(sql);
      await this.sqlite.closeConnection(dbName);
      return Promise.resolve(result.values as HabitHistory[]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addToHistory(habitId: number): Promise<void> {
    try {
      let db: SQLiteDBConnection = await this.sqlite.createConnection(
        dbName,
        false,
        encryption,
        version
      );

      await db.open();
      const { sql, values } = sqlInsertHabitHistory(habitId);
      const result: capSQLiteChanges = await db.run(sql, values);

      if (result.changes && result.changes.changes <= 0) {
        throw new Error("Could not insert habit history" + habitId);
      }
      await this.sqlite.closeConnection(dbName);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
