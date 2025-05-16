export class Reserva{
    public id : number;
    public nombre : String = "";
    public apellido : String = "";
    public email : String = "";
    public pista : number;
    public fecha : Date;
    public hora : string;
    

    constructor(
        id : number,
        nombre : string, 
        apellido : string,  
        email: string,
        pista : number,
        fecha : Date,
        hora : string 
    ){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.pista = pista;
        this.fecha = fecha,
        this.hora = hora 
    }
    

}