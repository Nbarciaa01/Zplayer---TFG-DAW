import {Component } from '@angular/core';
import { Router } from '@angular/router';

import { faHouse, faEnvelope, faUsers, faUser, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { LocalService } from '../../../services/local.service';
import { User } from '../../../infraestructure/models/user';
import { RestService } from '../../../services/rest.service';


@Component({
    selector: 'Zplayer-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  //DATOS DE USUARIO
  public username: string = '';
  public realname: string = '';
  public logo: string = '';


  faHouse = faHouse;
  faEnvelope = faEnvelope;
  faUsers = faUsers;
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;
  faUserPlus = faUserPlus;

  constructor(private route:Router, private localSvc: LocalService, private restSvc: RestService) {
    this.recuperarDatosUsuarios()
  }



  async recuperarDatosUsuarios(){
    let usuarioLocal: User = this.localSvc.recuperarDatosUsuario();


    let usuario: User = await this.restSvc.getDatosUser(usuarioLocal.id!)
    this.username = usuario.username;
    this.realname = usuario.realname;
    this.logo = this.restSvc.getProfilePictureUrl(usuario.logo);;

  }

  cerrarSesion(){
    localStorage.clear()
    sessionStorage.clear()
    this.route.navigate(["/login"])
  }

}
