import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ManageCasoscComponent } from './manage-casosc/manage-casosc.component';
import { CasoscComponent } from './dialog/casosc/casosc.component';
import { ManageInstanciaComponent } from './manage-instancia/manage-instancia.component';
import { InstanciaComponent } from './dialog/instancia/instancia.component';
import { TerminarEntrevistaComponent } from './dialog/terminar-entrevista/terminar-entrevista.component';
import { FinishInterviewDialogComponent } from './finish-interview-dialog/finish-interview-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ManageCasoscComponent,
    CasoscComponent,
    ManageInstanciaComponent,
    InstanciaComponent,
    TerminarEntrevistaComponent,
    FinishInterviewDialogComponent    
  ]
})
export class MaterialComponentsModule {}
