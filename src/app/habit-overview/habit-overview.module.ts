import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitOverviewRoutingModule } from './habit-overview-routing.module';

import { HabitOverviewPage } from './pages/habit-overview/habit-overview.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HabitOverviewRoutingModule],
  declarations: [HabitOverviewPage],
})
export class HabitOverviewModule {}
