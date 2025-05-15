//modulos generales de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { Route } from '@angular/router';

//componentes creados
import  { InicioComponent } from './inicio/inicio.component';
import  { UsuariosComponent } from './usuarios/usuarios.component';
import { ReservasComponent } from './reservas/reservas.component';


//variable donde se guardan las rutas
const appRoutes : Routes = [
    {path: "", component: InicioComponent},
    {path: "usuarios", component: UsuariosComponent},
    {path: "reservas", component: ReservasComponent}
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);