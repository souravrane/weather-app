const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getGeocode = require("./utils/geocode");
const getForecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// creating path variables from the root
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setting up the view engine for hbs files (dynamic html content).
// the first parameter has to be "view engine" for this to work. 2nd param is the library.
app.set("view engine", "hbs");

// setting up a custom directory for hbs views.
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    // rendering the view and passing the object of values to FE.
    res.render("index", {
        title: "Weather App",
        name: "Sourav Rane",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        name: "Sourav Rane",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Sourav Rane",
        helpText: "This is the help page.",
    });
});

app.get("/weather", (req, res) => {
    // the query object holds the key value pairs from the query string.
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address",
        });
    }

    // gecode takes address as input and sends error and {....} into the callback
    getGeocode(req.query.address, (error, { lat, lon, location } = {}) => {
        if (error) return res.send({ error });

        // forcast takes lat, lon as input and sends error and data into the callback
        getForecast(lat, lon, (error, forecastData) => {
            if (error) return res.send({ error });

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            });
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Sourav Rane",
        errorMessage: "Help article not found.",
    });
});

// This is a wild card route. Hence it matches all the routes
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Sourav Rane",
        errorMessage: "Page not found.",
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
