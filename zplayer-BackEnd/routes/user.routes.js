const express = require("express");
const router = express.Router();
const multer = require('multer');;

const usercontroller = require("../controllers/user.controller.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'icono') {
            cb(null, 'uploads/profile_pictures');
          } else if (file.fieldname === 'banner') {
            cb(null, 'uploads/banners');
          }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
  });

  const upload = multer({ storage });

router.get("/descubirUsers/:user_id", usercontroller.descubirUsers);
router.get("/obtenerDatosUser/:user_id", usercontroller.obtenerDatosUser)
router.post("/follow", usercontroller.seguirUsers)
router.post("/actualizarUsuario", upload.fields([{name:'icono'},{name:'banner'}]), usercontroller.actualizarUsuario)
router.get('/search', usercontroller.buscarUsuario);

module.exports=router;