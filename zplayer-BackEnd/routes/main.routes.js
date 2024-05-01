const routingAuth = require("./auth.routes");

var cabecera= (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};

module.exports = function(app){


      app.use('/api/auth',cabecera, routingAuth)

}
