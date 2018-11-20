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
  logs: any;
  bestList: any;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private ps: PbService) {
    this.createForm();
  }

  ngOnInit() {
    // get all logs
    this.ps.getAllLogs()  
        .subscribe((data: PB[]) => {
          let dict = {}, logs = data.reverse();

          this.logs = logs.map(log => {
            return {
              title: this.getFormattedTitle(log.type),
              type: log.type,
              logDate: log.logDate,
              score: log.score
            };
          });

          this.bestList = logs.filter(log => {
            if(!dict["t" + log.type]) {
              dict["t" + log.type] = true;
              return true;
            }
            return false;
          }).map(log => {
            return {
              title: this.getFormattedTitle(log.type),
              type: log.type,
              score: log.score
            };
          }).sort((a:any, b:any) => {
            return a.type - b.type;
          });
        });
  }

  createForm() {
    this.angForm = this.fb.group({
      scoreHour: [0],
      scoreMinute: [0],
      scoreSecond: [0],
      logDate: [new Date()],
      note: []
    });
  }

  open(addPb, type) {
    this.modalTitle = this.getFormattedTitle(type);
    this.bestType = type;
    this.modalService.open(addPb);
  }

  savePB(h, m, s, logDate, note) {
    let score = h * 3600 + m * 60 + parseInt(s);
    this.ps.addPbLog(this.bestType, score, logDate, note).subscribe(res => {
      this.modalService.dismissAll();
      this.ngOnInit();
    });
  }

  getFormattedTitle(type) {
    return type === 42 ? "全马最佳成绩" : type === 21 ? "半马最佳成绩" : type + "公里最佳成绩";
  }

}
