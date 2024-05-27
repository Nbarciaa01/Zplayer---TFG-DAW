const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/user.controller.js");




router.get("/descubirUsers/:user_id", usercontroller.descubirUsers);
router.get("/obtenerDatosUser/:user_id", usercontroller.obtenerDatosUser)
router.post("/follow", usercontroller.seguirUsers)

module.exports=router;