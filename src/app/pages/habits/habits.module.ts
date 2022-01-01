import { DailyProgressBarComponent } from "./../../components/daily-progress-bar/daily-progress-bar.component";
import { HabitListItemComponent } from "./../../components/habit-list-item/habit-list-item.component";
import { HabitListComponent } from "./../../components/habit-list/habit-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HabitsPageRoutingModule } from "./habits-routing.module";

import { HabitsPage } from "./habits.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HabitsPageRoutingModule],
  declarations: [
    HabitsPage,
    HabitListComponent,
    HabitListItemComponent,
    DailyProgressBarComponent,
  ],
})
export class HabitsPageModule {}
