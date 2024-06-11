const User = require ("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config.js")
const libsjwt = require("../libs/jwt.js");
const { use } = require("bcrypt/promises.js");


module.exports = {

  //FUNCION PARA REGISTRAR USUARIOS

  register : async (req, res) => {
    try {
      const { realname, email, password, username, comunities } = req.body;
  
      const emailFound = await User.findOne({ email });
  
      if (emailFound)
        return res.status(400).send({
          message: ["El email ya está registrado"],
        });

      const usenameFound = await User.findOne({ username });

      if (usenameFound)
        return res.status(400).send({
          message: ["El usuario ya está registrado"],
        });
  
      // hashing the password
      const passwordHash = await bcrypt.hash(password, 10);
  
      // creating the user
      const newUser = new User({
        realname: realname,
        username: username,
        email: email,
        password: passwordHash,
        comunities: comunities,
      });
  
      // saving the user in the database
      const userSaved = await newUser.save();
  
      // create access token
      const token = await libsjwt.createAccessToken({
        id: userSaved._id,
      });
  
      res.cookie("token", token, {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });
  
      res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  //FUNCION PARA LOGUEAR USUARIOS
  login : async (req, res) => {
    try {
      const { username, password } = req.body;
      const userFound = await User.findOne({ username });
  
      if (!userFound)
        return res.status(401).json({
          message: ["The user does not exist"],
        });
  
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(401).json({
          message: ["The password is incorrect"],
        });
      }
  
      const token = await libsjwt.createAccessToken({
        id: userFound._id,
        username: userFound.username,
      });
  
      res.cookie("token", token, {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });

      const user = {
        id: userFound._id,
      }
  
      res.status(200).send({codigo:0, mensaje: 'login sucess', usuario:user, errores:null})


    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  //FUNCION PARA VERIFICAR EL TOKEN
  verifyToken : async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token, config.TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });

    
  },
  
}