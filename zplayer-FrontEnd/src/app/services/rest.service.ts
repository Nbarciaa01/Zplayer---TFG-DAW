import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, lastValueFrom } from 'rxjs';
import { Restmessage } from '../infraestructure/models/restmessage';
import { Post } from '../infraestructure/models/message';
import { User } from '../infraestructure/models/user';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private readonly urlApi = environment.baseUrl

  constructor(private peticion: HttpClient) { }


  //FUNCION QUE PERMITE EL LOGIN

  loginUsuario(username:string, password: string):Observable<Restmessage>{

    return this.peticion.post<Restmessage>(
      `${this.urlApi}/auth/login`,
      {username, password},
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true }
    ).pipe(catchError( (error: HttpErrorResponse) => {
        if(error.status === 401){
          console.log(error);
          return new Observable<Restmessage>((subscriber)=>{
            subscriber.next({codigo:401,mensaje:'credenciales erroneas',error:'Unauthorized'});
          });
        }else{
          window.alert("Ha ocurrido algún problema al iniciar sesion, intentelo más tarde");
          console.log(error);
          return new Observable<Restmessage>((subscriber)=>{
            subscriber.next({codigo:500,mensaje:'Error al iniciar sesion',error:'Unauthorized'});
          });
        }
    }))
  }

  //FUNCION REGISTRAR USUARIOS
  registerUsuario(nombre:string, email:string, password:string, username:string, comunidades:string[]): Promise<Restmessage>{
    return lastValueFrom(this.peticion.post<Restmessage>(
      `${this.urlApi}/auth/register`,
      {realname: nombre, email: email, password: password, username: username, comunities:comunidades}
    ))
    }

  //FUNCION NUEVO POST
  newPost(user_id:number, message:string, comunity?:string): Promise<Restmessage>{
    return lastValueFrom(this.peticion.post<Restmessage>(
    `${this.urlApi}/post/newpost`,
    {user_id:user_id, message:message, comunity:comunity}
  ))
  }

  //FUNCION REVUPERAR TODOS LOS POSTS
  getAllPosts(page: number, limit: number){
    return lastValueFrom(this.peticion.get<any>(
      `${this.urlApi}/post/getPosts/?page=${page}&limit=${limit}`,
    ))
  }

  //FUNCION RECUPERAR POSTS DE LA COMUNIDAD
  getComunityPost(comunity: string,page: number, limit: number){
    return lastValueFrom(this.peticion.get<any>(
      `${this.urlApi}/post/getComunityPosts/${comunity}/?page=${page}&limit=${limit}`,
    ))
  }

  //FUNCION PARA DAR LIKES
  darLike(user_id:number|string, post_id:number){
    return lastValueFrom(this.peticion.post<Restmessage>(
      `${this.urlApi}/post/like`,
      {user_id:user_id, post_id:post_id}
    ))
  }

   //FUNCION  RECUPERAR POSTS DE UN USUARIO
  getUserPosts(user_id: number | string,page: number, limit: number){
    return lastValueFrom(this.peticion.get<any>(
      `${this.urlApi}/post/getUserPosts/${user_id}/?page=${page}&limit=${limit}`,
    ))
  }

  //FUNCION RECUPERAR USUARIOS PARA SEGUIR
  getUsersForFollow(user_id:string|number){
    return lastValueFrom(this.peticion.get<any[]>(
      `${this.urlApi}/user/descubirUsers/${user_id}`,

    ))
  }

  //FUNCION RECUPERAR DATOS DEL USUARIO
  getDatosUser(user_id:string | number){
    return lastValueFrom(this.peticion.get<any>(
      `${this.urlApi}/user/obtenerDatosUser/${user_id}`
    ))
  }

  //FUNCION SEGUIR USUARIOS
  followUser(user_id:string|number, followed_user:string){
    return lastValueFrom(this.peticion.post<any>(
      `${this.urlApi}/user/follow`,
      {user_id:user_id, followUser_id:followed_user}
    ))
  }

  //FUNCION RECUPERAR MDS
  getMds(senderId:number|string,receiverId:number|string ){
    return lastValueFrom(this.peticion.get<Restmessage>(
      `${this.urlApi}/message/getMds/${senderId}/${receiverId}`
    ))
  }

  //MANDAR MD
  postMd(senderId:number|string,receiverId:number|string, content: string){
    return lastValueFrom(this.peticion.post<Restmessage>(
      `${this.urlApi}/message/md`,
      {senderId:senderId, receiverId:receiverId, content: content}
    ))
  }

  //FUNCION RECUPERAR MDS ENTRE USUARIOS
  getMdsUsers(userId:number|string){
    return lastValueFrom(this.peticion.get<User[]>(
      `${this.urlApi}/message/getMdsUsers/${userId}`
    ))
  }

  //FUNCION RECUPERAR DATOS USUARIOS
  actualizarDatosUsuario(formData: FormData){
    return lastValueFrom(this.peticion.post<any>(
      `${this.urlApi}/user/actualizarUsuario`,
      formData
    ))
  }

  //FUNCION PARA RECUPERAR LAS IMAGENES DEL BACK
  getProfilePictureUrl(iconoPath: string): string {
    return `${this.urlApi}${iconoPath}`;
  }

  //FUNCION PARA RECUPERAR LAS IMAGENES DEL BACK
  getBannerUrl(bannerPath: string): string {
    return `${this.urlApi}${bannerPath}`;
  }

  //OBTENER POST DE SEGUIDORES
  obtenerPostsSeguidores(userId:number|string,page: number, limit: number){
    return lastValueFrom(this.peticion.get<any>(
      `${this.urlApi}/post/getFollowesPosts/${userId}/?page=${page}&limit=${limit}`
    ))
  }

  //OBTENER BORRAR POST
  borrarPost(postId: number|string){
    return lastValueFrom(this.peticion.delete<Restmessage>(
      `${this.urlApi}/post/deletePost/${postId}`
    ))
  }

  //OBTENER BUSCAR USUARIOS
  buscarUsuarios(query: string, id: number|string): Promise<any[]> {
    return lastValueFrom(this.peticion.get<any[]>(
      `${this.urlApi}/user/search?query=${query}&userId=${id}`
    ))
  }
}
