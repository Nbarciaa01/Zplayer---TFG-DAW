const express = require("express");
const router = express.Router();

const authcontroller = require("../controllers/auth.controller.js");

// const validator = require("../middlewares/validator.middleware.js");

// const schemas =  require("../schemas/auth.schema.js");



// router.post("/register", validator.validateSchema(schemas.registerSchema), authcontroller.register);
router.post("/login", authcontroller.login);
// router.get("/verify", authcontroller.verifyToken);
// router.post("/logout", authcontroller.verifyToken, authcontroller.logout);

module.exports=router;