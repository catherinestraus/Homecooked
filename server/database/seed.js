const faker = require("faker");
const dayjs = require("dayjs");
const { Home, HomeEvent, Booking } = require("./models");

console.log("Testing seed.js");

Home.find({}).then((homes) => {
  console.log("homes", homes);
});

HomeEvent.find({}).then((homeEvents) => {
  console.log("Home events", homeEvents);
});

Booking.find({}).then((bookings) => {
  console.log("Bookings", bookings);
});

const foods = [
  "Chinese",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Korean",
  "Middle-Eastern",
  "Mexican",
  "Southern",
  "Thai",
];

const createData = function () {
  // Generate Homes and Home Events
  for (let i = 0; i < foods.length; i++) {
    const titles = [
      `Authentic ${foods[i]} food you must try!`,
      `Join us for some homecooked ${foods[i]} food :)`,
      `${foods[i]} food made from scratch!`,
      `Guaranteed to be better than any ${foods[i]} restaurant in SF ;)`,
    ];

    for (let j = 1; j < 3; j++) {
      const homeInfo = {
        title: titles[Math.floor(Math.random() * 4)],
        typeOfFood: `${foods[i]}`,
        address: `${faker.address.streetAddress()}, San Francisco, CA ${
          Math.floor(Math.random() * 5) + 94115
        }`,
        photos: [
          `https://mvp-food.s3-us-west-1.amazonaws.com/${foods[i]}-${j}-1.jpg`,
          `https://mvp-food.s3-us-west-1.amazonaws.com/${foods[i]}-${j}-2.jpg`,
          `https://mvp-food.s3-us-west-1.amazonaws.com/${foods[i]}-${j}-3.jpg`,
        ],
      };

      const home = new Home(homeInfo);
      home.save((err, result) => {
        if (err) {
          throw err;
        } else {
          let eventTimes = [
            [
              dayjs().startOf("day").add(12, "hour"),
              dayjs().startOf("day").add(14, "hour"),
            ],
            [
              dayjs().startOf("day").add(14, "hour"),
              dayjs().startOf("day").add(16, "hour"),
            ],
            [
              dayjs().startOf("day").add(17, "hour"),
              dayjs().startOf("day").add(18, "hour"),
            ],
          ];
          for (let k = 0; k < eventTimes.length; k++) {
            const [startTime, endTime] = eventTimes[k];
            const eventInfo = {
              homeId: result._id,
              startDate: startTime.format(),
              endDate: endTime.format(),
              donationMin: Math.floor(Math.random() * 11) + 15,
              numberOfGuests: Math.floor(Math.random() * 6) + 1,
            };

            const homeEvent = new HomeEvent(eventInfo);
            homeEvent.save((err, result) => {
              if (err) {
                throw err;
              } else {
                console.log(result);
              }
            });
          }
        }
      });
    }
  }
};

createData();
