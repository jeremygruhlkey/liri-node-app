require("dotenv").config();

var utilities = require("./utilities");

var operation = process.argv[2]
var selection = process.argv[3]

if (operation === "movie-this") {
    utilities.movieThis(selection);
}

if (operation === "my-tweets") {
    utilities.myTweets();
}

if (operation === "spotify-this-song"){
    utilities.spotifyThis(selection);
}

if (operation === "do-what-it-says"){
    utilities.nowDoThis();
}