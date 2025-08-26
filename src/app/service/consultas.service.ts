import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

   pedirToken(correo:any, pasword:any):Observable<any>
   {
    return this.http.post(environment.api+"login", {correo: correo, pasword: pasword},{});

   }

}
