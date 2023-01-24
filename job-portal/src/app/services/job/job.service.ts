import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobDto } from 'src/app/Models/IJob';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private _http: HttpClient) {}

  getJobs() {
    return this._http.get<JobDto[]>(`/jobs`);
  }
}
