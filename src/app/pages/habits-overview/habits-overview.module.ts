import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitsOverviewPageRoutingModule } from './habits-overview-routing.module';

import { HabitsOverviewPage } from './habits-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitsOverviewPageRoutingModule
  ],
  declarations: [HabitsOverviewPage]
})
export class HabitsOverviewPageModule {}
