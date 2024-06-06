import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../../../services/local.service';
import { User } from '../../../infraestructure/models/user';
import { Post, Posts } from '../../../infraestructure/models/message'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { RestService } from '../../../services/rest.service';


@Component({
    selector: 'app-moba',
    templateUrl: './moba.component.html',
    styleUrl: './moba.component.css',
})
export class MobaComponent {


  contenido: string = '';
  posts: Post[] = []
  posts_ordenados: any = []

  constructor(private route:Router, private localSvc: LocalService, private restSvc: RestService) {
    this.recuperarDatosUsuarios()

  }

  async ngOnInit(){

    await this.cargarPosts()

  }

  async cargarPosts(){
    this.posts = await this.restSvc.getComunityPost("moba");
    this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
      let mensajeRespuesta = await this.restSvc.newPost(this.id,this.contenido,"moba")

      if(mensajeRespuesta.codigo === 0){
        await this.cargarPosts()
      }


    }

   }

   formatearFecha(fechaPost: Date){
    return fechaPost.toString().split("T")[0]
   }

   async darLike(messageID: number){
    let mensajeRespuesta = await this.restSvc.darLike(this.id,messageID)

    if(mensajeRespuesta.codigo === 200 || mensajeRespuesta.codigo === 201){
      await this.cargarPosts()
    }
   }

   mensajeGustado(message: Post): boolean{
    return message.likes.includes(this.id);
   }


   devolverLogo(logo: string){
    return this.restSvc.getProfilePictureUrl(logo);
  }


}
