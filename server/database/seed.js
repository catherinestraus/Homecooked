const { Home, DateTime } = require("./models");

Home.find({}).then((homes) => {
  console.log("homes", homes);
});

DateTime.find({}).then((dateTimes) => {
  console.log("Date times", dateTimes);
});

const faker = require("faker");

const createData = function () {
  // Generate Dates
  const dates = [];

  const newDate = new Date()

  const date = {
    date: newDate,
    duration: Number,
  });

  const date = new DateTime(date);
  dates.push


  ////////////
  // Generate types of food
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

  for (let i = 0; i < foods.length; i++) {
    const titles = [
      `Authentic ${foods[i]} food you must try!`,
      `Join us for some homecooked ${foods[i]} food :)`,
      `${foods[i]} food made from scratch!`,
      `Guaranteed to be better than any ${foods[i]} restaurant in SF ;)`
    ]

    for (let j = 1; j < 3; j++) {
      const info = {
        title: titles[Math.floor(Math.random()* 4)],
        typeOfFood: `${foods[i]}`,
        address: `${faker.street_address()}, San Francisco, CA ${Math.floor(Math.random()*5) + 94115}`,
        numberOfGuests: Math.floor(Math.random()* 6) + 1,
        donationMin: Math.floor(Math.random()* 11) + 15,
        availableDateTimes: [dateTimeSchema],
        photos: [`https://mvp-food.s3-us-west-1.amazonaws.com/${foods[i]}-${j}-1.jpg`, `https://mvp-food.s3-us-west-1.amazonaws.com/${foods[i]}-${j}-2.jpg`, `https://mvp-food.s3-us-west-1.amazonaws.com/${foods[i]}-${j}-3.jpg`]
      };

      const home = new Home(info);
      home.save((err, result) => {
        if (err) {
          throw err;
        } else {
          console.log(result);
        }
      });
    }
};

createData();
