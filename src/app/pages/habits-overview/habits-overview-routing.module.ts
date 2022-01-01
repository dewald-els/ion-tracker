import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitsOverviewPage } from './habits-overview.page';

const routes: Routes = [
  {
    path: '',
    component: HabitsOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitsOverviewPageRoutingModule {}
