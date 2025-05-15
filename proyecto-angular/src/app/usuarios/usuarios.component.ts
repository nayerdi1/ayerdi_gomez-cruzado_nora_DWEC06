import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.services';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{
  // Guarda los usuarios devueltos directamente por la API
  public usuariosEncontrados : any;
  // Lista de objetos de tipo Usuario que se mostrarán en la vista
  public listaUsuarios : Array<Usuario> = [];
  // Página actual del paginador (inicialmente la 1)
  public paginaActual: number;

  // Constructor: inyecta el servicio de usuarios y la ruta activa
  constructor( 
    private _usuariosService : UsuariosService,
    private route: ActivatedRoute
  ){
    this.paginaActual = 1;
  }

  // Cuando se inicializa el componente
  ngOnInit(){
    this.cargarPagina(this.paginaActual);
  }

  /**
   * Transforma los datos crudos recibidos desde la API en instancias
   * del modelo Usuario y los añade al array listaUsuarios.
   */
  guardarUsuarios(){
    for (let usuario of this.usuariosEncontrados){
      this.listaUsuarios.push(
        new Usuario(
          usuario.login.username, 
          usuario.name.first, 
          usuario.name.last, 
          usuario.dob.age, 
          usuario.email, 
          usuario.registered.date
        ));
    }
  }

   /**
   * Cambia de página y recarga la lista de usuarios correspondiente.
   * Limpia la lista anterior antes de añadir los nuevos usuarios.
   */
  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.listaUsuarios = [];
    this.cargarPagina(this.paginaActual);
    console.log('Página actual:', this.paginaActual);
  }

  /**
   * Llama al servicio para obtener los usuarios de la página indicada
   * y guarda los datos recibidos en la lista de usuarios.
   */
  cargarPagina(pagina : number){
    this._usuariosService.getUsuarios(pagina).subscribe({
      next: respuesta => {
          this.usuariosEncontrados = respuesta.results; 
          console.log('Respuesta:', this.usuariosEncontrados);
          this.guardarUsuarios();
          console.log(this.listaUsuarios);
        },
        error: (error) => {
          console.error('Error al obtener usuarios:', error);
        }
    })
  }

}
