import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../../../services/local.service';
import { User } from '../../../infraestructure/models/user';
import { Post, Posts } from '../../../infraestructure/models/message'
import { faMagnifyingGlass, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { RestService } from '../../../services/rest.service';

@Component({
    selector: 'app-battleroyale',
    templateUrl: './battleroyale.component.html',
    styleUrl: './battleroyale.component.css',
})
export class BattleroyaleComponent {

  contenido: string = '';
  posts: any[] = []
  posts_ordenados: any = []

  page: number = 1;
  limit: number = 20;
  loading: boolean = false;
  usersFind: any[] = []
  usuariosRandom:any[] = []
  faArrowUp = faArrowUp

  mostrarBoton = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private route:Router, private localSvc: LocalService, private restSvc: RestService) {
    this.recuperarDatosUsuarios()
    this.cargarUsuarios()

  }

  async ngOnInit(){

    await this.cargarPosts()

  }

  async cargarPosts(){
    this.loading = true;
    let comunityPost = await this.restSvc.getComunityPost("battle royale",this.page, this.limit);
    this.posts.push(...comunityPost.posts);
    this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    this.loading = false;

  }

  irArriba(): void{
    this.scrollContainer.nativeElement.scrollTop = 0;
  }

  onDivScroll(): void {
    const container = this.scrollContainer.nativeElement;
    const yOffSet = this.scrollContainer.nativeElement.scrollTop;
    this.mostrarBoton = yOffSet > 500;

    if (container.scrollTop + container.clientHeight >= container.scrollHeight && !this.loading) {
      this.cargarMasPosts();
    }
  }


  async cargarMasPosts() {
    if (this.loading) return;
    this.page++;
    await this.cargarPosts();
  }

  //DATOS DE USUARIO
  public id:  number = 0;
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
      let mensajeRespuesta = await this.restSvc.newPost(this.id,this.contenido,"battle royale")

      if(mensajeRespuesta.codigo === 0){
        this.page = 1;
        this.posts = [];
        this.contenido = "";
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

  async followUser(followed_user:string){
    await this.restSvc.followUser(this.id, followed_user)
  }

  privateChat(sender_id:number|string, receiver_id: number|string){

    this.route.navigate(['../chat'], { state: { sender_id: sender_id, receiver_id: receiver_id} });

  }

  async cargarUsuarios(){
    this.usersFind = await this.restSvc.getUsersForFollow(this.id)
    this.usuariosRandom = this.getUsuariosRandom(this.usersFind)
    console.log(this.usuariosRandom)
  }

  // USUARIOS RANDOM
  getUsuariosRandom(arr: any[]): any[] {
    if (arr.length <= 2) {
      return arr;
    }

    let randomIndices:any = [];
    while (randomIndices.length < 2) {
      let randomIndex = Math.floor(Math.random() * arr.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    return arr.filter((_, index) => randomIndices.includes(index));
}

  viewUserProfile(userId: string|number): void {
    if(userId == this.id){
      this.route.navigate(['../perfil']);
    }
    else{
      this.route.navigate(['../perfil/user', userId]);
    }

  }

}
