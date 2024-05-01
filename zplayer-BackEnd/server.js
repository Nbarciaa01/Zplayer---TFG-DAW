const express=require('express');

var pipeline=require('./middlewares/middlewares');

var app=express();

const bd  = require("./db")

pipeline(app);

app.listen(3002,(err)=>{
  if(!err){
    console.log('Servidor Web escuchando el puerto 3000');
  }else{
    console.log('Error al lanzar el servidor');
  }
});