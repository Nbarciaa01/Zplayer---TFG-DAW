
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { User } from '../../infraestructure/models/user';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { RestService } from '../../services/rest.service';

@Component({
    selector: 'zplayer-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit  {
  contenido: string = '';
  posts: any = []
  posts_ordenados: any = []

  constructor(private route:Router, private localSvc: LocalService, private restSvc: RestService) {
    this.recuperarDatosUsuarios()

  }

  async ngOnInit(){

    this.posts = await this.restSvc.getAllPosts();
    console.log(this.posts)
  }

  //DATOS DE USUARIO
  private id:  number = 0;
  public username: string = '';
  public realname: string = '';
  public logo: string = '';
  faMagnifyingGlass = faMagnifyingGlass;

  ajustarAltura() {
    const textarea = document.getElementById('mensaje');
    textarea!.style.height = 'auto'; // Restablecer la altura a 'auto' para evitar el desbordamiento
    textarea!.style.height = textarea!.scrollHeight + 'px'; // Ajustar la altura según el contenido
  }

  recuperarDatosUsuarios(){
    let usuario: User = this.localSvc.recuperarDatosUsuario();


    this.username = usuario.username;
    this.realname = usuario.realname;
    this.logo = usuario.logo;
    this.id = usuario.id!;

  }

   async nuevoMensaje(){

    if(this.contenido !== ""){
      let nuevo_mensaje = await this.restSvc.newPost(this.id,this.contenido,"")

    }

   }

   ordenarMensajesPorTiempo(){

   }



}
