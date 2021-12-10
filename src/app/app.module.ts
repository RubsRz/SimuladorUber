import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { ViajesComponent } from './Components/viajes/viajes.component';
import { MapaComponent } from './Components/mapa/mapa.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'

import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViajesComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase_config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
