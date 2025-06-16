// src/app/services/caso.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasoService {
  private idCasoSource = new BehaviorSubject<number | null>(this.getIdCasoFromLocalStorage());
  currentIdCaso = this.idCasoSource.asObservable();

  changeIdCaso(id: number) {
    this.idCasoSource.next(id);
    this.saveIdCasoToLocalStorage(id); // Guarda el id_caso en localStorage
  }

  public getIdCasoFromLocalStorage(): number | null {
    const idCaso = localStorage.getItem('id_caso');
    return idCaso ? +idCaso : null; // Convierte a número o devuelve null
  }

  public saveIdCasoToLocalStorage(id: number) {
    localStorage.setItem('id_caso', id.toString());
  }
}
