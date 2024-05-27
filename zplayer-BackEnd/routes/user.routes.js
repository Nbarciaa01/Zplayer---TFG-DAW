const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/user.controller.js");




router.get("/descubirUsers", usercontroller.descubirUsers);
router.get("/obtenerDatosUser/:user_id", usercontroller.obtenerDatosUser)

module.exports=router;