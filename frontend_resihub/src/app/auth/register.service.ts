import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Register } from './register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  http = inject(HttpClient);
    API = environment.SERVIDOR + "/api/register";

  constructor() { }

  register(register: Register): Observable<string> {
      return this.http.post<string>(this.API, register, {responseType: 'text' as 'json'});
    }

}
