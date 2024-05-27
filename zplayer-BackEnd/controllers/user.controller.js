const User = require ("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config.js")
const libsjwt = require("../libs/jwt.js");
const { use } = require("bcrypt/promises.js");


module.exports = {
    
    descubirUsers : async (req, res) => {
        try {
            const { user_id } = req.params;
            console.log(user_id)
            // Encuentra usuarios que no tienen `user_id` en su lista de seguidores y que no sean el mismo `user_id`
            const usuarios = await User.find({
              _id: { $ne: user_id },
              seguidores: { $ne: user_id }
            }).select('realname username logo banner');
        
            res.status(200).send(usuarios);
          } catch (error) {
            res.status(500).send({ codigo: 1, mensaje: 'Error al recuperar los usuarios', error: error.message });
          }
    },

    seguirUsers: async (req, res) => {
        try {
            const { user_id, followUser_id } = req.body;
    
            console.log(user_id);
            console.log(followUser_id);
    
            const user = await User.findById(user_id);
            const userToFollow = await User.findById(followUser_id);
    
            if (!user || !userToFollow) {
                return res.status(404).json({ codigo: 1, mensaje: 'Usuario no encontrado' });
            }
    
            const isFollowing = userToFollow.seguidores.includes(user_id);
    
            if (isFollowing) {
                // Si ya lo sigue, eliminar el user_id del array de seguidores del userToFollow
                userToFollow.seguidores = userToFollow.seguidores.filter(followerId => !followerId.equals(user_id));
                await userToFollow.save();
    
                // Eliminar el followUser_id del array de siguiendo del user
                user.siguiendo = user.siguiendo.filter(followingId => !followingId.equals(followUser_id));
                await user.save();
    
                return res.status(200).json({ codigo: 0, mensaje: 'Has dejado de seguir al usuario', usuario: userToFollow });
            } else {
                // Si no lo sigue, agregar el user_id al array de seguidores del userToFollow
                userToFollow.seguidores.push(user_id);
                await userToFollow.save();
    
                // Agregar el followUser_id al array de siguiendo del user
                user.siguiendo.push(followUser_id);
                await user.save();
    
                return res.status(200).json({ codigo: 0, mensaje: 'Has comenzado a seguir al usuario', usuario: userToFollow });
            }
        } catch (error) {
            res.status(500).json({ codigo: 1, mensaje: 'Error al seguir/dejar de seguir al usuario', error: error.message });
        }
    },

    obtenerDatosUser: async (req, res) => {

        const { user_id } = req.params;

        try {
          const user = await User.findById(user_id).select('realname username logo banner seguidores siguiendo');
          
          if (!user) {
            return res.status(404).send({ codigo: 1, mensaje: 'Usuario no encontrado' });
          }
          res.status(200).send( user );
        } catch (error) {
          res.status(500).send({ codigo: 1, mensaje: 'Error al obtener los datos del usuario', error: error.message });
        }
    }
}