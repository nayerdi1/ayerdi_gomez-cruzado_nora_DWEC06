import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReservasComponent } from './reservas/reservas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ReservasComponent,
    UsuariosComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [
    appRoutingProviders,
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
