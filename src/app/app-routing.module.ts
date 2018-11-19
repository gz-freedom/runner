import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MileageComponent } from "./mileage/mileage.component";
import { AddMileageComponent } from "./add-mileage/add-mileage.component";
import { HomeComponent } from './home/home.component';
import { EditMileageComponent } from './edit-mileage/edit-mileage.component';
import { PbComponent } from "./pb/pb.component";

const routes: Routes = [
  {
    path: 'runner/mileage/add',
    component: AddMileageComponent
  },
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
    path: 'runner/mileage/edit/:id',
    component: EditMileageComponent
  },
  {
    path: 'runner/mileage',
    component: MileageComponent
  },
  {
    path: 'runner/pb',
    component: PbComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
