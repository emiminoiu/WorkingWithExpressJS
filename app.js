var express = require("express");
const app = express();
const port = 3002;
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/camp', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection was opened!");
});
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});
var Campground = mongoose.model("Campground", campgroundSchema);
Campground.create({
    name: "Camp1",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/74/d1/48/bridge-bay-campground.jpg",
    description: "This is a description!"
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.get('/home', (req, res) => {
    res.render("home");

});
app.get('/campground/new', (req, res) => {
    res.render("newcamp");

});

app.get('/campground', (req, res) => {
    Campground.find({}, (err, camp) => {
            if (err) {
                console.log(err);
            } else {
                res.render("campground", { campgrounds: camp });
            }
        })
        // res.render("campground", { campgrounds: campgrounds });
});
app.post('/campground', (req, res) => {
    console.log(req.body.name);
    var name = req.body.name;
    var image = req.body.image;
    var campobj = { name, image };
    Campground.create(campobj);

    res.redirect('/campground');
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));