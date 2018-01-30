require("dotenv").config();

var request = require('request');

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var operation = process.argv[2]
var selection = process.argv[3]
// console.log(operation);
// console.log(selection)

if (operation = "movie-this") {
    request("https://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        
      var movieStuff = JSON.parse(body)
      console.log("Title: " + movieStuff.Title);
      console.log("Year of Release: " + movieStuff.Year);
      console.log("IMDB Rating: " + movieStuff.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + movieStuff.Ratings[1].Value);
      console.log("Country of Production: " + movieStuff.Country);
      console.log("Language: " + movieStuff.Language);
      console.log("Plot: " + movieStuff.Plot);
      console.log("Actors: " + movieStuff.Actors);
    });
   
}

