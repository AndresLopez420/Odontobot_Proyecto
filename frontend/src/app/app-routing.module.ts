import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { RouteGuardService } from './services/route-guard.service';
import { ChatbotComponent } from './chatbot/chatbot.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'lobby',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/lobby/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
          canActivate:[RouteGuardService],
          data:{
            expectedRole:['admin','profesor','estudiante']
          }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[RouteGuardService],
          data:{
            expectedRole:['admin','profesor','estudiante']
          }
      },
      {
        path: 'chatbot', // Nueva ruta para el chatbot
        component: ChatbotComponent // Componente del chatbot
      }
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
