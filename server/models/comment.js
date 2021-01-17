const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
<<<<<<< HEAD
  songId: String,
  progressMs: Number, 
=======
  parent: String,
>>>>>>> 0fcee0351d14d792e69615973d46888f4eec855c
  content: String,
});

// compile model from schema
<<<<<<< HEAD
module.exports = mongoose.model("comment", CommentSchema);
=======
module.exports = mongoose.model("comment", CommentSchema);
>>>>>>> 0fcee0351d14d792e69615973d46888f4eec855c
