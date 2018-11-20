import { Component, OnInit } from '@angular/core';
import Mileage from "../mileage";
import { Router } from "@angular/router";
import { MileageService } from "../mileage.service";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mileage',
  templateUrl: './mileage.component.html',
  styleUrls: ['./mileage.component.css']
})
export class MileageComponent implements OnInit {
  mileages: Mileage[];
  angForm: FormGroup;

  constructor(private ms: MileageService, private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.ms.getMileages()
        .subscribe((data: Mileage[]) => {
          this.mileages = data.reverse();
        });
  }

  createForm() {
    this.angForm = this.fb.group({
      mileage: ['', Validators.required],
      note: [],
      scoreHour: [],
      scoreMinute: [],
      scoreSecond: [],
      addedDate: [new Date()]
    });
  }

  addMileage(mileage, note, addedDate, h, m, s) {
    let score = h * 3600 + m * 60 + parseInt(s);
    this.ms.addMileage(mileage, note, addedDate, score)
        .subscribe(res => {
          this.ngOnInit();
          this.angForm.reset({ addedDate: new Date() });
        });
  }

  editMileage() {}

  deleteMileage(id) {
    this.ms.deleteMileage(id).subscribe(res => {
      // get updated mileages list
      this.ngOnInit();
    });
  }
}
