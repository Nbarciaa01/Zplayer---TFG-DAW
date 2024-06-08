import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RestService } from '../../services/rest.service';
import { Post } from '../../infraestructure/models/message'

@Component({
    selector: 'perfil-usuario',
    templateUrl: './perfil-usuario.component.html',
    styleUrl: './perfil-usuario.component.css',
})
 export class PerfilUsuarioComponent implements OnInit {

  userId: string = "";

  posts: Post[] = []
  posts_ordenados: any = []

  constructor(private route: ActivatedRoute, private restSvc: RestService) {

    this.userId = this.route.snapshot.paramMap.get('userId')!;


    this.loadUserData();

  }

  ngOnInit(): void {


    this.cargarPosts()
  }

  async cargarPosts(){
    this.loading = true;
    const userPosts = await this.restSvc.getUserPosts(this.userId,this.page, this.limit)
    this.posts.push(userPosts.posts)
    this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    this.loading = false

  }

  async cargarMasPosts() {
    if (this.loading) return;
    this.page++;
    await this.cargarPosts();
  }

  //DATOS DE USUARIO
  private id:  number = 0;
  public username: string = '';
  public realname: string = '';
  public logo: string = '';
  public banner: string = '';
  public seguidores: number[] = [];
  public seguidos: number[] = [];

  page: number = 1;
  limit: number = 20;
  loading: boolean = false;

  async loadUserData(){
    let datosUsuario = await this.restSvc.getDatosUser(this.userId)

    this.username = datosUsuario.username;
    this.realname = datosUsuario.realname;
    this.logo = this.restSvc.getProfilePictureUrl(datosUsuario.logo);
    this.id = datosUsuario.id!;
    this.banner = this.restSvc.getBannerUrl(datosUsuario.banner);
    this.seguidores = datosUsuario.seguidores;
    this.seguidos = datosUsuario.siguiendo;
  }

  formatearFecha(fechaPost: Date){
    return fechaPost.toString().split("T")[0]
   }

   async darLike(messageID: number){
    let mensajeRespuesta = await this.restSvc.darLike(this.userId,messageID)

    if(mensajeRespuesta.codigo === 200 || mensajeRespuesta.codigo === 201){
      await this.cargarPosts()
    }
   }


   mensajeGustado(message: Post): boolean{
    return message.likes.includes(parseInt(this.userId));
   }
   devolverLogo(logo: string){
    return this.restSvc.getProfilePictureUrl(logo);
  }
}
