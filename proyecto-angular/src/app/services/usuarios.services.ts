import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root' // Hace que este servicio esté disponible globalmente
})
export class UsuariosService {

  private apiUrl : string = "";

  constructor(public _http: HttpClient) {
    
  }

  /**
   * GET: Obtiene usuarios desde la API randomuser.me
   * - `results=40`: solicita 40 usuarios por página
   * - `seed=abc`: asegura que siempre se obtengan los mismos usuarios si se repite la misma página
   * - `nat=ES`: limita los resultados a usuarios con nacionalidad española
   */
  getUsuarios(pagina : number): Observable<any> {
    // result para devolver 40 usuarios, seed para devolver siempre los mismos
    this.apiUrl = `https://randomuser.me/api/?nat=ES&page=${pagina}&results=40&seed=abc` ;
    return this._http.get(this.apiUrl);
    
  }

    
  
}