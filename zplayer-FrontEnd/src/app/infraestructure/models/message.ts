import { User } from "./user";

export interface Post {
  _id: number,
  createdAt: Date,
  likes: number[],
  message: string,
  updatedAt: Date,
  user_id: User
}


export interface Posts{
  mensajes:{
    mensaje: Post[]
  }
}
