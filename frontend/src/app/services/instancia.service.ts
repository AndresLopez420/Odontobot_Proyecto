import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'; // Importa Observable

@Injectable({
  providedIn: 'root'
})
export class InstanciaService {
  url = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }

    add(data:any){
      return this.httpClient.post(this.url+
        "/instancia/add/",data,{
          headers: new HttpHeaders().set('Content-Type','application/json')
        })
    }

    update(data:any){
      return this.httpClient.patch(this.url+
        "/instancia/update/",data,{
          headers: new HttpHeaders().set('Content-Type','application/json')
        })
    }

    getIntancias(){
      return this.httpClient.get(this.url+"/instancia/get/");
    }

    updateStatus(data:any){
      return this.httpClient.patch(this.url+
        "/instancia/updateStatus/",data,{
          headers: new HttpHeaders().set('Content-Type','application/json')
        })
    }

    delete(id:any){
      return this.httpClient.delete(this.url+
        "/instancia/delete/"+id,{
          headers: new HttpHeaders().set('Content-Type','application/json')
        })
    }

    // Método para obtener id_caso por id_instancia
    getCasoByInstancia(id_instancia: any): Observable<any> {
      return this.httpClient.get(this.url + "/instancia/getCasoByInstancia/" + id_instancia, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
    }
        
}





