import { Component, EventEmitter, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CasoscService } from 'src/app/services/casosc.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-casosc',
  templateUrl: './casosc.component.html',
  styleUrls: ['./casosc.component.css']
})
export class CasoscComponent implements OnInit {
  onAddCaso = new EventEmitter();
  onEditCaso = new EventEmitter();
  casoForm:any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  responseMessage: any;
  selectedFile: File | null = null;
  fileError: string | null = null;
  previewUrl: string | null = null; // Para almacenar la URL de la vista previa
  imagePath: string = 'C:/Users/aylee/Documents/GitHub/Proyecto_Odontobot/uploads/1743230833871.jpg';
  selectedIntraoralFile: File | null = null;
  fileErrorIntraoral: string | null = null;
  selectedExtraoralFile: File | null = null;
  fileErrorExtraoral: string | null = null;


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private casoscService: CasoscService,
    private renderer: Renderer2,
    public dialogRef: MatDialogRef<CasoscComponent>,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.casoForm = this.formBuilder.group({
      nombre_pv: [null, [Validators.required]],
      fecha_nacimiento: [null, [Validators.required]],
      nacionalidad: [null, [Validators.required]],
      telefono: [null, [Validators.required]],
      actividad: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      rut: [null, [Validators.required]],
      nombre_caso: [null, [Validators.required]],
      id_profesor: [null, [Validators.required]],
      dificultad: [null, [Validators.required]], 
      instancia: [null, [Validators.required]], 
      modulo: [null, [Validators.required]], 
      clase: [null, [Validators.required]], 
      patologia: [null, [Validators.required]], 
      motivo_consulta: [null, [Validators.required]], 
      ultima_visita: [null, [Validators.required]], 
      sintomas_ap: [null, [Validators.required]],
      molestia_ap: [null, [Validators.required]],
      enfermedadescronicas_ar: [null, [Validators.required]],
      alergias_ar: [null, [Validators.required]],
      medicamentos_ar: [null, [Validators.required]],
      antecedentes_ar: [null, [Validators.required]],
      habitos_ar: [null, [Validators.required]],
      higiene_ar: [null, [Validators.required]],
      examen_intraoral: [null, [Validators.required]],
      examen_extraoral: [null, [Validators.required]],
      examenes: [null, [Validators.required]]
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.casoForm.patchValue({
         // Datos del paciente
         nombre_pv: this.dialogData.data.nombre_pv,
         fecha_nacimiento: this.dialogData.data.fecha_nacimiento,
         nacionalidad: this.dialogData.data.nacionalidad,
         telefono: this.dialogData.data.telefono,
         actividad: this.dialogData.data.actividad,
         genero: this.dialogData.data.genero,
         direccion: this.dialogData.data.direccion,
         rut: this.dialogData.data.rut,
         // Datos del caso clínico
         nombre_caso: this.dialogData.data.nombre_caso,
         id_profesor: this.dialogData.data.id_profesor,
         dificultad: this.dialogData.data.dificultad,
         instancia: this.dialogData.data.instancia,
         modulo: this.dialogData.data.modulo,
         clase: this.dialogData.data.clase,
         patologia: this.dialogData.data.patologia,
         motivo_consulta: this.dialogData.data.motivo_consulta,
         ultima_visita: this.dialogData.data.ultima_visita,
         sintomas_ap: this.dialogData.data.sintomas_ap,
         molestia_ap: this.dialogData.data.molestia_ap,
         enfermedadescronicas_ar: this.dialogData.data.enfermedadescronicas_ar,
         alergias_ar: this.dialogData.data.alergias_ar,
         medicamentos_ar: this.dialogData.data.medicamentos_ar,
         antecedentes_ar: this.dialogData.data.antecedentes_ar,
         habitos_ar: this.dialogData.data.habitos_ar,
         higiene_ar: this.dialogData.data.higiene_ar,
         examen_intraoral: this.dialogData.data.examen_intraoral,
         examen_extraoral: this.dialogData.data.examen_extraoral,
         examenes: this.dialogData.data.examenes
      });
      this.previewUrl = this.dialogData.data.examenes;
    
    }
  }
  handleSubmit() {
    if (this.dialogAction === "Edit") {
      this.edit()
    }
    else {
      this.add();
    }
  }
  
  openFileInput(type: string) {
    const fileInput = document.getElementById(`${type}Input`) as HTMLInputElement;
    if (fileInput) {
        fileInput.click();
    }
  }


