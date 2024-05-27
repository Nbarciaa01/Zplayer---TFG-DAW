
import { Component } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-descubrir',
    templateUrl: './descubrir.component.html',
    styleUrl: './descubrir.component.css',
})
export class DescubrirComponent {
  public usersFind: any[] = []

  constructor(private route:Router, private restSvc: RestService) {
    this.cargarUsuarios()
  }

  async cargarUsuarios(){
    this.usersFind = await this.restSvc.getUsersForFollow()
    console.log(this.usersFind)
  }

  viewUserProfile(userId: string): void {
    this.route.navigate(['../perfil/user', userId]);
  }

}
