import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnotacionesRequests } from 'src/app/interfaces/anotacionesRequest';
import { ConsultasService } from 'src/app/service/consultas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  usuario:any;
  @ViewChild("myModalConf", {static: false}) myModalConf?: TemplateRef<any>;
  modalTitle?: string;
  anotaciones!: FormGroup;
  anotacionesContent =
    {
      titulo:"",
      descripcion:""
    };
  constructor(
    private modalService: NgbModal,
    private service: ConsultasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario()
  {
    this.anotaciones = new FormGroup(
      {
        titulo: new FormControl(
          this.anotacionesContent.titulo,
          [
            Validators.required, 
            Validators.minLength(4)
          ]
        ),
          descripcion: new FormControl
          (
          
          )
      }
    )    
  }

  get titulo(){return this.anotaciones.get('titulo')!;}
  get descripcion(){return this.anotaciones.get('descripcion')!;}

  abrir()
  {
    this.modalService.open(this.myModalConf,{size:'lg'});
    this.modalTitle = "Crear nueva anotación";
  }

  enviar()
  {
    let modelo : AnotacionesRequests = {
      titulo: this.anotaciones.value.titulo,
      descripcion: this.anotaciones.value.descripcion
    }
    this.service.addDatos(modelo).subscribe(
      {
        next: data =>
        {
          Swal.fire({
            icon: 'success',
            timer: 5000,
            title: 'OK',
            text: "Se creó el registro exitosamente"
          });
          
        }
        ,
        error: error =>
        {
          Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: "Se produjo un error, por favor vuelva a intentarlo!!"
          });
        }
      });
      
      this.modalService.dismissAll();
      // this.router.navigate(['/']).then(()=>{
      //   window.location.reload();
      // });
  }

}
