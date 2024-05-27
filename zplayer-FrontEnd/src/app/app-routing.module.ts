import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
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

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'home', component: HomeComponent,
    title: 'Zplayer - Inicio'
  },
  {
    path: 'perfil', component: PerfilComponent,
    title: 'Zplayer - Perfil'
  },
  {
    path: 'comunidades', component: ComunidadesComponent,
    title: 'Zplayer - Comunidades',
  },
  {
    path: 'comunidades/survival', component: SurvivalComponent,
    title: 'Zplayer - Comunidad Survival'
  },
  {
    path: 'comunidades/mmorpg', component: MmorpgComponent,
    title: 'Zplayer - Comunidad MMORPG'
  },
  {
    path: 'comunidades/moba', component: MobaComponent,
    title: 'Zplayer - Comunidad MOBA'
  },
  {
    path: 'comunidades/rpg', component: RpgComponent,
    title: 'Zplayer - Comunidad RPG'
  },
  {
    path: 'comunidades/shooter', component: ShooterComponent,
    title: 'Zplayer - Comunidad Shooter'
  },
  {
    path: 'comunidades/deportes', component: DeportesComponent,
    title: 'Zplayer - Comunidad Deportes'
  },
  {
    path: 'comunidades/estrategia', component: EstrategiaComponent,
    title: 'Zplayer - Comunidad Deportes'
  },
  {
    path: 'comunidades/battleroyale', component: BattleroyaleComponent,
    title: 'Zplayer - Comunidad Deportes'
  },
  {
    path: 'descubrir', component: DescubrirComponent,
    title: 'Zplayer - Descubrir'
  },
  {
    path: 'perfil/user/:userId', component: PerfilUsuarioComponent,
    title: 'Zplayer - Perfil User'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
