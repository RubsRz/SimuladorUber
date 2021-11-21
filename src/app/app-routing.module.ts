import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MapaComponent } from './Components/mapa/mapa.component';
import { ViajesComponent } from './Components/viajes/viajes.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'mapa', component: MapaComponent},
  { path: 'viajes', component: ViajesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
