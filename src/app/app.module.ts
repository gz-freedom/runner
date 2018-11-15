import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SlimLoadingBarModule } from "ng2-slim-loading-bar";
import { MileageService } from "./mileage.service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddMileageComponent } from './add-mileage/add-mileage.component';

@NgModule({
  declarations: [
    AppComponent,
    AddMileageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlimLoadingBarModule
  ],
  providers: [ MileageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
