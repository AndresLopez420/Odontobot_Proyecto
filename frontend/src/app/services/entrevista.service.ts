// entrevista.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrevistaService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getcasosc(): Observable<any> {
    return this.httpClient.get(this.url + "/casoClinico/get/");
  }

  getpaciente(): Observable<any> {
    return this.httpClient.get(this.url + "/casoClinico/getpaciente/");
  }

  // Obtiene todos los casos clínicos con datos del paciente
  getinfo(){
    return this.httpClient.get(this.url + "/casoClinico/getCasosCompletos/");
  }

  // Obtiene un caso específico con datos del paciente
  getCasoCompleto(id_caso: number): Observable<any> {
    return this.httpClient.get(`${this.url}/casoClinico/getCasoCompleto/${id_caso}`); // Usar comillas invertidas
  }
  
  getImageUrl(filename: string): string {
    return `${environment.apiUrl}/uploads/${filename}`;
    // O si usas el endpoint con autenticación:
    // return `${environment.apiUrl}/get-image/${filename}`;
  }

}

