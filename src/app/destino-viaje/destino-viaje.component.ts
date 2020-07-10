import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino:DestinoViaje;
  @Input() posicion:number;
  @HostBinding('attr.class') ccsClass = 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;
  //lugares:string[];
  constructor() { 
    //this.nombre = '';
    //this.lugares = ["Hospedaje", "Parques recreacionales", "Restaurantes destacados"];
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {
  }
  
  ir(){
    this.clicked.emit(this.destino);
    return false;
  }

}
