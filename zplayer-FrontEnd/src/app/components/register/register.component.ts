
import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'Zplayer-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',

})
export class RegisterComponent {
  juegos = new FormControl('');
  juegosList: string[] = [
    'RPG',
    'Shooter',
    'MMORPG',
    'Battle Royale',
    'Estrategia',
    'MOBA',
    'Survivals',
    'Deportes'
  ];

  //DATOS DEL USUARIO AL REGISTRARSE
  public name: string = "";
  public username: string = "";
  public correo: string = "";
  public contraseña: string = "";
  public contraseñaConfirm = "";
  public comunidades = [];



 }
