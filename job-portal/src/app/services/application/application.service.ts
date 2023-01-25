import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationDto } from 'src/app/Models/IApplication';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private _http: HttpClient) {}

  submitApplication(application: ApplicationDto) {
    return this._http.post('/apply', { application });
  }
}
