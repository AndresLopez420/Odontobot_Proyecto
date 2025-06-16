import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CasoscService } from 'src/app/services/casosc.service';
import { InstanciaService } from 'src/app/services/instancia.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-instancia',
  templateUrl: './instancia.component.html',
  styleUrls: ['./instancia.component.css']
})
export class InstanciaComponent implements OnInit {
  onAddInstancia = new EventEmitter();
  onEditInstancia = new EventEmitter();
  instanciaForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  responseMessage: any;
  casos: any = [];
  

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private instanciaService: InstanciaService,
    public dialogRef: MatDialogRef<InstanciaComponent>,
    private casoscService: CasoscService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.instanciaForm = this.formBuilder.group({
      nombre_instancia: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      id_caso: [null, Validators.required],
      tipo_instancia: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      practicas_minimas: [null, [Validators.required]],
      intentos: [null, [Validators.required]],
      entrega: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      modalidad: [null, [Validators.required]],
      fecha_inicio: [null, [Validators.required]],
      fecha_termino: [null, [Validators.required]]
    })

    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.instanciaForm.setValue({
        nombre_instancia: this.dialogData.data.nombre_instancia,
        id_caso: this.dialogData.data.id_caso,
        tipo_instancia: this.dialogData.data.tipo_instancia,
        descripcion: this.dialogData.data.descripcion,
        practicas_minimas: this.dialogData.data.practicas_minimas,
        intentos: this.dialogData.data.intentos,
        entrega: this.formatDate(this.dialogData.data.entrega),
        estado: this.dialogData.data.estado,
        modalidad: this.dialogData.data.modalidad,
        fecha_inicio: this.formatDate(this.dialogData.data.fecha_inicio),
        fecha_termino: this.formatDate(this.dialogData.data.fecha_termino)
      });
    }

    this.getcasos();
  }

  getcasos() {
    this.casoscService.getcasosc().subscribe((response: any) => {
      this.casos = response;
    }, (error: any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    }
    else {
      this.add();
    }
  }

  add() {
    var formData = this.instanciaForm.value;
    var data = {
        nombre_instancia: formData.nombre_instancia,
        id_caso: formData.id_caso,
        tipo_instancia: formData.tipo_instancia,
        descripcion: formData.descripcion,
        practicas_minimas: formData.practicas_minimas,
        intentos: formData.intentos,
        entrega: this.formatDate(formData.entrega), // Formatear fecha
        estado: formData.estado,
        modalidad: formData.modalidad,
        fecha_inicio: this.formatDate(formData.fecha_inicio), // Formatear fecha
        fecha_termino: this.formatDate(formData.fecha_termino) // Formatear fecha
    }
    this.instanciaService.add(data).subscribe((response: any) => {
        this.dialogRef.close();
        this.onAddInstancia.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error: any) => {
        if (error.error?.message) {
            this.responseMessage = error.error?.message;
        } else {
            this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    }); 
  }


  edit() {
    var formData = this.instanciaForm.value;
    var data = {
        id_instancia: this.dialogData.data.id_instancia,
        nombre_instancia: formData.nombre_instancia,
        id_caso: formData.id_caso,
        tipo_instancia: formData.tipo_instancia,
        descripcion: formData.descripcion,
        practicas_minimas: formData.practicas_minimas,
        intentos: formData.intentos,
        entrega: this.formatDate(formData.entrega), // Formatear fecha
        estado: formData.estado,
        modalidad: formData.modalidad,
        fecha_inicio: this.formatDate(formData.fecha_inicio), // Formatear fecha
        fecha_termino: this.formatDate(formData.fecha_termino) // Formatear fecha
    }
    this.instanciaService.update(data).subscribe((response: any) => {
        this.dialogRef.close();
        this.onEditInstancia.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error: any) => {
        if (error.error?.message) {
            this.responseMessage = error.error?.message;
        } else {
            this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

  private formatDate(date: Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Meses son 0-indexados
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
