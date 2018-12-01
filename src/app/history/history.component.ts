import { Component, OnInit } from '@angular/core';
import { MileageService } from "../mileage.service";
import Mileage from "../mileage";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  mileages: Mileage[];
  constructor(private ms: MileageService) { }

  ngOnInit() {
    this.ms.getAllMileages()
      .subscribe((data: Mileage[]) => {
        this.mileages = data;
      });
  }

}
