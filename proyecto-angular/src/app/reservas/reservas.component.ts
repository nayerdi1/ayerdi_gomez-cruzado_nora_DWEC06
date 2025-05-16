import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../services/reservas.service';
import { Reserva } from '../models/Reserva';
import Chart from 'chart.js/auto'; // Importa Chart.js

@Component({
  selector: 'app-reservas',
  standalone: false,
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit{
 
  public reservasEncontradas : Array<any> = [];
  public listaReservas : Array<Reserva> = [];
  public reservaSelec : Reserva = new Reserva(0, "", "", "", 0, new Date(), "");
  public cambiarReserva : Reserva = new Reserva(0, "", "", "", 0, new Date(), "");
  public mostrarReserva : boolean = false;
  public modoEdicion: boolean = false;
  public cambios : 'update' | 'post' = 'post';

  constructor(private _reservasService : ReservasService) {}

  // Se ejecuta al iniciar el componente: carga todas las reservas
  ngOnInit(): void {
    // Obtiene todas las reservas del backend
      this._reservasService.getReservas().subscribe({
        next: respuesta => {
            this.reservasEncontradas = respuesta; // Aquí ya tienes los datos reales
            console.log('Respuesta:', this.reservasEncontradas);
           this.guardarReservas();
           console.log(this.listaReservas);
        },
        error: (error) => {
          console.error('Error al obtener reservas:', error);
        }
      })
  }

  // Transforma los datos recibidos en objetos de tipo Reserva
  guardarReservas(){
    for (let reserva of this.reservasEncontradas){
      this.listaReservas.push(new Reserva(reserva.id, reserva.nombre, reserva.apellido, 
        reserva.email, reserva.pista, reserva.fecha, reserva.hora)
      );
    }
     this.crearGraficoReservasPorDia(); // llama al gráfico
  }

  // Muestra detalles de la reserva seleccionada (sin modo edición)
  verReserva(reserva : Reserva){
    this.devolverReserva(reserva.id);
    this.modoEdicion = false;
  }

  // Vuelve a la lista general ocultando la vista de detalles
  volverLista() {
    this.mostrarReserva = false; 
  }

  // Prepara el componente para agregar una nueva reserva
  agregarReserva(){
    this.cambios = 'post';
    this.mostrarReserva  = true;
    this.modoEdicion = true;
  }

  // Prepara el formulario para editar una reserva existente
  editarReserva(reserva? : Reserva) {
    this.cambios = 'update';
    if(reserva == null){
      reserva = this.reservaSelec;
    }
    this.devolverReserva(reserva.id);
    this.modoEdicion = true;
  }

  // Borra la reserva especificada después de confirmar con el usuario
  borrarReserva(reserva? : Reserva) {
    if(reserva == null){
      reserva = this.reservaSelec;
    }
    this.devolverReserva(reserva.id);
    this.modoEdicion = false;

    const confirmacion = confirm('¿Estás seguro de que quieres eliminar esta reserva?');

    if (confirmacion) {
      this._reservasService.deleteReserva(reserva.id).subscribe({
        next: () => {
          alert('La reserva ha sido eliminada correctamente.');

          // Elimina la reserva localmente de la lista
          this.listaReservas = this.listaReservas.filter(r => r.id !== reserva!.id);

          this.mostrarReserva = false;
          this.modoEdicion = false;
        },
        error: (error) => {
          console.error('Error al eliminar la reserva:', error);
          alert('Error al eliminar la reserva. Inténtalo de nuevo.');
        }
      });
    } else {
      alert(' Operación cancelada. La reserva no se ha eliminado.');
    }
  }

  // Obtiene y carga los datos de una reserva por su ID para mostrarla o editarla
  devolverReserva(id : number){
    this._reservasService.getReserva(id).subscribe({
      next: respuesta => {
        // añade los valores de la reserva seleccionada
        this.reservaSelec.id = respuesta.id;
        this.reservaSelec.nombre = respuesta.nombre;
        this.reservaSelec.apellido = respuesta.apellido;
        this.reservaSelec.email = respuesta.email;
        this.reservaSelec.pista = respuesta.pista;
        this.reservaSelec.fecha = respuesta.fecha;
        this.reservaSelec.hora = respuesta.hora;
        
        this.mostrarReserva = true;
      },
      error: (error) => {
        console.error('Error al obtener reservas:', error);
      }
    })
  }

  // Guarda los cambios realizados ya sea creando o actualizando una reserva
  guardarCambios(){
    if (!this.validarReserva()) {
      return; // Si no pasa la validación, no continúa
    }
    if(this.cambios == "update"){
      this._reservasService.updateReserva(this.reservaSelec.id, this.reservaSelec).subscribe({
        next: respuesta => {
          console.log('Reserva actualizada:', respuesta);

          alert('La reserva se ha modificado correctamente.');
          this.mostrarReserva = false;
          this.modoEdicion = false;
        },
        error: error => {
          console.error('Error al guardar cambios:', error);
        }
      });
    } else {
      this._reservasService.postReserva(this.reservaSelec).subscribe({
        next: respuesta => {
          console.log('Reserva creada:', respuesta);

          alert('La reserva se ha creado correctamente.');
          this.mostrarReserva = false;
          this.modoEdicion = false;
        },
        error: error => {
          console.error('Error al guardar cambios:', error);
        }
      });
    }
  }

  // Valida los datos antes de guardar una reserva
  validarReserva(): boolean {
  const { nombre, apellido, pista, fecha, hora, id } = this.reservaSelec;

  // Validación de campos obligatorios
  if (!nombre.trim() || !apellido.trim()) {
    alert("El nombre y el apellido no pueden estar vacíos.");
    return false;
  }
  // Validación de rango de pista
  if (pista < 1 || pista > 10) {
    alert("La pista debe estar entre el 1 y el 10.");
    return false;
  }

  console.log("Validando conflicto para:");
  console.log("Pista:", pista);
  console.log("Fecha:", fecha);
  console.log("Hora:", hora);
  // Verifica si hay conflicto (misma pista, fecha y hora)
  const conflicto = this.listaReservas.find(r => {
    const fecha1 = new Date(r.fecha);
    const fecha2 = new Date(fecha);

    const mismaFecha =
      fecha1.getFullYear() === fecha2.getFullYear() &&
      fecha1.getMonth() === fecha2.getMonth() &&
      fecha1.getDate() === fecha2.getDate();

    return (
      r.pista === pista &&
      mismaFecha &&
      r.hora.trim() === hora.trim() &&
      r.id !== id
    );
  });

  if (conflicto) {
    alert("Ya existe una reserva en esa pista, fecha y hora.");
    return false;
  }

  return true;
}

  // Método para contar reservas por fecha y devolver datos para gráfico
  getReservasPorDia() {
    const contadorFechas: { [fecha: string]: number } = {};

    for (const reserva of this.listaReservas) {
      const fechaStr = new Date(reserva.fecha).toLocaleDateString(); // formatea la fecha

      if (contadorFechas[fechaStr]) {
        contadorFechas[fechaStr]++;
      } else {
        contadorFechas[fechaStr] = 1;
      }
    }
    // Ordena las fechas cronológicamente
    const fechas = Object.keys(contadorFechas).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const conteos = fechas.map(fecha => contadorFechas[fecha]);

    return { fechas, conteos };
  }
  
  // Después de guardar reservas, crea el gráfico
  crearGraficoReservasPorDia() {
    const { fechas, conteos } = this.getReservasPorDia();

    const canvas = document.getElementById('reservasPorDiaChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: fechas,
          datasets: [{
            label: 'Reservas por día',
            data: conteos,
            backgroundColor: '#007bff'
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1 as unknown as number
              }
            }
          }
        }
      });
    }
  }


}
