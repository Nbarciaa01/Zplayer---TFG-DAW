import { User } from "./user";

export interface Post {
  _id: number,
  createdAt: Date,
  likes: number[],
  message: string,
  updatedAt: Date,
  user_id: any,
  comunities: string,
}


export interface Posts{
  mensajes:{
    mensaje: Post[]
  }
}
