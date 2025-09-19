const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema

const loginSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// create model
const auth = mongoose.model("auth", loginSchema);

// export model
module.exports = auth;
