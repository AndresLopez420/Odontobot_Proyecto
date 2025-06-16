import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasoscService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data: any) {
    return this.httpClient.post(this.url + "/casoClinico/add/", data);
  }

  update(data: FormData) {
    return this.httpClient.patch(this.url + "/casoClinico/update/", data);
  }

  getcasosc() {
    return this.httpClient.get(this.url + "/casoClinico/get/").pipe(
      map((response: any) => {
        // Ajustar la URL de las imágenes en los datos recibidos
        response.forEach((element: any) => {
          element.examenes = `/uploads/${element.examenes}`; // Ruta relativa
        });
        return response; // Retornar la respuesta modificada
      })
    );
  }

  delete(id: any) {
    return this.httpClient.delete(this.url + "/casoClinico/delete/" + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getpaciente() {
    return this.httpClient.get(this.url + "/casoClinico/getpaciente/");
  }

  addpaciente(data: any) {
    return this.httpClient.post(this.url + "/casoClinico/addpaciente/", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
