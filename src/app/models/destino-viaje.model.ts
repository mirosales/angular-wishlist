export class DestinoViaje {
    nombre:string;
    imagenUrl:string;
    public servicios:string[];
    private selected:boolean;
    
    constructor(nombre:string, imagenUrl:string){
        this.nombre = nombre;
        this.imagenUrl = imagenUrl; 
        this.servicios = ['pileta', 'desayuno'];
    }
    isSelected():boolean{
        return this.selected;
    }
    setSelect(selected: boolean){
        this.selected= selected;
    }
}
