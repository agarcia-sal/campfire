const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  songId: String,
  progressMs: Number, 
  content: String,
  userId: String,
});

// compile model from schema
module.exports = mongoose.model("comment", CommentSchema);
