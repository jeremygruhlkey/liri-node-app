var request = require('request');
var keys = require("./keys.js");

var fs = require("fs");

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function movieThis(selection) {
    if (!selection) {
        selection = "Mr Nobody"
    }

    request("https://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (error) {
            console.log(error);
            console.log("there was a boo boo!");
        }
        var movieStuff = JSON.parse(body);
        console.log("Title: " + movieStuff.Title);
        console.log("Year of Release: " + movieStuff.Year);
        console.log("IMDB Rating: " + movieStuff.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + movieStuff.Ratings[1].Value);
        console.log("Country of Production: " + movieStuff.Country);
        console.log("Language: " + movieStuff.Language);
        console.log("Plot: " + movieStuff.Plot);
        console.log("Actors: " + movieStuff.Actors);

        fs.appendFile("responses.txt", movieStuff.Title + "," + movieStuff.Year + ",", function(error){
            if (error){
                console.log(error);
                console.log("Error writing to responses.txt");
            }
        })
    });
}

function myTweets() {
    var params = {screen_name: 'fitwithjeremy'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
            console.log("");
            console.log("@fitwithjeremy: " + tweets[i].text);
            console.log("----------------------------------");
           
            }
        }
        fs.appendFile("responses.txt", tweets[1].text + ",", function(error){
            if (error){
                console.log(error);
                console.log("Error writing to responses.txt");
            }
        })
        
    })
}

function spotifyThis(selection) {
    if (!selection) {
        selection = "The Sign Ace of Base"
    }
    spotify.search({ type: 'track', query: selection, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("Artists Name: " + data.tracks.items[0].artists[0].name); // name of artist
        console.log("Song Name: " + data.tracks.items[0].name); // name of song
        console.log("Spotify Preview: " + data.tracks.items[0].external_urls.spotify); // preview link
        console.log("Album: " + data.tracks.items[0].album.name); //name of album
    

        fs.appendFile("responses.txt", data.tracks.items[0].artists[0].name + ",", function(error){
            if (error){
                console.log(error);
                console.log("Error writing to responses.txt");
            }
        })
    })
}

function nowDoThis(){
    fs.readFile("random.txt", "utf-8", function(error, data){
        if (error){
            console.log(error);
            console.log("Something went wrong");
        }
        doThis = data.split(",");
        operation = doThis[0];
        selection = doThis[1];
        spotifyThis(selection);
    })

}
module.exports = {
    movieThis: movieThis,
    myTweets: myTweets,
    spotifyThis: spotifyThis,
    nowDoThis: nowDoThis
}