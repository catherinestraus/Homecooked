const { Home, DateTime } = require("./database/models");

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

//Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "..")));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/api/homes", function (req, res) {
  Home.find((err, data) => {
    if (err) {
      throw err;
    } else {
      res.json(data);
    }
  });
});

app.post("/api/book", function (req, res) {
  Home.find({ _id: req.body.listingId }, (err, result) => {
    if (err) {
      throw err;
    } else {
      const params = [
        result.original_title,
        result.release_date,
        result.vote_average,
        false,
      ];

      const movie = new Movie({
        title: result.original_title,
        year: result.release_date,
        rating: result.vote_average,
        status: false,
      });

      movie.save((err, data) => {
        if (err) {
          throw err;
        } else {
          res.json(data);
        }
      });
    }
  });
});

app.patch("/movie", function (req, res) {
  if (req.body.status !== undefined) {
    Movie.findById(req.body._id, (err, movie) => {
      movie.status = req.body.status;

      movie.save((err) => {
        if (err) {
          throw err;
        } else {
          res.json(movie);
        }
      });
    });
  }
  if (req.body.rating !== undefined) {
    Movie.findById(req.body._id, (err, movie) => {
      movie.rating = req.body.rating;

      movie.save((err) => {
        if (err) {
          throw err;
        } else {
          res.json(movie);
        }
      });
    });
  }
});
