import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CasoscService } from 'src/app/services/casosc.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CasoscComponent } from '../dialog/casosc/casosc.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';


@Component({
  selector: 'app-manage-casosc',
  templateUrl: './manage-casosc.component.html',
  styleUrls: ['./manage-casosc.component.css']
})
export class ManageCasoscComponent implements OnInit{
  displayedColumns: string[] = ['id_caso','nombre_caso','dificultad','edit'];
  dataSource: any;
  responseMessage: any;
  constructor(private casoscService:CasoscService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService:SnackbarService,
    private router: Router){ }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.casoscService.getcasosc().subscribe((response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      },(error:any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      })
    }  
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    // Personaliza el filtrado
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.id_caso.toString().toLowerCase().includes(filter) || 
              data.nombre_caso.toLowerCase().includes(filter) || 
              data.dificultad.toLowerCase().includes(filter);
    };
  
    this.dataSource.filter = filterValue;
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(CasoscComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddCaso.subscribe(
      (reponse)=>{
        this.tableData();
      }
    )
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(CasoscComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditCaso.subscribe(
      (reponse)=>{
        this.tableData();
      }
    )
  }

  handleDeleteAction(values:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data={
        message:'Borrar Caso Clinico'
      }
      const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
      const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
        this.ngxService.start();
        this.deleteCaso(values.id_caso);
        dialogRef.close();
      })
    }
  
    deleteCaso(id:any){
      this.casoscService.delete(id).subscribe((response:any)=>{
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
}
