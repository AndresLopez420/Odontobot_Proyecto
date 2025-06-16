import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { InstanciaService } from 'src/app/services/instancia.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { InstanciaComponent } from '../dialog/instancia/instancia.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { InstanciaStatusService } from 'src/app/services/instancia-status.service';
import { CasoService } from 'src/app/services/caso.service';

@Component({
  selector: 'app-manage-instancia',
  templateUrl: './manage-instancia.component.html',
  styleUrls: ['./manage-instancia.component.css']
})
export class ManageInstanciaComponent implements OnInit{
  displayedColumns:string[] = ['nombre_instancia', 'tipo_instancia', 'descripcion', 'practicas_minimas', 'intentos', 'entrega', 'estado', 'modalidad', 'fecha_inicio', 'fecha_termino','edit'];
  dataSource:any;
  responseMessage:any;

  constructor(private instanciaService:InstanciaService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private instanciaStatusService: InstanciaStatusService,
    private casoService: CasoService,
    private router:Router){}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.instanciaService.getIntancias().subscribe((response: any) => {
        this.ngxService.stop();
        
        // Formatear las fechas en la respuesta
        response.forEach((element: any) => {
            element.entrega = this.formatDate(element.entrega);
            element.fecha_inicio = this.formatDate(element.fecha_inicio);
            element.fecha_termino = this.formatDate(element.fecha_termino);
        });
        console.log('Data Source:', response); // Verifica la estructura aquí
        this.dataSource = new MatTableDataSource(response);
    }, (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
            this.responseMessage = error.error?.message;
        } else {
            this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = this.padTo2Digits(date.getDate());
    const month = this.padTo2Digits(date.getMonth() + 1); // Los meses son 0-indexados
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  private padTo2Digits(num: number): string {
      return num < 10 ? '0' + num : num.toString();
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Add'
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(InstanciaComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddInstancia.subscribe(
      (response) => {
        this.tableData();
      }
    )
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Edit',
      data:values
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(InstanciaComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onEditInstancia.subscribe(
      (response) => {
        this.tableData();
      }
    )
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      message:'borrar instancia'
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteInstancia(values.id_instancia);
      dialogRef.close();
    })
  }

  deleteInstancia(id:any){
    this.instanciaService.delete(id).subscribe((response:any)=>{
      this.ngxService.stop();
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  onChange(status: boolean, id_instancia: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (status) {
        this.instanciaService.getCasoByInstancia(id_instancia).subscribe((response: any) => {
          const id_caso = response.id_caso;
          console.log('ID Caso:', id_caso);
          this.snackbarService.openSnackBar(`Instancia Habilitada con éxito`, "success");
          
          this.casoService.changeIdCaso(id_caso); // Envía el id_caso al servicio
          resolve(id_caso);
        }, (error: any) => {
          console.error('Error al habilitar la instancia', error);
          this.snackbarService.openSnackBar(GlobalConstants.genericError, GlobalConstants.error);
          reject(error);
        });
      }
    });
  }
}
