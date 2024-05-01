import { User } from "./user";

export interface Restmessage {
  codigo: number;
  mensaje: string;
  error?: string;
  usuario?: User;
  token?: string;
  datoscliente?:string;

}
