const User = require ("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config.js")
const libsjwt = require("../libs/jwt.js");
const { use } = require("bcrypt/promises.js");
const path = require('path');
const fs = require('fs-extra');


module.exports = {
    
    //FUNCION DESCUBRIR USUARIOS
    descubirUsers : async (req, res) => {
        try {
            const { user_id } = req.params;

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

    //FUNCION PARA SEGUIR A USUARIOS
    seguirUsers: async (req, res) => {
        try {
            const { user_id, followUser_id } = req.body;
    
    
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

    //FUNCION PARA CONSEGUIR LOS DATOS DE UN USUARIO
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
    },

    //FUNCION PARA ACTUALIZAR LOS DATOS DE UN USUARIO
    actualizarUsuario: async (req, res) => {
      try {
        const { id, realname, password } = req.body;
        const icono = req.files && req.files['icono'] ? req.files['icono'][0].path : null;

        const banner = req.files && req.files['banner'] ? req.files['banner'][0].path : null;
    
        // const userId = req.user.id; // Asegúrate de obtener el ID del usuario correctamente
        const user = await User.findById(id);
    
        if (!user) {
          return res.status(404).json({ codigo: 1, mensaje: 'Usuario no encontrado' });
        }
    
        if (password) {
          const passwordHash = await bcrypt.hash(password, 10);
          user.password = passwordHash;
        }

        if (realname) {
          user.realname = realname;
        }

        if (icono) {
          const iconoPath = path.join(__dirname, '..', icono);
          const iconoDestination = path.join(__dirname, '..', 'uploads', 'profile_pictures', path.basename(icono));
          if (iconoPath !== iconoDestination) {
            await fs.copy(iconoPath, iconoDestination);
            user.logo = `/uploads/profile_pictures/${path.basename(icono)}`;
          } else {
            user.logo = `/uploads/profile_pictures/${path.basename(icono)}`;
          }
        }

      if (banner) {
        const bannerPath = path.join(__dirname, '..', banner);
        const bannerDestination = path.join(__dirname, '..', 'uploads', 'banners', path.basename(banner));
        if (bannerPath !== bannerDestination) {
          await fs.copy(bannerPath, bannerDestination);
          user.banner = `/uploads/banners/${path.basename(banner)}`;
        } else {
          user.banner = `/uploads/banners/${path.basename(banner)}`;
        }
      }
      
        await user.save();
        res.status(200).json({ codigo: 0, mensaje: 'Perfil actualizado', logo: user.logo, banner: user.banner});
      } catch (error) {
        res.status(500).json({ codigo: 1, mensaje: 'Error al actualizar el perfil', error: error.message });
      }
    },

    //FUNCION PARA BUSCAR USUARIOS
    buscarUsuario: async (req, res) => {
      try {
        const query = req.query.query;
        const userId = req.query.userId; // Obtener el ID del usuario actual de los parámetros de consulta
        const regex = new RegExp(query, 'i'); // i para case-insensitive
    
        // Buscar el usuario actual para obtener la lista de usuarios que sigue
        const currentUser = await User.findById(userId);
        const followedUsers = currentUser.siguiendo.map(followedUser => followedUser.toString());
    
        // Buscar usuarios que coincidan con el query y que no estén en la lista de usuarios seguidos
        const users = await User.find({
          username: regex,
          _id: { $ne: userId, $nin: followedUsers }
        }).select('username realname logo');
    
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ codigo: 1, mensaje: 'Error al buscar usuarios', error: error.message });
      }
    }


}