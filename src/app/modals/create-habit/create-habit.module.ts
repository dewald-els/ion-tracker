import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CreateHabitModalRoutingModule } from "./create-habit-routing.module";

import { CreateHabitModal } from "./create-habit.modal";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateHabitModalRoutingModule,
  ],
  declarations: [CreateHabitModal],
})
export class CreateHabitModalModule {}
