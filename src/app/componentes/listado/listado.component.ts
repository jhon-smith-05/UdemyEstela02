import { Component, OnInit } from '@angular/core';
import { AnotacionesResponse } from 'src/app/interfaces/anotacionesResponse';
import { ConsultasService } from 'src/app/service/consultas.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  datos?:Array<AnotacionesResponse>;
  constructor(
    private service: ConsultasService,

  ) { }

  ngOnInit(): void {
    this.getPeticion();
  }

  getPeticion(){
    this.service.getDatos().subscribe(
      {
        next: data => 
        {
          this.datos = data

        },
        error: error => 
        {
          console.log('Error', error) 
        }
      }
    );
  }

  eliminar()
  {

  }

}
