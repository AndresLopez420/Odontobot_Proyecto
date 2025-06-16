import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InstanciaStatusService {
  private activeCasoId: number | null = null; // Propiedad para almacenar el ID del caso activo
  private activeInstanciaSource = new BehaviorSubject<number | null>(null);
  activeInstancia$ = this.activeInstanciaSource.asObservable();

  setActiveInstancia(id: number) {
    this.activeInstanciaSource.next(id);
  }
  // Método para obtener el ID del caso activo
  getActiveCasoId(): number | null {
    return this.activeCasoId;
  }

  // Método para establecer el ID del caso activo
  setActiveCasoId(casoId: number): void {
    this.activeCasoId = casoId;
  }
}