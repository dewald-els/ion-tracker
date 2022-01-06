import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  Habit,
  HabitHistory,
  HabitHistoryGroupDate,
} from "src/app/models/habit.model";
import { HabitHistoryService } from "src/app/services/habit-history.service";
import { HabitService } from "src/app/services/habit.service";
import Chart from "chart.js/auto";

@Component({
  selector: "app-habits-overview",
  templateUrl: "./habits-overview.page.html",
  styleUrls: ["./habits-overview.page.scss"],
})
export class HabitsOverviewPage implements AfterViewInit {
  habitHistory: HabitHistory[] = [];
  habitHistoryGroupedByDate: HabitHistoryGroupDate[] = [];
  @ViewChild("dailyChartCanvas", { read: ElementRef }) dailyChart;
  chart;

  constructor(
    private readonly habitService: HabitService,
    private readonly habitHistoryService: HabitHistoryService
  ) {}

  get completedHabitCount() {
    return this.habitService.completedHabits.length;
  }

  async ngAfterViewInit() {
    this.habitService.habitsChanged$.subscribe({
      next: () => {
        this.createDailyChart();
      },
    });
  }

  async createDailyChart() {
    try {
      this.habitHistory = await this.habitHistoryService.allHabitHistory();
      this.habitHistoryGroupedByDate =
        await this.habitHistoryService.allHabitHistoryGroupByDate();

      const context = this.dailyChart.nativeElement.getContext("2d");

      const habits: number[] = this.habitHistoryGroupedByDate.map(
        (history) => history.habits_completed
      );

      const labels = this.habitHistoryGroupedByDate.map(
        (history) => history.created_at
      );

      const activeChart = Chart.getChart(this.chart);
      if (activeChart) {
        activeChart.destroy();
      }

      this.chart = new Chart(context, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Completed",
              data: habits,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: false,
              text: "Daily completions",
            },
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
