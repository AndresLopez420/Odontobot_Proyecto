import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteVirtualService {
  url = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }

    add(data:any){
      return this.httpClient.post(this.url+
        "/paciente/addpaciente/",data,{
          headers: new HttpHeaders().set('Content-Type','application/json')
        })
    }
    getIntancias(){
      return this.httpClient.get(this.url+"/paciente/addpaciente/");
    }

}