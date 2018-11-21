import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PbService {
  uri = 'http://localhost:4000/runner/pb';

  constructor(private http: HttpClient) { }

  addPbLog(bestType, score, logDate, note) {
    const obj = {
      type: bestType,
      score: score,
      logDate: logDate,
      note: note
    };
    return this.http.post(`${this.uri}/add`, obj);
  }

  getAllLogs() {
    return this.http.get(`${this.uri}`);
  }
}
