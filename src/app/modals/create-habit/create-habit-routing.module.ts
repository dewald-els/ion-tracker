import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CreateHabitModal } from "./create-habit.modal";

const routes: Routes = [
  {
    path: "",
    component: CreateHabitModal,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateHabitModalRoutingModule {}
