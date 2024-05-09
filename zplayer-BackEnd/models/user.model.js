const mongoose =  require("mongoose");

const userSchema = new mongoose.Schema(
  {
    realname: {
      type:String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    comunities: {
      type: Array,
      required: true,
    },
    logo: {
      type:String,
      default: '../../zplayer-FrontEnd/src/assets/iconos-usuarios/avatardefault.png'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
