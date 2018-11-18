import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMileageComponent } from "./add-mileage/add-mileage.component";
import { HomeComponent } from './home/home.component';
import { EditMileageComponent } from './edit-mileage/edit-mileage.component';
import { PbComponent } from "./pb/pb.component";

const routes: Routes = [
  {
    path: 'runner/add',
    component: AddMileageComponent
  },
  {
    path: 'runner',
    component: HomeComponent
  },
  {
    path: 'runner/edit/:id',
    component: EditMileageComponent
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
