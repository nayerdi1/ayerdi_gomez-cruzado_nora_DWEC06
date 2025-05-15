export class Usuario{
    public id : String;
    public nombre : String = "";
    public apellido : String = "";
    public edad : number = 0;
    public email : String = "";
    public fecha_registro : Date;


    constructor(
        id : string,
        nombre : string, 
        apellido : string, 
        edad : number, 
        email: string,
        fecha_registro : string
    ){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.fecha_registro = this.formatearFecha(fecha_registro);
    }

    formatearFecha(fechaTexto : string){
        const soloFecha = fechaTexto.split('T')[0]; // "2010-11-22"
        return new Date(soloFecha); // new Date("2010-11-22") genera objeto sin hora
        
    }
}