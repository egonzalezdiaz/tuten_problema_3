import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { ListaService } from './lista.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [ListaService]
})
export class ListaComponent implements OnInit{
  
  private listaCompleta = [];
  private listaFiltrada = []; //esta lista se muestra en template
  private campoFiltro : string = "bookingId";
  private tipoFiltro : string = "like";
  private valorFiltro : string = "";
  private parametros : any; 

  constructor(
    private listado : ListaService,
    private route: ActivatedRoute
  ) {
    
    this.parametros = {
      "usuario" : this.route.snapshot.paramMap.get("usuario"),
      "aplicacion" : this.route.snapshot.paramMap.get("aplicacion"),
      "token" : this.route.snapshot.paramMap.get("token"),
    }
    
  } 
  
  ngOnInit(){
    //obtiene el listado de bookings

    this.listado.obtener(this.parametros)
      .then((resultado) => {
        if (resultado){
          
          //funcion para mejorar aspecto fecha de creacion
          let ceroIzquierda = (valor:number) => valor < 10 ? "0"+valor: valor;
          //recorre cada fila para preparar la lista 
          let listado = []
          
          for (let fila of resultado){
            //el campo bookingFields en realidad es un string 
            let bookingFields = JSON.parse(fila["bookingFields"]);
            
            //procede a representar el timestamp en formato de fecha legible
            let bookingTime = new Date(fila["bookingTime"]);
            
            
            let fechaCreacion = ceroIzquierda(bookingTime.getDate()) + '/' + 
                                ceroIzquierda(bookingTime.getMonth()+1) + '/' + 
                                bookingTime.getFullYear();
                                
            //prepara la lista completa para desplegar en template
            listado.push({
              "bookingId" : fila["bookingId"],
              "cliente" : bookingFields["firstName"] + " " + bookingFields["lastName"],
              "fechaCreacion" : fechaCreacion,
              "direccion" : bookingFields["location"]["streetAddress"],
              "precio" : fila["bookingPrice"]
            });
          }
          //asigna listado a variable de template
          this.listaCompleta = listado;
          this.listaFiltrada = listado;
        }
      });
  }
  
  filtrar(){
    
    let listado = [];
    
    //si no hay valor, entonces muestra toda la lista 
    if (this.valorFiltro.trim() == ""){
      this.listaFiltrada = this.listaCompleta;
      return;
    }
    
    for (let fila of this.listaCompleta){
      let valorFiltrar = fila[this.campoFiltro];
      
      if (this.tipoFiltro == "like" && (""+valorFiltrar+"").indexOf(this.valorFiltro) >= 0){
        //filtra bookingId por contener valor 
        listado.push(fila);
      } else if (this.tipoFiltro == "gt" && valorFiltrar >= parseInt(this.valorFiltro)){
        //filtra bookingPrice por mayor o igual valor
        listado.push(fila);
      } else if (this.tipoFiltro == "lt" && valorFiltrar <= parseInt(this.valorFiltro)){
        //filtra bookingPrice por menor o igual valor
        listado.push(fila)
      }
    }
    this.listaFiltrada = listado;
  }
  
  seleccionCampoFiltro(campo:string){
    this.campoFiltro = campo;
  }
  
  seleccionTipoFiltro(filtro:string){
    this.tipoFiltro = filtro;
  }
  
  ingresaValorFiltro(valor:string){
    this.valorFiltro = valor;
  }
}