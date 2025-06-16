import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCasoscComponent } from './manage-casosc/manage-casosc.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageInstanciaComponent } from './manage-instancia/manage-instancia.component';

export const MaterialRoutes: Routes = [
    {
        path: 'casosc',
        component: ManageCasoscComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin','profesor','estudiante']
        }
    },
    {
        path: 'instancia',
        component: ManageInstanciaComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin','profesor','estudiante']
        }
    }
];
