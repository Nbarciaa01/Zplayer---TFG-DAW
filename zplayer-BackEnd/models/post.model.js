const mongoose =  require("mongoose");

// ESQUEMA POSTS BASE DE DATOS

const postSchema = new mongoose.Schema(
  {
    message: {
        type: String,
        required: true,
    },
    comunities: {
      type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
