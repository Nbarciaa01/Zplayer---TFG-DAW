import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { User } from '../../infraestructure/models/user';
import { Post } from '../../infraestructure/models/message'
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { RestService } from '../../services/rest.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  profileForm: FormGroup;
  faGamepad = faGamepad
  contenido: string = '';
  posts: Post[] = []
  posts_ordenados: any = []
  editarPerfil:boolean = false;
  selectedFiles: { [key: string]: File } = {};

  constructor(private route:Router, private localSvc: LocalService, private restSvc: RestService, private fb: FormBuilder) {
    this.recuperarDatosUsuarios()

    this.profileForm = this.fb.group({
      realname: [''],
      password:[''],
      passwordConfirm:[''],
      icono: [null],
      banner: [null]
    });

  }

  async ngOnInit(){

    await this.cargarPosts()

  }

  async cargarPosts(){
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
  faUser=faUser;

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
    this.logo = this.restSvc.getProfilePictureUrl(usuario.logo);
    this.banner = this.restSvc.getBannerUrl(usuario.banner);
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

   editarPerfilButton(valor: boolean){
    this.editarPerfil = valor;
  }

  ficheroSeleccionado(event:any, campo:string){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.get(campo)!.setValue(file);
    }
  }

  async cambiarDatos(){
    const formData = new FormData();

    formData.append('id', this.id.toString());
    formData.append('realname', this.profileForm.get('realname')?.value);

    if(this.profileForm.get('password')?.value ==  this.profileForm.get('passwordConfirm')?.value){
      formData.append('password', this.profileForm.get('password')?.value);
    }

    if (this.profileForm.get('icono')!.value) {
      formData.append('icono',this.profileForm.get('icono')!.value);
    }
    if (this.profileForm.get('banner')!.value) {
      formData.append('banner', this.profileForm.get('banner')!.value);
    }

    const response = await this.restSvc.actualizarDatosUsuario(formData)
    if (response.codigo === 0) {

      this.recuperarDatosUsuarios();

      if (response.logo) {
        this.logo = this.restSvc.getProfilePictureUrl(response.logo);
      }
      if (response.banner) {
        this.banner = this.restSvc.getBannerUrl(response.banner);
      }
    }
  }
}
