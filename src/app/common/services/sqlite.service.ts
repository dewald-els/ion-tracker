import { Injectable } from "@angular/core";
import {
  CapacitorSQLite,
  capSQLiteChanges,
  capSQLiteResult,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";
import { BehaviorSubject } from "rxjs";
import { Habit } from "../models/habit.model";
import { createSchemaSQL, insertHabit, SQLiteCommand } from "../sql/schema";

@Injectable({
  providedIn: "root",
})
export class SQLiteService {
  sqlite: SQLiteConnection = null;
  databaseName: string = "ion-habits";

  public initialized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  initializePlugin(): Promise<boolean> {
    return new Promise((resolve) => {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
      resolve(true);
    });
  }

  async openConnection(db: SQLiteDBConnection): Promise<void> {
    await db.open();
    return Promise.resolve();
  }

  async closeConnection(): Promise<void> {
    if (this.sqlite !== null) {
      await this.sqlite.closeConnection(this.databaseName);
      return Promise.resolve();
    } else {
      return Promise.reject(
        new Error(
          `SQLite Error: Could not close connection - No connection to ${this.databaseName}.`
        )
      );
    }
  }

  async createConnection(): Promise<SQLiteDBConnection> {
    try {
      const db: SQLiteDBConnection = await this.sqlite.createConnection(
        this.databaseName,
        false,
        "no-encryption",
        1
      );
      if (db !== null) {
        return Promise.resolve(db);
      }
      throw new Error(
        "SQLite Error: Could not connect to " + this.databaseName
      );
    } catch (error) {
      return Promise.reject(error.message);
    }
  }

  async isDatabase(): Promise<capSQLiteResult> {
    if (this.sqlite != null) {
      try {
        return Promise.resolve(await this.sqlite.isDatabase(this.databaseName));
      } catch (err) {
        return Promise.reject(new Error(err));
      }
    } else {
      return Promise.reject(new Error(`no connection open`));
    }
  }

  async createHabitSchema(db: SQLiteDBConnection) {
    const exResult: capSQLiteChanges = await db.execute(createSchemaSQL);
    if (exResult.changes.changes < 0) {
      throw new Error("SQLite Error: Could not create schema");
    }
  }

  async insert(
    db: SQLiteDBConnection,
    command: SQLiteCommand
  ): Promise<number> {
    try {
      const result: capSQLiteChanges = await db.run(
        command.cmd,
        command.values
      );

      if (result.changes.changes > 0) {
        return Promise.resolve(result.changes.lastId);
      }

      throw new Error(`SQLiteError: Could not insert record`);
    } catch (error) {
      return Promise.reject(error.message);
    }
  }

  async select<T>(db: SQLiteDBConnection, command: SQLiteCommand): Promise<T> {
    try {
      const result = await db.query(command.cmd);
      return Promise.resolve(result.values as unknown as T);
    } catch (error) {
      return Promise.reject(error.message);
    }
  }

  async update(
    db: SQLiteDBConnection,
    command: SQLiteCommand
  ): Promise<boolean> {
    try {
      const result: capSQLiteChanges = await db.run(
        command.cmd,
        command.values
      );

      if (result.changes.changes > 0) {
        return Promise.resolve(true);
      }

      throw new Error(`SQLiteError: Could not insert record`);
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
}
