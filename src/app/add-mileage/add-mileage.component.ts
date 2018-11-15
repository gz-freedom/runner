import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MileageService } from "../mileage.service";

@Component({
  selector: 'app-add-mileage',
  templateUrl: './add-mileage.component.html',
  styleUrls: ['./add-mileage.component.css']
})
export class AddMileageComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private ms: MileageService) { 
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      mileage: ['', Validators.required]
    });
  }

  addMileage(mileage, speed, note) {
    this.ms.addMileage(mileage, speed, note);
  }

  ngOnInit() {
  }

}
