import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Apartamento } from '../models/apartamento';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApartamentoService {

  http = inject(HttpClient);

  API= environment.SERVIDOR + "/api/apartamento";
  constructor() { }
  
  save(apartamento: Apartamento): Observable<string>{ 
    return this.http.post<string>(this.API+"/save", apartamento,{responseType:'text' as 'json'});
  }

  update(apartamento: Apartamento, id: number): Observable<string>{ 
    return this.http.put<string>(this.API+"/update/" + id, apartamento,{responseType:'text' as 'json'});
  }

  listAll(): Observable<Apartamento[]>{ 
    return this.http.get<Apartamento[]>(this.API+"/listAll");
  }

  findByAparNum(id: number): Observable<Apartamento>{ 
    return this.http.get<Apartamento>(this.API+"/findById/" + id);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + "/delete/" + id, { responseType: 'text' as 'json' });
  }
}
