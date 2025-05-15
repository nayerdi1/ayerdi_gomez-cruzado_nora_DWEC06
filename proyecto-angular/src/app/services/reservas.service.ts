import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Reserva } from '../models/Reserva';


@Injectable({
  providedIn: 'root' // Hace que este servicio esté disponible globalmente
})
export class ReservasService {
  
  private apiUrl : string = "";

  // Inyectamos el cliente HTTP de Angular
  constructor(public _http: HttpClient) {
  }

  /**
   * GET: Recupera todas las reservas desde la API
   * Retorna un Observable que emitirá los datos al suscribirse
   */
  getReservas(): Observable<any> {
    
    this.apiUrl = `https://6822379db342dce8004d88ac.mockapi.io/api/reservas/reservas` ;

    return this._http.get(this.apiUrl);
    
  }

  /**
   * GET: Recupera una reserva específica por su ID
   */
  getReserva(id : number): Observable<any> {
    this.apiUrl = `https://6822379db342dce8004d88ac.mockapi.io/api/reservas/reservas/${id}`;
    return this._http.get(this.apiUrl);
  }

  /**
  * POST: Crea una nueva reserva en la base de datos  
   */
  postReserva(reserva : Reserva): Observable<any>{
    this.apiUrl = `https://6822379db342dce8004d88ac.mockapi.io/api/reservas/reservas`;
    return this._http.post(this.apiUrl, reserva);
  }

    /**
   * PUT: Actualiza una reserva existente
   */
  updateReserva(id : number, reserva : Reserva): Observable<any>{
    this.apiUrl = `https://6822379db342dce8004d88ac.mockapi.io/api/reservas/reservas/${id}`;
  
    return this._http.put(this.apiUrl, reserva);
  }

   /**
   * DELETE: Elimina una reserva según su ID
   */
  deleteReserva(id : number): Observable<any>{
    this.apiUrl = `https://6822379db342dce8004d88ac.mockapi.io/api/reservas/reservas/${id}`;
    return this._http.delete(this.apiUrl);
  }
  

    
  
}