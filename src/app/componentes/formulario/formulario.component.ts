import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultasService } from 'src/app/service/consultas.service';

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

  }

}
