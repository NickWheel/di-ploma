const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});


const Model = mongoose.model('message', MessageSchema);
module.exports = Model;
