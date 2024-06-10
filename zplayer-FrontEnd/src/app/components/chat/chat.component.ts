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

  usersFind: any[] = []
  usuariosRandom:any[] = []

  constructor(private route:Router, private localSvc: LocalService, private restSvc: RestService) {
    this.recuperarDatosUsuarios()
    this.recuperarUsuariosChateados()
    this.cargarUsuarios()

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

  devolverLogo(logo: string){
    return this.restSvc.getProfilePictureUrl(logo);
  }
  async cargarUsuarios(){
    this.usersFind = await this.restSvc.getUsersForFollow(this.id)
    this.usuariosRandom = this.getUsuariosRandom(this.usersFind)
    console.log(this.usuariosRandom)
  }

  // USUARIOS RANDOM
  getUsuariosRandom(arr: any[]): any[] {
    if (arr.length <= 2) {
      return arr;
    }

    let randomIndices:any = [];
    while (randomIndices.length < 2) {
      let randomIndex = Math.floor(Math.random() * arr.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    return arr.filter((_, index) => randomIndices.includes(index));
}

async followUser(followed_user:string){
  await this.restSvc.followUser(this.id, followed_user)

  this.cargarUsuarios()
}

viewUserProfile(userId: string|number): void {
  if(userId == this.id){
    this.route.navigate(['../perfil']);
  }
  else{
    this.route.navigate(['../perfil/user', userId]);
  }

}

}
