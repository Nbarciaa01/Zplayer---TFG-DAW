import { Injectable } from '@angular/core';
import { User } from '../infraestructure/models/user';
import { environment } from '../environments/environment';
import * as CryptoJs from 'crypto-js/core';
import 'crypto-js/aes'


@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }


  public almacenarDatosUsuario(datosUsuario: User):boolean{
    try{
      const usuarioEncriptado = CryptoJs.AES.encrypt(JSON.stringify(datosUsuario), environment.secret_key).toString();
      sessionStorage.clear();
      window.sessionStorage.setItem('usuario', usuarioEncriptado)

      return true
    }
    catch(error){
      console.log('Error en local storage ', error)
      return false;
    }

  }

  public recuperarDatosUsuario():User{
    const usuarioEncriptado = sessionStorage.getItem('usuario');
    let usuarioDesencriptado!:User;
    if(usuarioEncriptado){
      const bytes = CryptoJs.AES.decrypt(usuarioEncriptado!, environment.secret_key)
      usuarioDesencriptado = JSON.parse(bytes.toString(CryptoJs.enc.Utf8))
    }

    return usuarioDesencriptado;
  }

}
