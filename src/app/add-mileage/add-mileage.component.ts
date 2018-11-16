import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MileageService } from "../mileage.service";

@Component({
  selector: 'app-add-mileage',
  templateUrl: './add-mileage.component.html',
  styleUrls: ['./add-mileage.component.css']
})
export class AddMileageComponent implements OnInit {

  angForm: FormGroup;

  constructor(private fb: FormBuilder, private ms: MileageService, private router: Router) { 
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      mileage: ['', Validators.required],
      speed: [],
      note: [],
      addedDate: [new Date()]
    });
  }

  addMileage(mileage, speed, note, addedDate) {

    this.ms.addMileage(mileage, speed, note, addedDate)
        .subscribe(res => {
          this.router.navigate(['runner']);
        });
  }

  ngOnInit() {
  }

}
