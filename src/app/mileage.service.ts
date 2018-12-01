import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MileageService {
  uri = 'http://localhost:4000/runner/mileage';

  constructor(private http: HttpClient) { }

  addMileage(mileage, note, addedDate, score, year, month) {
    const obj = {
      mileage: mileage,
      note : note,
      score: score,
      addedDate: addedDate,
      year: year,
      month: month
    };

    return this.http.post(`${this.uri}/add`, obj);
  }

  getAllMileages() {
    return this.http.get(`${this.uri}`);
  }

  getMileagesByMonth(year, month) {
    return this.http.get(`${this.uri}/${year},${month}`);
  }

  editMileage(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  updateMileage(mileage, score, note, id) {
    const obj = {
      mileage: mileage,
      score: score,
      note: note
    };
    return this.http.post(`${this.uri}/update/${id}`, obj);
  }

  deleteMileage(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }
}
