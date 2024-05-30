import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { User } from '../../infraestructure/models/user';
import { Post } from '../../infraestructure/models/message'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { RestService } from '../../services/rest.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  faGamepad = faGamepad
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
    console.log(this.id)
    this.posts = await this.restSvc.getUserPosts(this.id);
    this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  }

  //DATOS DE USUARIO
  private id:  number = 0;
  public username: string = '';
  public realname: string = '';
  public logo: string = '';
  public banner: string = '';
  public seguidores: number[] = [];
  public siguiendo: number[] = [];


  faMagnifyingGlass = faMagnifyingGlass;

  ajustarAltura() {
    const textarea = document.getElementById('mensaje');
    textarea!.style.height = 'auto'; // Restablecer la altura a 'auto' para evitar el desbordamiento
    textarea!.style.height = textarea!.scrollHeight + 'px'; // Ajustar la altura según el contenido
  }

  async recuperarDatosUsuarios(){
    let usuarioLocal: User = this.localSvc.recuperarDatosUsuario();
    this.id = usuarioLocal.id!;

    let usuario: User = await this.restSvc.getDatosUser(this.id)
    this.username = usuario.username;
    this.realname = usuario.realname;
    this.logo = usuario.logo;
    this.banner = usuario.banner;
    this.seguidores = usuario.seguidores;
    this.siguiendo = usuario.siguiendo

  }

   async nuevoMensaje(){

    if(this.contenido !== ""){
      let mensajeRespuesta = await this.restSvc.newPost(this.id,this.contenido,"")

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

}
