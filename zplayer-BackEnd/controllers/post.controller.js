const User = require ("../models/user.model.js");
const Post = require("../models/post.model.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config.js")
const libsjwt = require("../libs/jwt.js");
const { post } = require("../routes/post.routes.js");


module.exports = {
    newPost : async (req, res) => {
      try{
        const { user_id, message, comunity } = req.body;

        const user = await User.findById(user_id);
        if(!user){
          return res.status(404).send({ codigo: 1, mensaje: 'Usuario no encontrado', errores: null });
        }
        

        const newPost = new Post({
          message: message,
          comunities: comunity,
          user_id: user._id
        });

        await newPost.save();

        res.status(200).send({codigo:0, mensaje: 'Post publicado', usuario:user, errores:null})
        }
      catch (error) {
        res.status(500).send({codigo:1, mensaje: 'No se ha podido publicar tu post', error: error.message})
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
        res.status(500).send({codigo: 1, mensaje: 'Error al agregar like', error: error.message})
      }
    },

    obtenerPosts: async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
    
        const posts = await Post.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .populate('user_id', 'username logo username');
    
        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);
    
        res.status(200).json({
          page,
          limit,
          totalPosts,
          totalPages,
          posts,
        });

      } catch (error) {
        res.status(500).json({ codigo: 1, mensaje: 'Error al obtener los posts', error: error.message });
      }
    },

    obtenerUserPosts: async (req, res) => {
      try{
        const user_id = req.params.user_id
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;


        const posts = await Post.find({user_id: user_id})
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit).populate('user_id', 'username logo username');

        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        res.status(200).json({
          page,
          limit,
          totalPosts,
          totalPages,
          posts,
        });
  
      }
      catch(error){
        console.error('Error al obtener los posts del usuario:', error);
        res.status(500).send({ message: 'Error al obtener los posts del usuario' });
      }
    },

    obtenerComunityPosts:async (req,res) => {
      try{
        const comunity = req.params.comunity
        const posts = await Post.find({comunities: comunity}).populate('user_id', 'username logo username');

        res.status(200).send( posts );
      }
      catch(error){
        console.error('Error al obtener los posts de la comunidad:', error);
        res.status(500).send({ message: 'Error al obtener los posts de la comunidad' });
      }
    },

    obtenerPostsSeguidores: async (req,res) => {
      try {
        // Asumimos que el ID del usuario que está haciendo la solicitud se encuentra en `req.user.id`
        const user_id = req.params.user_id
    
        // Encuentra al usuario y obtén la lista de IDs de los usuarios a los que sigue
        const user = await User.findById(user_id).populate('siguiendo', 'id username logo');
        
        if (!user) {
          return res.status(404).json({ codigo: 1, mensaje: 'Usuario no encontrado' });
        }
    
        // Obtén la lista de IDs de los usuarios a los que sigue
        const followingIds = user.siguiendo.map(followingUser => followingUser._id);
    
        // Encuentra los posts de los usuarios seguidos
        const posts = await Post.find({ user_id: { $in: followingIds } });
    
        res.status(200).json( posts );
      } catch (error) {
        res.status(500).json({ codigo: 1, mensaje: 'Error al recuperar los posts', error: error.message });
      }
    },

    deletePost: async (req,res) => {
      try {
        const postId = req.params.postId;
        console.log(postId)
        const deletedPost = await Post.findByIdAndDelete(postId);
    
        if (!deletedPost) {
          return res.status(404).json({ codigo: 404, mensaje: 'Post no encontrado' });
        }
    
        res.status(200).json({ codigo: 200, mensaje: 'Post eliminado exitosamente' });
      } catch (error) {
        res.status(500).json({ codigo: 500, mensaje: 'Error al eliminar el post', error: error.message });
      }
    }
  
}