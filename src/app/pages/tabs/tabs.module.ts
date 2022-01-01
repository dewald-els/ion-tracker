import { CreateHabitModalModule } from "./../../modals/create-habit/create-habit.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TabsPageRoutingModule } from "./tabs-routing.module";

import { TabsPage } from "./tabs.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    CreateHabitModalModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
