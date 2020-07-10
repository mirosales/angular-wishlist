import { DestinoViaje } from './destino-viaje.model';
import { Subject, BehaviorSubject } from 'rxjs';
//Esto sera un servicio
export class DestinosApiClient{
    destinos:DestinoViaje[];
    current:Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);
    constructor(){
        this.destinos = [];
    }
    add(destino:DestinoViaje){
        this.destinos.push(destino);
    }
    getAll(){
        return this.destinos;
    }
    elegir(d:DestinoViaje){
        this.destinos.forEach(element => {
            element.setSelect(false);
        });
        d.setSelect(true);
        this.current.next(d);
    }
    subscribeOnChange(fn){
        this.current.subscribe(fn);
    }
}