import { DestinoViaje } from './destino-viaje.model';
//Esto sera un servicio
export class DestinosApiClient{
    destinos:DestinoViaje[];
    constructor(){
        this.destinos = [];
    }
    add(destino:DestinoViaje){
        this.destinos.push(destino);
    }
    getAll(){
        return this.destinos;
    }
}