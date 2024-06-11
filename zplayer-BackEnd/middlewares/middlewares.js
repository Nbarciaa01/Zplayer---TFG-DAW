var express = require('express');
const morgan = require("morgan");
var cookiParser = require('cookie-parser');
var cors = require('cors');
var routing = require('../routes/main.routes');



// CONTROLAR LOS ERRORES CORS DE LA APLICACION

module.exports = function (app) {
    //configuracion del cors
    app.use(cors({ 
        origin: ['zplayer-d1d4.vercel.app'],
        credentials: true,
        optionsSuccessStatus: 204
    }));

    app.use(express.json());
    app.use(cookiParser());
    app.use(morgan("dev"));


    routing(app);
}
