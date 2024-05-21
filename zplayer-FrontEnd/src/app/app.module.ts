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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FondoComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    PerfilComponent,
    ComunidadesComponent
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
