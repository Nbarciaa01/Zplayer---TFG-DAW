import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { RestService } from '../../services/rest.service';
import { Post } from '../../infraestructure/models/message'
import { User } from '../../infraestructure/models/user';
import { LocalService } from '../../services/local.service';

@Component({
    selector: 'perfil-usuario',
    templateUrl: './perfil-usuario.component.html',
    styleUrl: './perfil-usuario.component.css',
})
 export class PerfilUsuarioComponent implements OnInit {

  userId: string = "";
  miUserId: string|number = "";
  posts: Post[] = []
  posts_ordenados: any = []
  usersFind: any[] = []
  usuariosRandom:any[] = []

  constructor(private route: ActivatedRoute, private restSvc: RestService,private localSvc: LocalService, private router: Router) {

    if(!this.localSvc.recuperarDatosUsuario()){
      this.router.navigate(['../login']);
    }


    this.userId = this.route.snapshot.paramMap.get('userId')!;


    this.loadUserData();
    this.recuperarMiUsuario()
  }

  ngOnInit(): void {

    this.cargarPosts()
    this.comprobarFollow()
  }

  async cargarPosts(){
    this.loading = true;
    const userPosts = await this.restSvc.getUserPosts(this.userId,this.page, this.limit)
    if(userPosts.posts.length > 0){
      this.posts.push(userPosts.posts)
    }
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
  public seguidores: any[] = [];
  public seguidos: any[] = [];

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

  recuperarMiUsuario(){
    let usuario: User = this.localSvc.recuperarDatosUsuario();

    this.miUserId = usuario.id!;

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

  async followUser(followed_user:string){
    let resp = await this.restSvc.followUser(this.miUserId, followed_user)

    this.seguidores = resp.seguidores

  }

  comprobarFollow():boolean{
    let respuesta = false

    if(this.seguidores.includes(this.miUserId)){
      respuesta = true;
    }

    return respuesta;
  }


  privateChat(sender_id:number|string, receiver_id: number|string){

    this.router.navigate(['../chat'], { state: { sender_id: sender_id, receiver_id: receiver_id} });

  }

}
