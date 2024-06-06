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
      default: '/uploads/profile_pictures/avatardefault.png'
    },
    banner:{
      type:String,
      default: '/uploads/banners/bannerdefault.jpg'
    },
    seguidores: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    siguiendo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
