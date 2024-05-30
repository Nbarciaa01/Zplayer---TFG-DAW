import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FondoComponent } from './components/login/partials/fondo-login.component';
import {HomeComponent} from './components/home/home.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ComunidadesComponent } from './components/comunidades/comunidades.component';
import { SurvivalComponent } from './components/comunidades/survival/survival.component';
import { MmorpgComponent } from './components/comunidades/mmorpg/mmorpg.component';
import { MobaComponent } from './components/comunidades/moba/moba.component';
import { RpgComponent } from './components/comunidades/rpg/rpg.component';
import { ShooterComponent } from './components/comunidades/shooter/shooter.component';
import { DeportesComponent } from './components/comunidades/deportes/deportes.component';
import { EstrategiaComponent } from './components/comunidades/estrategia/estrategia.component';
import { BattleroyaleComponent } from './components/comunidades/battleroyale/battleroyale.component';
import { DescubrirComponent } from './components/descubrir/descubrir.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { ChatComponent } from './components/chat/chat.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FondoComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    PerfilComponent,
    ComunidadesComponent,
    SurvivalComponent,
    MmorpgComponent,
    MobaComponent,
    RpgComponent,
    ShooterComponent,
    DeportesComponent,
    EstrategiaComponent,
    BattleroyaleComponent,
    DescubrirComponent,
    PerfilUsuarioComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    MbscModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxChartsModule,
    MbscModule,
    HttpClientModule,
    HttpClientJsonpModule,MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FontAwesomeModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule { }
