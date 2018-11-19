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
          this.mileages = data;
        });
  }

  createForm() {
    this.angForm = this.fb.group({
      mileage: ['', Validators.required],
      note: [],
      scoreHour: [0],
      scoreMinute: [0],
      scoreSecond: [0],
      speedMinute: [0],
      speedSecond: [0],
      addedDate: [new Date()]
    });
  }

  addMileage(mileage, sm, ss, note, addedDate, h, m, s) {
    let score = h * 3600 + m * 60 + s;
    let speed = sm * 60 + ss;
    this.ms.addMileage(mileage, speed, note, addedDate, score)
        .subscribe(res => {
          this.router.navigate(['runner']);
        });
  }

  deleteMileage(id) {
    this.ms.deleteMileage(id).subscribe(res => {
      // get updated mileages list
      this.ngOnInit();
    });
  }
}
