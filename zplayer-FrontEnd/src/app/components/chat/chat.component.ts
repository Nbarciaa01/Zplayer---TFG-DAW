import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LocalService } from '../../services/local.service';
import { RestService } from '../../services/rest.service';
import { User } from '../../infraestructure/models/user';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css',
})
export class ChatComponent {
  faPlus = faPlus;
  mostrarAmigos = false;

  id: string | number = "";
  siguiendo:number[] = []
  conjuntoSiguiendo: User[] =  []

  constructor(private route:Router, private localSvc: LocalService, private restSvc: RestService) {
    this.recuperarDatosUsuarios()


  }

  async recuperarDatosUsuarios(){
    let usuarioLocal: User = this.localSvc.recuperarDatosUsuario();
    this.id = usuarioLocal.id!;

    let usuario: User = await this.restSvc.getDatosUser(this.id)
    this.siguiendo = usuario.siguiendo

    this.recuperarUsuariosSeguidos()

  }

  async recuperarUsuariosSeguidos(){
    this.siguiendo.forEach(async userID => {
      let usuarioSiguiendo: User = await this.restSvc.getDatosUser(userID)
      this.conjuntoSiguiendo.push(usuarioSiguiendo)
    })
  }


  mostrarAmigosButton(valor: boolean){
    this.mostrarAmigos = valor;
  }

  privateChat(recibidor_id:number|string, enviador_id: number|string){

  }
}
