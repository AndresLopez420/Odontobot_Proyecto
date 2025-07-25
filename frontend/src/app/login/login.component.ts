import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              public dialogRef: MatDialogRef<LoginComponent>,
              private ngxService: NgxUiLoaderService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      rut: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, Validators.required]
    });
  }

  handleSubmit() {
    this.ngxService.start();
    const formData = this.loginForm.value;
    const data = {
      rut: formData.rut,
      password: formData.password
    };

    this.userService.login(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      
      // Almacena el token y el rol en el almacenamiento local
      localStorage.setItem('token', response.token);
      localStorage.setItem('userRole', response.rol); // Almacena el rol
      console.log(localStorage);

      // Redirige al usuario a la página correspondiente
      this.router.navigate(['/lobby/dashboard']);
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }
}
