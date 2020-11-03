const { Home, HomeEvent, Booking } = require("./database/models.js");

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

//Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());

console.log(
  "Client side assets folder: ",
  path.join(__dirname, "../client/dist")
);

app.use("/", express.static(path.join(__dirname, "../client/dist")));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/api/homes", function (req, res) {
  Home.find((err, mhomes) => {
    const homes = mhomes.map((home) => home.toObject());
    if (err) {
      throw err;
    } else {
      // res.json(data);
      HomeEvent.find((err, mevents) => {
        const events = mevents.map((event) => event.toObject());
        if (err) {
          throw err;
        } else {
          for (const home of homes) {
            const eventsForHome = events.filter((event) => {
              return event.homeId.toString() === home._id.toString();
            });
            home.events = eventsForHome;
          }

          res.json(homes);
        }
      });
    }
  });
});

// app.get("/api/home/:homeId/events", function (req, res) {
//   let { homeId } = req.params;
//   HomeEvent.find({ homeId: homeId }, (err, data) => {
//     if (err) {
//       throw err;
//     } else {
//       res.json(data);
//     }
//   });
// });

app.post("/api/book", function (req, res) {
  let { eventId, guests } = req.body;

  HomeEvent.find({ _id: eventId }, (err, homeEvent) => {
    if (err) {
      throw err;
    } else {
      homeEvent.numberOfGuests -= guests;

      homeEvent.save((err) => {
        if (err) {
          throw err;
        } else {
          let booking = new Booking({
            eventId: eventId,
            numberOfGuests: guests,
          });

          booking.save((err, data) => {
            if (err) {
              throw err;
            } else {
              res.json(data);
            }
          });
        }
      });
    }
  });
});
