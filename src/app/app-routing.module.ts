import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MileageComponent } from "./mileage/mileage.component";
import { HomeComponent } from './home/home.component';
import { PbComponent } from "./pb/pb.component";
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "runner/mileage",
    pathMatch: "full"
  },
  {
    path: 'runner',
    redirectTo: "runner/mileage",
    pathMatch: "full"
  },
  {
    path: 'runner/mileage',
    component: MileageComponent
  },
  {
    path: 'runner/pb',
    component: PbComponent
  },
  {
    path: 'runner/history',
    component: HistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
