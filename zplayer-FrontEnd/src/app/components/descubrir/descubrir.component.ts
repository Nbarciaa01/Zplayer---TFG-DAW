
import { Component } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';
import { User } from '../../infraestructure/models/user';
import { LocalService } from '../../services/local.service';

@Component({
    selector: 'app-descubrir',
    templateUrl: './descubrir.component.html',
    styleUrl: './descubrir.component.css',
})
export class DescubrirComponent {
  public usersFind: any[] = []
  public id: number = 0;

  constructor(private route:Router, private restSvc: RestService, private localSvc: LocalService) {
    this.recuperarDatosUsuarios();
    this.cargarUsuarios()
  }

  async cargarUsuarios(){
    this.usersFind = await this.restSvc.getUsersForFollow(this.id)
  }

  recuperarDatosUsuarios(){
    let usuario: User = this.localSvc.recuperarDatosUsuario();

    this.id = usuario.id!;

  }


  viewUserProfile(userId: string): void {
    this.route.navigate(['../perfil/user', userId]);
  }

  async followUser(followed_user:string){
    await this.restSvc.followUser(this.id, followed_user)
  }

}
