const routingAuth = require("./auth.routes");
const routingPost = require("./post.routes");
const routingUser = require("./user.routes")
const routingMessage = require("./message.routes")
const express = require("express");
const path = require("path")

var cabecera= (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','https://zplayer-api.vercel.app/');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};

module.exports = function(app){


      app.use('/api/auth',cabecera, routingAuth)
      app.use('/api/post',cabecera, routingPost)
      app.use('/api/user',cabecera, routingUser)
      app.use('/api/message', cabecera, routingMessage)
      app.use('/api/uploads', cabecera, express.static(path.join(__dirname, '../uploads')));
}
