import { Injectable } from '@angular/core';
import { LoginModel } from './login.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class LoginService {
  
  //url destino de la consulta 
  private URL = "http://localhost:3000/login";
  
  constructor(private http: HttpClient) {}

  login(login: LoginModel): Promise<boolean> {
    /*
      Devolución de una promesa con el resultado
      del logueo
    */
    return new Promise((resolver,reject) => {
      
      //asignacion de parametros para la consulta
      let parametros = new HttpParams()
        .set("usuario",login.usuario)
        .set("password",login.password)
        .set("aplicacion",login.aplicacion);
      
      let opciones = {
        params : parametros
      }
      
      //llamada a la url del proxy
      return this.http.get(this.URL,opciones)
        .subscribe((data: any) => { 
          //retorna true si status retornado por el proxy
          //es 200
          if (data["status"] == 200){
            resolver(data);
          }else{
            resolver(false);
          }
      });            
    })
  }
}
