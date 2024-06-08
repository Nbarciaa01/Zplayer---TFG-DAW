
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { User } from '../../infraestructure/models/user';
import { Post, Posts } from '../../infraestructure/models/message'
import { faMagnifyingGlass, faGlobe,faHandPointUp, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { RestService } from '../../services/rest.service';

@Component({
    selector: 'zplayer-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit  {
  mostrarBoton = false;
  contenido: string = '';
  posts: Post[] = []
  posts_seguidores: Post[] = []
  posts_ordenados: any = []
  posts_seguidores_ordenados: any = []
  categoria: string | null = '';
  juegosList: string[] = [
    'General',
    'RPG',
    'Shooter',
    'MMORPG',
    'Battle Royale',
    'Estrategia',
    'MOBA',
    'Survivals',
    'Deportes'
  ];
  faGlobe=faGlobe
  faHandPointUp=faHandPointUp
  faArrowUp=faArrowUp;
  tipoChat: string = "global";

  page: number = 1;
  limit: number = 20;
  loading: boolean = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private route:Router, private localSvc: LocalService, private restSvc: RestService, ) {

    if(!this.localSvc.recuperarDatosUsuario()){
      this.route.navigate(['../login']);
    }

    this.recuperarDatosUsuarios()

  }

  async ngOnInit(){

    await this.cargarPosts()

  }

  async cargarPosts(){
    this.loading = true;
    const nuevosPosts = await this.restSvc.getAllPosts(this.page, this.limit);
    this.posts.push(...nuevosPosts.posts)
    this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const nuevosPostsSeguidores = await this.restSvc.obtenerPostsSeguidores(this.id,this.page, this.limit)
    this.posts_seguidores.push(...nuevosPostsSeguidores)
    this.posts_seguidores.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    this.loading = false;
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
      if(!this.categoria){
        this.categoria = 'general'
      }
      let mensajeRespuesta = await this.restSvc.newPost(this.id,this.contenido,this.categoria!)

      if(mensajeRespuesta.codigo === 0){
        this.page = 1;
        this.posts = [];
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
      this.page = 1;
      this.posts = [];
      await this.cargarPosts()
    }
   }

   mensajeGustado(message: Post): boolean{
    return message.likes.includes(this.id);
   }

   devolverLogo(logo: string){
    return this.restSvc.getProfilePictureUrl(logo);
  }

  viewUserProfile(userId: string|number): void {
    if(userId == this.id){
      this.route.navigate(['../perfil']);
    }
    else{
      this.route.navigate(['../perfil/user', userId]);
    }

  }

  onDivScroll(): void {
    const container = this.scrollContainer.nativeElement;
    const yOffSet = this.scrollContainer.nativeElement.scrollTop;
    this.mostrarBoton = yOffSet > 500;

    if (container.scrollTop + container.clientHeight >= container.scrollHeight && !this.loading) {
      this.cargarMasPosts();
    }
  }

  irArriba(): void{
    this.scrollContainer.nativeElement.scrollTop = 0;
  }

}
