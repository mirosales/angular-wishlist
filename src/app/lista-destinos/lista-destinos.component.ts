import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinosApiClient } from '../models/destinos-api-client.model';
@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
    
    @Output() onItemAdded: EventEmitter<DestinoViaje>;
    updates:String[];
    //destinos:DestinoViaje[];
    constructor(private destinosApiClient: DestinosApiClient) {
      //this.destinos = [];
      this.updates = [];
      this.onItemAdded = new EventEmitter();
      this.destinosApiClient.subscribeOnChange((d:DestinoViaje) => {
        if(d!= null){
          this.updates.push('Se ha elegido a '+ d.nombre);
        }
      })
    }

    ngOnInit(): void {
    }
 
    getdestinosApiClient():DestinosApiClient{
      return this.destinosApiClient;
    }

    /*metodo que se usa en formularios no interactivos*/
    guardar(nombre:string, url:string):boolean{
      console.log(nombre);
      console.log(url);
      console.log(new DestinoViaje(nombre, url));

      /*Linea a usar cuando no se utiliza un servicio*/
      //this.destinos.push(new DestinoViaje(nombre, url)); 

      this.destinosApiClient.add(new DestinoViaje(nombre, url));
      return false;
    }

    /*metodo que se usa en formularios interactivos*/
    agregado(destino:DestinoViaje){
      this.destinosApiClient.add(destino);
      /*Emitamos un evento al componente padre*/
      this.onItemAdded.emit(destino);

    }

    /*metodo que se usa para conocer que destino-viaje es preferido por parte
    del usuario*/
    elegido(destino: DestinoViaje){

      /*Linea a usar cuando no se utiliza un servicio*/
      // this.destinos.forEach(function(x) {
      //   x.setSelect(false);
      //   console.log(x);})

      //Consume el servicio DestinosApiClient
      this.destinosApiClient.elegir(destino);
     

    }

}
