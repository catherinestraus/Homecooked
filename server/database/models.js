const mongoose = require("./index");

const dateTimeSchema = mongoose.Schema({
  date: Date,

  // In minutes
  duration: Number,
});

const listingSchema = mongoose.Schema({
  title: String,
  typeOfFood: String,
  address: String,
  numberOfGuests: Number,
  donationMin: Number,
  availableDateTimes: [dateTimeSchema],
  photos: [String],
});

module.exports = {
  Listing: listingSchema,
  DateTime: dateTimeSchema,
};
