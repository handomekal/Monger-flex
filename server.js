var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");

var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
 
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(router);

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });
console.log("mongoose connection works")

//mongoose.connect(db, function(error) {
    //log any errors connection with mongoose
    // if (error) {
    //     console.log(error);
    // }
    // //or log a success message
    // else {
    //     console.log("mongoose connection is successful");
    // }
//});

app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});