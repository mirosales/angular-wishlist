import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import {FormGroup, FormBuilder, Validators, FormControl, ValidatorFn} from '@angular/forms';
import {map, filter, debounceTime,distinctUntilChanged, switchMap} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  formGroup:FormGroup;
  minLongitud:number;
  searchResults:string[];
  constructor(formBuilder: FormBuilder) { 
    this.minLongitud= 3;
    this.onItemAdded = new EventEmitter();
    this.formGroup = formBuilder.group({
      nombre:['', Validators.compose([Validators.required, this.nombreValidator,
      this.nombreValidatorParametrizable(4)]) ],
      url:['',Validators.required]
    });

    this.formGroup.valueChanges.subscribe(
      (form: any) => {
        console.log('form cambió:'+ form);
      });
  }

 
  guardar(nombre:string, url:string):boolean{
    const destino = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(destino);
    return false;
  }

  nombreValidator(control:FormControl): {[s: string]:boolean} {
    var cadena:string = control.value.toString();
    var longitud:number = cadena.trim().length;
    //console.log(this.minLongitud);
    
    if(longitud > 0 && longitud < 3){
      console.log('entreeeeeeeee');
      return {minLongNombre:true};
    }
 
    return null;
  }

  nombreValidatorParametrizable(minLong: number):ValidatorFn{
    return (control:FormControl):{[s:string]:boolean} | null =>{
      var longitud:number = control.value.toString().trim().length;
      if(longitud > 0 && longitud < minLong){
        console.log('entreeeeeeeee');
        return {minLongNombre:true};
      }
      return null;
    }
  }

  ngOnInit(): void {
    let elementoNombre = <HTMLInputElement> document.getElementById('nombre');
    fromEvent(elementoNombre, 'input')
    .pipe(map((e:KeyboardEvent) => (e.target as HTMLInputElement).value),
    filter(text => text.length>3),
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(() =>ajax('/assets/datos.json')))
    .subscribe(ajaxResponse =>{
      console.log('ajax response-->', ajaxResponse  );
     this.searchResults= ajaxResponse.response
     .filter(function(x){
      return x.toLowerCase().includes(elementoNombre.value.toLowerCase());
    })
    
  });

}
}
