const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  parent: String,
  content: String,
});

// compile model from schema
module.exports = mongoose.model("comment", CommentSchema);