  onFileSelected(event: any, type: string) {
    const file: File = event.target.files[0];
    
    if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.type)) {
            if (type === 'examenes') {
                this.selectedFile = file;
                this.fileError = null; // Limpiar errores
            } else if (type === 'intraoral') {
                this.selectedIntraoralFile = file;
                this.fileErrorIntraoral = null; // Limpiar errores
            } else if (type === 'extraoral') {
                this.selectedExtraoralFile = file;
                this.fileErrorExtraoral = null; // Limpiar errores
            }
        } else {
            if (type === 'examenes') {
                this.fileError = 'Tipo de archivo no permitido. Solo se permiten imágenes.';
                this.selectedFile = null;
            } else if (type === 'intraoral') {
                this.fileErrorIntraoral = 'Tipo de archivo no permitido. Solo se permiten imágenes.';
                this.selectedIntraoralFile = null;
            } else if (type === 'extraoral') {
                this.fileErrorExtraoral = 'Tipo de archivo no permitido. Solo se permiten imágenes.';
                this.selectedExtraoralFile = null;
            }
        }
    }
  }




  add() {
    const formData = new FormData(); // Usar FormData para enviar archivos
    formData.append('nombre_pv', this.casoForm.get('nombre_pv')?.value);
    formData.append('fecha_nacimiento', this.formatDate(this.casoForm.get('fecha_nacimiento')?.value));
    formData.append('nacionalidad', this.casoForm.get('nacionalidad')?.value);
    formData.append('telefono', this.casoForm.get('telefono')?.value);
    formData.append('actividad', this.casoForm.get('actividad')?.value);
    formData.append('genero', this.casoForm.get('genero')?.value);
    formData.append('direccion', this.casoForm.get('direccion')?.value);
    formData.append('rut', this.casoForm.get('rut')?.value);
    
    // Agregar los campos existentes
    formData.append('nombre_caso', this.casoForm.get('nombre_caso')?.value);
    formData.append('id_profesor', this.casoForm.get('id_profesor')?.value);
    formData.append('dificultad', this.casoForm.get('dificultad')?.value);
    formData.append('instancia', this.casoForm.get('instancia')?.value);
    formData.append('modulo', this.casoForm.get('modulo')?.value);
    formData.append('clase', this.casoForm.get('clase')?.value);
    formData.append('patologia', this.casoForm.get('patologia')?.value);
    formData.append('motivo_consulta', this.casoForm.get('motivo_consulta')?.value);
    formData.append('ultima_visita', this.formatDate(this.casoForm.get('ultima_visita')?.value));
    formData.append('sintomas_ap', this.casoForm.get('sintomas_ap')?.value);
    formData.append('molestia_ap', this.casoForm.get('molestia_ap')?.value);
    formData.append('enfermedadescronicas_ar', this.casoForm.get('enfermedadescronicas_ar')?.value);
    formData.append('alergias_ar', this.casoForm.get('alergias_ar')?.value);
    formData.append('medicamentos_ar', this.casoForm.get('medicamentos_ar')?.value);
    formData.append('antecedentes_ar', this.casoForm.get('antecedentes_ar')?.value);
    formData.append('habitos_ar', this.casoForm.get('habitos_ar')?.value);
    formData.append('higiene_ar', this.casoForm.get('higiene_ar')?.value);
    formData.append('examen_intraoral', this.casoForm.get('examen_intraoral')?.value);
    formData.append('examen_extraoral', this.casoForm.get('examen_extraoral')?.value);
  
    // Añadir el archivo seleccionado
    if (this.selectedIntraoralFile) {
      formData.append('examen_intraoral', this.selectedIntraoralFile);
    }
    if (this.selectedExtraoralFile) {
        formData.append('examen_extraoral', this.selectedExtraoralFile);
    }
    
    if (this.selectedFile) {
        formData.append('examenes', this.selectedFile);
    }
  
    console.log('Datos a enviar:', formData);
    this.casoscService.add(formData).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddCaso.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error: any) => {
      this.dialogRef.close();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }
  
  
  

  edit() {
    const formData = new FormData();
  
    // Agregar todos los campos del formulario a FormData
    formData.append('nombre_pv', this.casoForm.get('nombre_pv')?.value);
    formData.append('fecha_nacimiento', this.formatDate(this.casoForm.get('fecha_nacimiento')?.value));
    formData.append('nacionalidad', this.casoForm.get('nacionalidad')?.value);
    formData.append('telefono', this.casoForm.get('telefono')?.value);
    formData.append('actividad', this.casoForm.get('actividad')?.value);
    formData.append('genero', this.casoForm.get('genero')?.value);
    formData.append('direccion', this.casoForm.get('direccion')?.value);
    formData.append('rut', this.casoForm.get('rut')?.value);
    
    // Agregar campos existentes
    formData.append('nombre_caso', this.casoForm.get('nombre_caso')?.value);
    formData.append('id_caso', this.dialogData.data.id_caso);
    formData.append('dificultad', this.casoForm.get('dificultad')?.value);
    formData.append('instancia', this.casoForm.get('instancia')?.value);
    formData.append('modulo', this.casoForm.get('modulo')?.value);
    formData.append('clase', this.casoForm.get('clase')?.value);
    formData.append('patologia', this.casoForm.get('patologia')?.value);
    formData.append('motivo_consulta', this.casoForm.get('motivo_consulta')?.value);
    formData.append('ultima_visita', this.formatDate(this.casoForm.get('ultima_visita')?.value));
    formData.append('sintomas_ap', this.casoForm.get('sintomas_ap')?.value);
    formData.append('molestia_ap', this.casoForm.get('molestia_ap')?.value);
    formData.append('enfermedadescronicas_ar', this.casoForm.get('enfermedadescronicas_ar')?.value);
    formData.append('alergias_ar', this.casoForm.get('alergias_ar')?.value);
    formData.append('medicamentos_ar', this.casoForm.get('alergias_ar')?.value);
    formData.append('antecedentes_ar', this.casoForm.get('antecedentes_ar')?.value);
    formData.append('habitos_ar', this.casoForm.get('habitos_ar')?.value);
    formData.append('higiene_ar', this.casoForm.get('higiene_ar')?.value);
    formData.append('examen_intraoral', this.casoForm.get('examen_intraoral')?.value);
    formData.append('examen_extraoral', this.casoForm.get('examen_extraoral')?.value);
    
    // Mantener la ruta existente si no hay nuevo archivo
    if (this.selectedFile) {
      formData.append('examenes', this.selectedFile); // Agregar el nuevo archivo
    } else {
      formData.append('examenes', this.dialogData.data.examenes); // Mantener la ruta existente
    }
  
    this.casoscService.update(formData).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditCaso.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error: any) => {
      this.dialogRef.close();
      this.responseMessage = error.error?.message || GlobalConstants.genericError;
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
