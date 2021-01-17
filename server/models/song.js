const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  song_id: String,
});

// compile model from schema
<<<<<<< HEAD
module.exports = mongoose.model("song", SongSchema);
=======
module.exports = mongoose.model("song", SongSchema);
>>>>>>> 0fcee0351d14d792e69615973d46888f4eec855c
