const express = require("express");
const router = express.Router();

const messagecontroller = require("../controllers/message.controller.js");

// const validator = require("../middlewares/validator.middleware.js");

// const schemas =  require("../schemas/auth.schema.js");


router.get("/getMds/:senderId/:receiverId", messagecontroller.recuperarMensajes)
router.post("/md", messagecontroller.enviarMensaje)
router.get("/getMdsUsers/:userId", messagecontroller.getChattedUsers)


module.exports=router;