import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  http = inject(HttpClient);
  API= environment.SERVIDOR + "/api/cliente";

  constructor() { }

  save(cliente: Cliente): Observable<string>{ 
    return this.http.post<string>(this.API+"/save", cliente,{responseType:'text' as 'json'});
  }

  listAll(): Observable<Cliente[]>{ 
    return this.http.get<Cliente[]>(this.API+"/listAll");
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + "/delete/" + id, {responseType:'text' as 'json'});
  }

  findById(id: number): Observable<Cliente>{ 
    return this.http.get<Cliente>(this.API+"/findById/" + id);
  }
}


