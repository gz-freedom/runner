import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMileageComponent } from "./add-mileage/add-mileage.component";

const routes: Routes = [
  {
    path: 'runner/add',
    component: AddMileageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
