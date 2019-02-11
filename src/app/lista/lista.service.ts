import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ListaService {
  
  //url destino de la consulta 
  private URL = "http://localhost:3000/lista";
  
  constructor(private http: HttpClient) {}

  obtener(parametros:any): Promise<boolean> {
    /*
      Devolución de una promesa con el resultado
      del logueo
    */
    
    //parametros para el proxy
    let parametros = new HttpParams()
      .set("usuario",parametros["usuario"])
      .set("aplicacion", parametros["aplicacion"])
      .set("token", parametros["token"]);
    
    return new Promise((resolver,reject) => {
      
      //llamada a la url del proxy
      return this.http.get(this.URL,{params:parametros})
        .subscribe((data: any) => { 
          //retorna true si status retornado por el proxy
          //es 200, en caso contrario el login falló
          resolver(data["listado"]);
      });            
    })
  }
}
