import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
    destinos:DestinoViaje[];
    constructor() {
      this.destinos = [];
    }

    ngOnInit(): void {
    }
    agregado(){
      
    }
    guardar(nombre:string, url:string):boolean{
      console.log(nombre);
      console.log(url);
      console.log(new DestinoViaje(nombre, url));
      this.destinos.push(new DestinoViaje(nombre, url));
      return false;
    }
    elegido(destino: DestinoViaje){
      this.destinos.forEach(function(x) {
        x.setSelect(false);
        console.log(x);})
      destino.setSelect(true);

    }

}
