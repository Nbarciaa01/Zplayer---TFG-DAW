import { Component } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-comunidades',
    templateUrl: './comunidades.component.html',
    styleUrl: './comunidades.component.css',
})
export class ComunidadesComponent {

  constructor(private localSvc: LocalService, private route: Router){
    if(!this.localSvc.recuperarDatosUsuario()){
      this.route.navigate(['../login']);
    }

  }

 }
