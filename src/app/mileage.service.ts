import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MileageService {
  uri = 'http://localhost:4000/runner';

  constructor(private http: HttpClient) { }

  addMileage(mileage, speed, note) {
    const obj = {
      mileage: mileage,
      speed: speed,
      note : note
    };

    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }
}
