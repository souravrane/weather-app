const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

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
        helpText: "This is the help page.",
    });
});

app.get("/weather", (req, res) => {
    res.send({ forecast: "Its 50 degrees", location: "London" });
});

app.listen(3000, () => {
    console.log("server is up on port 3000");
});
