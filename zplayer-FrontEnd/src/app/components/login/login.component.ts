
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { Restmessage } from '../../infraestructure/models/restmessage';

@Component({
  selector: 'Zplayer-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  title = 'zplayer';

  public formLogin:FormGroup;
  public correcto:boolean;
  public bloqueado:boolean;

  constructor(private route:Router, private restSvc: RestService) {
    this.formLogin=new FormGroup(
      {
        username: new FormControl('',[Validators.required]),
        password:  new FormControl('',[ Validators.required])
      },

    )
    this.correcto=true;
    this.bloqueado=false;
  }

  loginUsuario(){
    this.restSvc.loginUsuario(this.formLogin.controls['username'].value, this.formLogin.controls['password'].value)
    .subscribe( (resp : Restmessage) =>{
      if(resp.codigo !== 401 )
        this.route.navigate(['/home']);
    })
  }
}
