
import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { LocalService } from '../../services/local.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'Zplayer-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',

})
export class RegisterComponent {

  public formRegister:FormGroup;
  public correcto:boolean;
  public bloqueado:boolean;
  public errorPasswords: boolean = false;

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

  constructor(private route:Router, private restSvc: RestService, private localSvc: LocalService,private notis:ToastrService ) {
    this.formRegister=new FormGroup(
      {
        realname:new FormControl('',[ Validators.required]),
        username: new FormControl('',[Validators.required]),
        correo: new FormControl('',[ Validators.required, Validators.email]),
        contraseña: new FormControl('',[ Validators.required,Validators.minLength(7)]),
        contraseñaConfirm: new FormControl('',[ Validators.required, Validators.minLength(7)]),
        comunidades: new FormControl([])
      },

    )
    this.correcto=true;
    this.bloqueado=false;
  }

  async comprobarValores(){
    if(this.formRegister.valid){
      if(this.formRegister.controls['contraseñaConfirm'].value === this.formRegister.controls['contraseña'].value ){

        try{
          let respuesta = await this.restSvc.registerUsuario(this.formRegister.controls['realname'].value,
            this.formRegister.controls['correo'].value,
            this.formRegister.controls['contraseña'].value,
            this.formRegister.controls['username'].value,
            this.formRegister.controls['comunidades'].value)

          if(respuesta){
            this.notis.success('Usuario creado con éxito', 'Crear Usuario',{positionClass:"toast-bottom-right",toastClass:"ngx-toastr bg-[#166534]"});
            this.route.navigate(["/login"])
          }
        }
        catch(error: any){
          window.alert(error.error.message)
        }

      }
      else{
        this.errorPasswords=true;
      }
    }
    else{
      window.alert("Rellena todos los campos adecuadamente")
    }
  }


 }
