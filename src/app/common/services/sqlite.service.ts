import { Injectable } from "@angular/core";
import { CapacitorSQLite, capSQLiteChanges, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";
import { BehaviorSubject } from "rxjs";
import { Habit } from "../models/habit.model";
import { createSchemaSQL, insertHabit } from "../sql/schema";

@Injectable({
  providedIn: "root"
})
export class SQLiteService {

  sqlite: SQLiteConnection = null;
  databaseName: string = 'ion-habits'
  dbInstance: SQLiteDBConnection;

  public initialized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  initializePlugin(): Promise<boolean> {
    return new Promise(resolve => {
      this.sqlite = new SQLiteConnection(CapacitorSQLite)
      resolve(true)
    })
  }

  async closeConnection(): Promise<void> {
    if (this.sqlite !== null) {
      await this.sqlite.closeConnection(this.databaseName);
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(`SQLite Error: Could not close connection - No connection to ${this.databaseName}.`))
    }
  }

  async createConnection(): Promise<SQLiteDBConnection> {
    try {
      const db: SQLiteDBConnection = await this.sqlite.createConnection(
        this.databaseName, false, "no-encryption", 1
      );
      if (db !== null) {
        this.dbInstance = db;
        return Promise.resolve(db);
      }
      throw new Error('SQLite Error: Could not connect to ' + this.databaseName);
    }
    catch(error) {
      return Promise.reject(error.message);
    }
  }

  private async createHabitSchema(db: SQLiteDBConnection) {
    const exResult: capSQLiteChanges = await db.execute(createSchemaSQL);
    if (exResult.changes.changes < 0) {
      throw new Error('SQLite Error: Could not create schema');
    }
  }

  async createHabit(habit: Habit): Promise<boolean> {
    try {
      if (!this.dbInstance) {
        await this.createConnection();
      }
      const { cmd, values } = insertHabit(habit);
      const result: capSQLiteChanges = await this.dbInstance.run(cmd, values);

      if (result.changes.changes > 0) {
        return Promise.resolve(true);
      }

      throw new Error(`SQLiteError: Could not insert record: ${habit.title}`);
    }
    catch(error) {
      return Promise.reject(error.message);
    }
  }

}
