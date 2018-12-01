import { Component, OnInit } from '@angular/core';
import Mileage from "../mileage";
import { MileageService } from "../mileage.service";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mileage',
  templateUrl: './mileage.component.html',
  styleUrls: ['./mileage.component.css']
})
export class MileageComponent implements OnInit {
  mileages: Mileage[];
  angForm: FormGroup;
  editForm: FormGroup;
  editId: any;

  constructor(private ms: MileageService, private fb: FormBuilder, private modalService: NgbModal) {
    this.createForm();
  }

  ngOnInit() {
    let todayDate = new Date();
    let year = todayDate.getFullYear();
    let month = todayDate.getMonth() + 1;
    this.ms.getMileagesByMonth(year, month).subscribe((data: Mileage[]) => {
      this.mileages = data;
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

  createEditForm(mileage, note, h, m,s) {
    this.editForm = this.fb.group({
      mileage: [mileage, Validators.required],
      note: [note],
      scoreHour: [h],
      scoreMinute: [m],
      scoreSecond: [s]
    });
  }

  addMileage(mileage, note, addedDate, h, m, s) {
    let score = h * 3600 + m * 60 + parseInt(s);
    let year = new Date(addedDate).getFullYear();
    let month = new Date(addedDate).getMonth() + 1;
    this.ms.addMileage(mileage, note, addedDate, score, year, month)
        .subscribe(res => {
          this.ngOnInit();
          this.angForm.reset({ addedDate: new Date() });
        });
  }

  open(editMileage, id) {
    this.editId = id;
    this.ms.editMileage(id).subscribe((data: Mileage) => {
      let score = parseInt(data.score.toString());
      let h = parseInt(score / 3600 + "");
      score = score % 3600;
      let m = parseInt(score / 60 + "");
      let s = score % 60;
      this.createEditForm(data.mileage, data.note, h, m, s);
      this.modalService.open(editMileage);
    });
  }

  updateMileage(mileage, h, m, s, note) {
    let score = h * 3600 + m * 60 + parseInt(s);
    this.ms.updateMileage(mileage, score, note, this.editId).subscribe(res => {
      this.modalService.dismissAll();
      this.ngOnInit();
    });
  }

  deleteMileage(id) {
    this.ms.deleteMileage(id).subscribe(res => {
      // get updated mileages list
      this.ngOnInit();
    });
  }
}
