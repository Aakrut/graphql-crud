const mongoose = require("mongoose");

const devSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  role: {
    type: String,
    required:true
  },
  experience: {
    type:Number,
    required:true
  }
});

module.exports = mongoose.model("DevDB", devSchema);
