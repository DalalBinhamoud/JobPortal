import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LookupDto } from 'src/app/Models/ILookup';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  constructor(private _http: HttpClient) {}

  getJobs() {
    return this._http.get<LookupDto[]>(`/lookup/jobs`);
  }

  getSkills() {
    return this._http.get<LookupDto[]>(`/lookup/skills`);
  }
}
