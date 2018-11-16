import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SlimLoadingBarModule } from "ng2-slim-loading-bar";
import { MileageService } from "./mileage.service";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddMileageComponent } from './add-mileage/add-mileage.component';
import { HomeComponent } from './home/home.component';
import { EditMileageComponent } from './edit-mileage/edit-mileage.component';

@NgModule({
  declarations: [
    AppComponent,
    AddMileageComponent,
    HomeComponent,
    EditMileageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlimLoadingBarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [ MileageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
