import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoginDto } from 'src/app/Models/IAuth'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(values: LoginDto) {
    return this._http.post('/login', values)
  }
}
