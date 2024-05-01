var express = require('express');
const morgan = require("morgan");
var cookiParser = require('cookie-parser');
var cors = require('cors');
var routing = require('../routes/main.routes');


// const expressSession = require('express-session');
// const pgSession = require('connect-pg-simple')(expressSession);
// const bodyParser = require('body-parser');
// const pgPool = getConnectionEmpresa(process.env.POSTGRE_DATABASE);

module.exports = function (app) {
    //configuracion del cors
    app.use(cors({ 
        origin: ['http://localhost:4200'],
        credentials: true,
        optionsSuccessStatus: 204
    }));

    app.use(express.json());
    app.use(cookiParser());
    app.use(morgan("dev"));



// Resto de la configuración...




    routing(app);
}
