import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnotacionesResponse } from 'src/app/interfaces/anotacionesResponse';
import { ConsultasService } from 'src/app/service/consultas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  datos?:Array<AnotacionesResponse>;
  constructor(
    private service: ConsultasService,
    private router: Router

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

  eliminar(id:any)
  {
    Swal.fire({
      title: "Estas seguro?",
      text: "se eliminara este resgistro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteDatos(id).subscribe(
          {
            next: data => {
              if (data.estado == 'ok')
                {
                  Swal.fire({
                    title: "OK",
                    icon: "success",
                    timer: 5000,
                    text: "Se eliminó el registro exitos"
                  });
                } else {
                  Swal.fire({
                    title: "Ups!",
                    text: "No es posible eliminar el registro.",
                    icon: "error",
                    timer: 5000,
                  });
                }
                this.router.navigate(['/']).then(()=>{
                window.location.reload();
                });
            },
            error: error => {
              console.log('Error: ' + error)
            }
          });
      }
    });


  }

}
