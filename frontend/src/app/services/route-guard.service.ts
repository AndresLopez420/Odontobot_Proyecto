import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import { jwtDecode } from 'jwt-decode';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth: AuthService,
    public router: Router,
    private snackbarService:SnackbarService) { }

    canActivate(route: ActivatedRouteSnapshot):boolean{
      let expectedRoleArray = route.data;
      expectedRoleArray = expectedRoleArray.expectedRole;

      const token: any = localStorage.getItem('token');
      var tokenPayload: any;
      try {
        tokenPayload = jwtDecode(token);
      }
      catch(err){
        localStorage.clear();
        this.router.navigate(['/']);
      }

      let checkRole = false;

      for (let i=0;i<expectedRoleArray.length;i++){
        if(expectedRoleArray[i] == tokenPayload.rol){
          checkRole = true;
        }
      }

      if (tokenPayload.rol === 'estudiante' || tokenPayload.rol === 'admin' || tokenPayload.rol === 'profesor') {
        if (this.auth.isAuthenticated() && checkRole) {
          return true;
        }
        this.snackbarService.openSnackBar(GlobalConstants.unauthroized,GlobalConstants.error);
        this.router.navigate(['/lobby/dashboard']);
        return false;
      }
      else{
        this.router.navigate(['/']);
        localStorage.clear();
        return false;
      }
    }
}