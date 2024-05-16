const express = require("express");
const router = express.Router();

const postcontroller = require("../controllers/post.controller.js");

// const validator = require("../middlewares/validator.middleware.js");

// const schemas =  require("../schemas/auth.schema.js");




router.post("/newPost", postcontroller.newPost);
router.get("/getPosts", postcontroller.obtenerPosts);


module.exports=router;