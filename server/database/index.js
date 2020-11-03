const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/homecooked");

module.exports = mongoose;
