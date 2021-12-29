import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './pages/home/home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HabitListComponent } from './components/habit-list/habit-list.component';
import { HabitListItemComponent } from './components/habit-list-item/habit-list-item.component';
import { CreateHabitModal } from './modals/create-habit/create-habit.modal';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    HabitListComponent,
    HabitListItemComponent,
    CreateHabitModal
  ]
})
export class HomeModule {}
