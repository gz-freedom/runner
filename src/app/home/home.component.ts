import { Component, OnInit } from '@angular/core';
import Mileage from "../mileage";
import { MileageService } from "../mileage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mileages: Mileage[];

  constructor(private ms: MileageService) { }

  ngOnInit() {
    this.ms.getMileages()
        .subscribe((data: Mileage[]) => {
          this.mileages = data;
        });
  }

  deleteMileage(id) {
    this.ms.deleteMileage(id).subscribe(res => {
      // get updated mileages list
      this.ngOnInit();
    });
  }
}
