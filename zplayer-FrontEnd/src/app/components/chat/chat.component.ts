import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
  faEnvelope = faEnvelope;
  faArrowRight=faArrowRight
  mostrarAmigos = false;

  id: string | number = "";
  siguiendo:number[] = []
  conjuntoSiguiendo: any[] =  []

  usuariosNuevosChatting: any[] =  []

  usuariosChatting: any[] = []

  constructor(private route:Router, private localSvc: LocalService, private restSvc: RestService) {
    this.recuperarDatosUsuarios()
    this.recuperarUsuariosChateados()

  }

  async recuperarDatosUsuarios(){
    let usuarioLocal: User = this.localSvc.recuperarDatosUsuario();
    this.id = usuarioLocal.id!;

    let usuario: User = await this.restSvc.getDatosUser(this.id)
    this.siguiendo = usuario.siguiendo

    this.recuperarUsuariosSeguidos()
    this.recuperarUsuariosNuevosChatting()
  }

  async recuperarUsuariosSeguidos(){
    this.siguiendo.forEach(async userID => {
      console.log(userID)
      let usuarioSiguiendo: User = await this.restSvc.getDatosUser(userID)
      this.conjuntoSiguiendo.push(usuarioSiguiendo)
    })
  }


  mostrarAmigosButton(valor: boolean){
    this.mostrarAmigos = valor;
  }

  privateChat(sender_id:number|string, receiver_id: number|string){

    this.route.navigate(['../chat'], { state: { sender_id: sender_id, receiver_id: receiver_id} });

  }

  async recuperarUsuariosChateados(){
    this.usuariosChatting = await this.restSvc.getMdsUsers(this.id)
  }

  async recuperarUsuariosNuevosChatting(){
    setTimeout(() => {
      this.usuariosNuevosChatting = this.conjuntoSiguiendo.filter(usuarioSiguiendo=>!this.usuariosChatting.some(userChatting => userChatting._id === usuarioSiguiendo._id))
    }, 100);
  }

}
