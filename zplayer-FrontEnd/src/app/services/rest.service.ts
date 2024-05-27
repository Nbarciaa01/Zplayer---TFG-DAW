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

  registerUsuario(nombre:string, email:string, password:string, username:string, comunidades:string[]): Promise<Restmessage>{
    return lastValueFrom(this.peticion.post<Restmessage>(
      `${this.urlApi}/auth/register`,
      {realname: nombre, email: email, password: password, username: username, comunities:comunidades}
    ))
    }

  newPost(user_id:number, message:string, comunity?:string): Promise<Restmessage>{
    return lastValueFrom(this.peticion.post<Restmessage>(
    `${this.urlApi}/post/newpost`,
    {user_id:user_id, message:message, comunity:comunity}
  ))
  }

  getAllPosts(){
    return lastValueFrom(this.peticion.get<Post[]>(
      `${this.urlApi}/post/getPosts`,
    ))
  }

  getComunityPost(comunity: string){
    return lastValueFrom(this.peticion.get<Post[]>(
      `${this.urlApi}/post/getComunityPosts/${comunity}`,
    ))
  }

  darLike(user_id:number|string, post_id:number){
    return lastValueFrom(this.peticion.post<Restmessage>(
      `${this.urlApi}/post/like`,
      {user_id:user_id, post_id:post_id}
    ))
  }

  getUserPosts(user_id: number | string){
    return lastValueFrom(this.peticion.get<Post[]>(
      `${this.urlApi}/post/getUserPosts/${user_id}`,
    ))
  }

  getUsersForFollow(user_id:string|number){
    return lastValueFrom(this.peticion.get<any[]>(
      `${this.urlApi}/user/descubirUsers/${user_id}`,

    ))
  }

  getDatosUser(user_id:string | number){
    return lastValueFrom(this.peticion.get<any>(
      `${this.urlApi}/user/obtenerDatosUser/${user_id}`
    ))
  }

  followUser(user_id:string|number, followed_user:string){
    return lastValueFrom(this.peticion.post<Restmessage>(
      `${this.urlApi}/user/follow`,
      {user_id:user_id, followUser_id:followed_user}
    ))
  }


}
