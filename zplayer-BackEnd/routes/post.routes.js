const express = require("express");
const router = express.Router();

const postcontroller = require("../controllers/post.controller.js");

// const validator = require("../middlewares/validator.middleware.js");

// const schemas =  require("../schemas/auth.schema.js");




router.post("/newPost", postcontroller.newPost);
router.get("/getPosts", postcontroller.obtenerPosts);
router.post("/like", postcontroller.addLike);
router.get("/getUserPosts/:user_id", postcontroller.obtenerUserPosts);
router.get("/getComunityPosts/:comunity", postcontroller.obtenerComunityPosts)


module.exports=router;