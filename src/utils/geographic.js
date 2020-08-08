const request = require("request");

const geographic = ({ latitude, longitude }, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=99175cb808c5dbb7988f08efaad8b0b6";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (body.message) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, body.weather[0].description);
    }
  });
};
module.exports = geographic;
