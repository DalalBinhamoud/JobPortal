import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private _http: HttpClient) {}

  uploadFile(resume: FormData) {
    return this._http.post('file/upload', resume);
  }

  downloadFile(applicationId: number) {
    return this._http.get(`file/download/${applicationId}`);
  }
}
