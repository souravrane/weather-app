const request = require("request");

const getForecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c9b1af5c2dacf6b12ca61e7258d094e9&query=${lon},${lat}&units=m`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather api", undefined);
        } else if (response.body.error) {
            callback("Unable to find location", undefined);
        } else {
            const current = response.body.current;
            console.log(current);
            const data = `It is currently ${current.temperature} degrees, but feels like ${current.feelslike}, with a percipitation of ${current.precip}%.`;
            callback(undefined, data);
        }
    });
};

module.exports = getForecast;
