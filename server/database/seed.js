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

const addresses = [
  "253 9th Ave, San Francisco, CA 94118",
  "247 10th Ave, San Francisco, CA 94118",
  "515 7th Ave, San Francisco, CA 94118",
  "445 10th Ave, San Francisco, CA 94118",
  "2003 Fulton St, San Francisco, CA 94117",
  "17 Ashbury St, San Francisco, CA 94117",
  "67 Rossi Ave, San Francisco, CA 94118",
  "101 Stanyan St, San Francisco, CA 94118",
  "290 Parker Ave, San Francisco, CA 94118",
  "180 Blake St, San Francisco, CA 94118",
  "1005 Anza St, San Francisco, CA 94118",
  "495 3rd Ave, San Francisco, CA 94118",
  "4121 Geary Blvd, San Francisco, CA 94118",
  "392 5th Ave, San Francisco, CA 94118",
  "409 8th Ave, San Francisco, CA 94118",
  "324 6th Ave, San Francisco, CA 94118",
  "333 7th Ave, San Francisco, CA 94118",
  "241 8th Ave, San Francisco, CA 94118",
  "262 6th Ave, San Francisco, CA 94118",
  "334 3rd Ave, San Francisco, CA 94118",
];

const createData = function () {
  let addressCount = -1;
  // Generate Homes and Home Events
  for (let i = 0; i < foods.length; i++) {
    const titles = [
      `Authentic ${foods[i]} food you must try!`,
      `Join us for some homecooked ${foods[i]} food`,
      `${foods[i]} food made from scratch!`,
      `Guaranteed to be better than any ${foods[i]} restaurant in SF`,
    ];

    for (let j = 1; j < 3; j++) {
      addressCount++;
      const homeInfo = {
        title: titles[Math.floor(Math.random() * 4)],
        typeOfFood: `${foods[i]}`,
        address: addresses[addressCount],
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
