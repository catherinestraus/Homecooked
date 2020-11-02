const mongoose = require("./index");

const dateTimeSchema = mongoose.Schema({
  date: Date,
  // In minutes
  duration: Number,
});

const homeSchema = mongoose.Schema({
  title: String,
  typeOfFood: String,
  address: String,
  numberOfGuests: Number,
  donationMin: Number,
  availableDateTimes: [dateTimeSchema],
  photos: [String],
});

const bookingSchema = mongoose.Schema({
  numberOfGuests: Number,
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
  },
  timeslot: dateTimeSchema,
});

const Home = mongoose.model("Home", homeSchema);
const DateTime = mongoose.model("DateTime", dateTimeSchema);

module.exports = {
  Home,
  DateTime,
};
