import { insertHabitHistory, selectAllHabitHistory } from "./../sql/schema";
import { SQLiteService } from "./sqlite.service";
import { Habit, HabitHistory } from "./../models/habit.model";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class HabitHistoryService {
  private _habitHistory: HabitHistory[] = [];
  constructor(private readonly sqliteService: SQLiteService) {}

  async loadData() {
    try {
      const db = await this.sqliteService.createConnection();
      await this.sqliteService.openConnection(db);
      const history = await this.sqliteService.select<HabitHistory[]>(
        db,
        selectAllHabitHistory()
      );
    } catch (error) {
    } finally {
    }
  }

  async completeHabit(habit: Habit): Promise<void> {
    try {
      const db = await this.sqliteService.createConnection();
      await this.sqliteService.openConnection(db);
      const habitHistoryId = await this.sqliteService.insert(
        db,
        insertHabitHistory(habit)
      );
      if (habitHistoryId === -1) {
        throw new Error("Could not insert history");
      }
      const time = new Date().getTime();
      this._habitHistory.push({
        id: habitHistoryId,
        habit_id: habit.id,
        completed: 1,
        last_modified: time,
        created_at: time,
      });
    } catch (error) {
      console.error("completeHabit(): " + error.message);
    } finally {
      this.sqliteService.closeConnection();
    }
  }
}
