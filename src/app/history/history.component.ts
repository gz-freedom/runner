import { Component, OnInit } from '@angular/core';
import { MileageService } from "../mileage.service";
import Mileage from "../mileage";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  groupedHistory: Mileage[];
  constructor(private ms: MileageService) { }

  ngOnInit() {
    this.ms.getAllMileages()
      .subscribe((data: Mileage[]) => {
        this.groupedHistory = this.groupMileageHistory(data);
        console.log(this.groupedHistory);
      });
  }

  groupMileageHistory(data) {
    let currentYear = 0, currentMonth = 0, newList = [];
    data.forEach((d) => {
      if(d.year !== currentYear) {
        newList.push({
          year: d.year,
          yearData: [{
            month: d.month,
            monthData: [{
              addedDate: d.addedDate,
              mileage: d.mileage,
              note: d.note,
              score: d.score
            }]
          }]
        });
        currentYear = d.year;
        currentMonth = d.month;
      } else if(d.month !== currentMonth) {
        newList[newList.length - 1].yearData.push({
          month: d.month,
          monthData: [{
            addedDate: d.addedDate,
            mileage: d.mileage,
            note: d.note,
            score: d.score
          }]
        });
        currentMonth = d.month;
      } else {
        let yearLength = newList.length,
            monthLength = newList[yearLength - 1].yearData.length;
        newList[yearLength - 1].yearData[monthLength - 1].monthData.push({
          addedDate: d.addedDate,
          mileage: d.mileage,
          note: d.note,
          score: d.score
        });
      }
    });
    return newList;
  }

}
