import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinosApiClient } from '../models/destinos-api-client.model';
@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
    //destinos:DestinoViaje[];
    constructor(private destinosApiClient: DestinosApiClient) {
      //this.destinos = [];
    }

    ngOnInit(): void {
    }
    agregado(){
      
    }
    getdestinosApiClient():DestinosApiClient{
      return this.destinosApiClient;
    }
    guardar(nombre:string, url:string):boolean{
      console.log(nombre);
      console.log(url);
      console.log(new DestinoViaje(nombre, url));
      //this.destinos.push(new DestinoViaje(nombre, url));
      this.destinosApiClient.add(new DestinoViaje(nombre, url));
      return false;
    }
    elegido(destino: DestinoViaje){
      // this.destinos.forEach(function(x) {
      //   x.setSelect(false);
      //   console.log(x);})
      this.destinosApiClient.getAll().forEach(function(x) {
        x.setSelect(false);
        console.log(x);})
      destino.setSelect(true);

    }

}
