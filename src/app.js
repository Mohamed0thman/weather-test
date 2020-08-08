const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const geographic = require("./utils/geographic");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partiaisPath = path.join(__dirname, "../templates/partiais");

//Setup handlebars engin and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partiaisPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (obj, res) => {
  res.render("index", {
    title: "Weather App",
    name: "othman",
  });
});

app.get("/about", (obj, res) => {
  res.render("about", {
    title: "about me",
    name: "othman",
  });
});

app.get("/help", (obj, res) => {
  res.render("help", {
    title: "help ",
    name: "othman",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address ",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        geographic({ latitude, longitude }, (error, geographicData) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: geographicData,
            location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 ",
    error: "help article not found",
    name: "othman",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 ",
    error: "page not found",
    name: "othman",
  });
});

// app.listen(port, () => {
//   console.log("server is up on port" + port);
// });
app.listen(process.env.PORT || 3000);
// app.com
// app.com/help
// app.com/about
