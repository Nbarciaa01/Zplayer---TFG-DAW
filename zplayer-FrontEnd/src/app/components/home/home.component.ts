
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { User } from '../../infraestructure/models/user';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'zplayer-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
  contenido: string = '';

  constructor(private route:Router, private localSvc: LocalService) {
    this.recuperarDatosUsuarios()
    console.log(this.logo)
  }

  //DATOS DE USUARIO
  public username: string = '';
  public realname: string = '';
  public logo: string = '';
  faMagnifyingGlass = faMagnifyingGlass;

  ajustarAltura() {
    const textarea = document.getElementById('mensaje');
    textarea!.style.height = 'auto'; // Restablecer la altura a 'auto' para evitar el desbordamiento
    textarea!.style.height = textarea!.scrollHeight + 'px'; // Ajustar la altura según el contenido
  }

  recuperarDatosUsuarios(){
    let usuario: User = this.localSvc.recuperarDatosUsuario();

    this.username = usuario.username;
    this.realname = usuario.realname;
    this.logo = usuario.logo;

  }
}
