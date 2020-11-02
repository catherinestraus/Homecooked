const mongoose = require("./index");

const homeEventSchema = mongoose.Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
  },
  startDate: Date,
  endDate: Date,
  numberOfGuests: Number,
  donationMin: Number,
});

const homeSchema = mongoose.Schema({
  title: String,
  typeOfFood: String,
  address: String,
  photos: [String],
});

const bookingSchema = mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HomeEvent",
  },
  numberOfGuests: Number,
});

const Home = mongoose.model("Home", homeSchema);
const HomeEvent = mongoose.model("HomeEvent", homeEventSchema);
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = {
  Home,
  HomeEvent,
  Booking,
};
