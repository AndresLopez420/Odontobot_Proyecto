import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
	responseMessage: any;
	data: any;
	userRole: string | null = null; // Variable para almacenar el rol del usuario
	content: string = ''; // Variable para almacenar el contenido a mostrar

	constructor(
		private dashboardService: DashboardService,
		private ngxService: NgxUiLoaderService,
		private snackbarService: SnackbarService
	) {
		this.ngxService.start();
	}
	

	ngOnInit(): void {
		// Obtener el rol del usuario desde el almacenamiento local
		this.userRole = localStorage.getItem('userRole');

		// Determinar el contenido a mostrar basado en el rol
		if (this.userRole === 'admin') {
			this.content = 'Bienvenido, Admin. Aquí están las herramientas de administración.';
		} else if (this.userRole === 'profesor') {
			this.content = 'Bienvenido, Profesor. Aquí puedes gestionar tus clases.';
		} else {
			this.content = 'Bienvenido. Aquí tienes información general.';
		}

		// Detener el loader después de obtener los datos
		this.ngxService.stop();
	}

	ngAfterViewInit() {
		// Aquí puedes agregar lógica que necesites ejecutar después de que la vista se haya inicializado
	}
}
	