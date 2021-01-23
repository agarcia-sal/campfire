const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema({
  songId: String,
  progressMs: Number, 
  color: String,
});

// compile model from schema
module.exports = mongoose.model("color", ColorSchema);