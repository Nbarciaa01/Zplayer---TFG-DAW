const mongoose =  require("mongoose");

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
        ref: 'User'
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
