import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnotacionesRequests } from '../interfaces/anotacionesRequest';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

    if (localStorage.getItem('tokenAnotaciones')!= null) 
      {
      
      } else {
        this.pedirToken(environment.correo, environment.pws).subscribe(
          {
            next: data => 
            {
              localStorage.setItem('tokenAnotaciones', data.token)
            },
            error: error =>
            {
              console.log(error)

            }
          }
        );
      }
   }

   pedirToken(correo:any, password:any):Observable<any>
   {
    return this.http.post(environment.api+"login", {correo: correo, password: password},{});
   }

   getDatos():Observable<any>
   {
    let headers = new HttpHeaders().set('Authorization','Bearer'+localStorage.getItem('tokenAnotaciones'));
    return this.http.get(environment.api+'anotaciones', {headers: headers});
   }

   addDatos(modelo: AnotacionesRequests):Observable<any>
   {
    let headers = new HttpHeaders().set('Authorization','Bearer'+localStorage.getItem('tokenAnotaciones'));
    return this.http.post(environment.api+'anotaciones', modelo, {headers: headers});
   }

}
