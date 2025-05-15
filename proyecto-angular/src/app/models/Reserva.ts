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
      //  this.fecha = this.aniadirFecha();
      //  this.hora = this.generarHoraAleatoria(); //añadir hora
    }
    

    aniadirFecha() : Date{
        const inicio = new Date(2025, 4, 16); 
        const fin = new Date(2025, 4, 30); 
        let fechaGenerada = this.fechaAleatoria(inicio, fin);
        const fechaFormateada = fechaGenerada.toISOString().split('T')[0];
        return new Date(fechaFormateada);
    }

    fechaAleatoria(start: Date, end: Date): Date {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    generarHoraAleatoria(): string {
        // Hora entre las 9:00 (inclusive) y las 21:00 (inclusive)
        const hora = Math.floor(Math.random() * (21 - 9 + 1)) + 9;

        // Siempre 00 minutos
        const horaFormateada = `${hora.toString().padStart(2, '0')}:00`;

        return horaFormateada;
        }


}