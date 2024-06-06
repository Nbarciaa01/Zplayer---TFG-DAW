const User = require ("../models/user.model.js");
const Message = require("../models/message.model.js")
const Post = require("../models/post.model.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config.js")
const libsjwt = require("../libs/jwt.js");


module.exports = {

    recuperarMensajes : async (req, res) => {
        try {
            const { senderId, receiverId } = req.params;
        
            const messages = await Message.find({
              $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
              ]
            }).sort({ sentAt: 1 }) // Ordenar por fecha de envío ascendente
        
            .populate('sender', 'username logo')
            .populate('receiver', 'username logo');
        
            res.status(200).json( messages );
        } catch (error) {
            res.status(500).json({ codigo: 1, mensaje: 'Error al recuperar los mensajes', error: error.message });
        }
    },

    enviarMensaje: async (req, res) => {
        try {
            const { senderId, receiverId, content } = req.body;
        
            // Validar que ambos usuarios existen
            const sender = await User.findById(senderId);
            const receiver = await User.findById(receiverId);
        
            if (!sender || !receiver) {
              return res.status(404).json({ codigo: 1, mensaje: 'Usuario no encontrado' });
            }
        
            const newMessage = new Message({
              sender: senderId,
              receiver: receiverId,
              message: content
            });
        
            await newMessage.save();
        
            res.status(200).json({ codigo: 0, mensaje: 'Mensaje enviado exitosamente', message: newMessage });
          } catch (error) {
            res.status(500).json({ codigo: 1, mensaje: 'Error al enviar el mensaje', error: error.message });
          }
    },

    getChattedUsers: async (req, res) => {
      try {
        const userId = req.params.userId; // ID del usuario actual
        const chattedUserIds = await Message.distinct('sender', { receiver: userId }); // IDs de remitentes con los que has chateado
        const otherChattedUserIds = await Message.distinct('receiver', { sender: userId }); // IDs de destinatarios con los que has chateado
        const allChattedUserIds = [...chattedUserIds, ...otherChattedUserIds]; // Combinar ambos usuarios encontrados
        const uniqueChattedUserIds = Array.from(new Set(allChattedUserIds)); // Eliminar duplicados
    
        // Obtener datos de usuarios basados en los IDs
        const chattedUsers = await User.find({ _id: { $in: uniqueChattedUserIds } }).select('_id realname username logo');;
    
        res.status(200).json( chattedUsers );
      } catch (error) {
        res.status(500).json({ codigo: 1, mensaje: 'Error al obtener usuarios chateados', error: error.message });
      }
  }

  
}