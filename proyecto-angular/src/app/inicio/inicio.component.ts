/*import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js'; // Importa Chart.js

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements AfterViewInit {

  
  // Función para crear el gráfico
  crearGrafico() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    
    // Verifica que ctx no sea null
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Usuarios Registrados', 'Reservas Hoy', 'Pistas Disponibles'],
          datasets: [{
            label: 'Estadísticas',
            data: [245, 32, 5],
            backgroundColor: ['#007bff', '#28a745', '#ffc107'],
            borderColor: ['#0056b3', '#218838', '#e0a800'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('No se pudo obtener el contexto del canvas');
    }
  }

  // Llama a la función para crear el gráfico después de que la vista se haya inicializado
  ngAfterViewInit() {
    this.crearGrafico(); 
  }
} */
import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  // Puedes mantener datos para mostrar si quieres
  usuariosRegistrados = 120;
  reservasHoy = 20;
  pistasDisponibles = 5;
}