import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, lastValueFrom } from 'rxjs';
import { Restmessage } from '../infraestructure/models/restmessage';

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

  newPost(user_id:number, message:string, comunity?:string): Promise<Restmessage>{
    return lastValueFrom(this.peticion.post<Restmessage>(
    `${this.urlApi}/post/newpost`,
    {user_id:user_id, message:message, comunity:comunity}
  ))
  }

  getAllPosts(){
    return lastValueFrom(this.peticion.get<Object[]>(
      `${this.urlApi}/post/getPosts`,
    ))
  }


}
