const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:3000/homecooked");

module.exports = mongoose;
