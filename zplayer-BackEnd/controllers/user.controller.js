const User = require ("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config.js")
const libsjwt = require("../libs/jwt.js");
const { use } = require("bcrypt/promises.js");


module.exports = {
    
    descubirUsers : async (req, res) => {
        try{
            const { user_id } = req.body;

            const usuarios = await User.find({seguidores: {$ne: user_id}})

            res.status(200).send( usuarios );
        }
        catch(error){
            res.status(500).send({ codigo: 1, mensaje: 'Error al recuperar los mensajes', error: error.message });
        }

    },

    seguirUsers: async (req, res) => {
        try{
            const { user_id, followUser_id } = req.body;

            const user = await User.findById(user_id);
            const userToFollow = await User.findById(followUser_id);

            if (!user || !userToFollow) {
                return res.status(404).json({ codigo: 1, mensaje: 'Usuario no encontrado' });
            }

            const isFollowing = userToFollow.followers.includes(user_id);

            if (isFollowing) {
                // Si ya lo sigue, eliminar el userId del array de seguidores
                userToFollow.followers = userToFollow.followers.filter(followerId => !followerId.equals(user_id));
                await userToFollow.save();
                return res.status(200).json({ codigo: 0, mensaje: 'Has dejado de seguir al usuario', usuario: userToFollow });
              
            } else {
                // Si no lo sigue, agregar el userId al array de seguidores
                userToFollow.followers.push(user_id);
                await userToFollow.save();
                return res.status(200).json({ codigo: 0, mensaje: 'Has comenzado a seguir al usuario', usuario: userToFollow });
            }
            
        }
        catch(error){
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