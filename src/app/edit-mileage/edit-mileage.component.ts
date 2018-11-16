import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MileageService } from "../mileage.service";

@Component({
  selector: 'app-edit-mileage',
  templateUrl: './edit-mileage.component.html',
  styleUrls: ['./edit-mileage.component.css']
})
export class EditMileageComponent implements OnInit {
  editMileage: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private ms: MileageService, private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      mileage: ['', Validators.required],
      speed: [],
      note: []
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ms.editMileage(params['id']).subscribe(res => {
        console.log(res);
        this.editMileage = res;
      });
    });
  }

  updateMileage(mileage, speed, note) {
    this.route.params.subscribe(params => {
      this.ms.updateMileage(mileage, speed, note, params['id']);
      this.router.navigate(['runner']);
    });
  }

}
