const User = require ("../models/user.model.js");
const Post = require("../models/post.model.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config.js")
const libsjwt = require("../libs/jwt.js");


module.exports = {
    newPost : async (req, res) => {
      try{
        const { user_id, message, comunity } = req.body;

        const user = await User.findById(user_id);
        if(!user){
          return res.status(404).send({ codigo: 1, mensaje: 'Usuario no encontrado', errores: null });
        }
        

        const newPost = new Post({
          message,
          comunity,
          user_id: user._id
        });

        await newPost.save();

        res.status(200).send({codigo:0, mensaje: 'Post publicado', usuario:user, errores:null})
        }
      catch (error) {
        res.status(400).send({codigo:1, mensaje: 'No se ha podido publicar tu post', error: error.message})
      }
    },

    addLike: async (req, res) => {
      try {
        const { user_id, post_id } = req.body;

        //VERIFICACION PARA COMPROBAR QUE EL USUARIO EXISTE
        const user = await User.findById(user_id);
        if(!user){
          return res.status(404).send({ codigo: 1, mensaje: 'Usuario no encontrado', errores: null });
        }

        //VERIFICACION PARA COMPROBAR QUE EL MENSAJE EXISTE
        const message = await Post.findById(post_id);
        if (!message) {
          return res.status(404).send({ codigo: 1, mensaje: 'Mensaje no encontrado' });
        }

        //VERIFICACION PARA COMPROBAR SI EL USUARIO ANTERIORMENTE LE HA DADO A LIKE
        const likeIndex = message.likes.indexOf(user_id);
        if (likeIndex === -1) {
          // SI EL USUARIO NO LE HABIA DADO ANTERIORMENTE A LIKE , LO AÑADIMOS
          message.likes.push(user_id);
          await message.save();

          return res.status(200).send({ codigo: 200, mensaje: 'Like agregado', message });

        } else {
          // SI EL USUARIO LE HABIA DADO ANTERIORMENTE A LIKE , LO QUITAMOS
          message.likes.splice(likeIndex, 1);
          await message.save();

          return res.status(200).send({ codigo: 201, mensaje: 'Like removido', message });
        }

      }catch(error){
        res.status(400).send({codigo: 1, mensaje: 'Error al agregar like', error: error.message})
      }
    },

    obtenerPosts: async (req, res) => {
      try{
        // const { comunity } = req.body;

        const messages = await Post.find().populate('user_id', 'username logo username');

        res.status(200).send( messages );

      }
      catch(error){
        res.status(400).send({ codigo: 1, mensaje: 'Error al recuperar los mensajes', error: error.message });
      }
    }
  
}