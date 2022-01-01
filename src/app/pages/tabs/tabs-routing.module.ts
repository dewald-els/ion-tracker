import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "habits",
        loadChildren: () =>
          import("../habits/habits.module").then((m) => m.HabitsPageModule),
      },
      {
        path: "overview",
        loadChildren: () =>
          import("../habits-overview/habits-overview.module").then(
            (m) => m.HabitsOverviewPageModule
          ),
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "/habits",
      },
    ],
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/tabs/habits",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
