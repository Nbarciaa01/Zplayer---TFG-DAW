const User = require ("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config.js")
const libsjwt = require("../libs/jwt.js");


module.exports = {
  register : async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const userFound = await User.findOne({ email });
  
      if (userFound)
        return res.status(400).json({
          message: ["The email is already in use"],
        });
  
      // hashing the password
      const passwordHash = await bcrypt.hash(password, 10);
  
      // creating the user
      const newUser = new User({
        username,
        email,
        password: passwordHash,
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


  login : async (req, res) => {
    console.log("aaaaaaa")
    try {
      const { email, password } = req.body;
      console.log(email, password)
      const userFound = await User.findOne({ email });
  
      if (!userFound)
        return res.status(400).json({
          message: ["The email does not exist"],
        });
  
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(400).json({
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
  
      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

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

  logout: async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    return res.sendStatus(200);
  },

}