require("dotenv").config();

var request = require('request');

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var operation = process.argv[2]
var selection = process.argv[3]
// console.log(operation);
// console.log(selection)

if (operation === "movie-this") {
    request("https://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        
      var movieStuff = JSON.parse(body);
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

if (operation === "my-tweets") {
    var params = {screen_name: 'fitwithjeremy'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // var myTweets = JSON.parse(tweets);
            for (var i = 0; i < tweets.length; i++) {
            console.log("");
            console.log("@fitwithjeremy: " + tweets[i].text);
            console.log("----------------------------------");
           
            }
        }
    });

}

if (operation === "spotify-this-song"){
    spotify.search({ type: 'track', query: selection }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log(data);
        console.log(data.tracks.items[0]);
       
    //   console.log("A song by: " + data.tracks.items[0].album.artists.external_urls[0]); 
    //   console.log("Titled: " + selection); 
    //   console.log("Titled: " + data.tracks.items[0].album.artists.external_urls[3]); 


      
      });
      
}

