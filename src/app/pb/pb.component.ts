import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PbService } from "../pb.service";
import PB from "../pb";

@Component({
  selector: 'app-pb',
  templateUrl: './pb.component.html',
  styleUrls: ['./pb.component.css']
})
export class PbComponent implements OnInit {
  modalTitle: string;
  bestType: number;
  angForm: FormGroup;
  logs: PB[];

  constructor(private modalService: NgbModal, private fb: FormBuilder, private ps: PbService) {
    this.createForm();
  }

  ngOnInit() {
    this.getAllLogs();
  }

  getAllLogs() {
    this.ps.getAllLogs()  
        .subscribe((data: PB[]) => {
          this.logs = data;
        });
  }

  createForm() {
    this.angForm = this.fb.group({
      score: ['', Validators.required],
      logDate: [new Date()],
      note: []
    });
  }

  open(addPb, type) {
    this.modalTitle = type === 42 ? "全马最佳成绩" : 
                        type === 21 ? "半马最佳成绩" : type + "公里最佳成绩"
    this.bestType = type;
    this.modalService.open(addPb);
  }

  savePB(score, logDate, note) {
    this.ps.addPbLog(this.bestType, score, logDate, note).subscribe(res => {
      this.modalService.dismissAll();
    });
  }

}
