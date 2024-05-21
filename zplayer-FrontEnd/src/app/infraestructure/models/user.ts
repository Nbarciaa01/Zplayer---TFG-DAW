export interface User{
  id?:number;
  realname: string;
  username: string;
  comunidades:string[];
  logo:string;
  banner:string;
  seguidores:number[];
  seguidos:number[];
}
