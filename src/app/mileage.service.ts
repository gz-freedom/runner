import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MileageService {
  uri = 'http://localhost:4000/runner';

  constructor(private http: HttpClient) { }

  addMileage(mileage, speed, note, addedDate, score) {
    const obj = {
      mileage: mileage,
      speed: speed,
      note : note,
      score: score,
      addedDate: addedDate
    };

    return this.http.post(`${this.uri}/add`, obj);
  }

  getMileages() {
    return this.http.get(`${this.uri}`);
  }

  editMileage(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  updateMileage(mileage, speed, note, addedDate, id) {
    const obj = {
      mileage: mileage,
      speed: speed,
      note: note,
      addedDate: addedDate
    };
    return this.http.post(`${this.uri}/update/${id}`, obj);
  }

  deleteMileage(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }
}
