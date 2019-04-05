require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

const concertSearch = artist => {

  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  var bandName = artist.split('+').join(" ");

  axios.get(queryUrl).then(
    function(response) {
      for (var i = 0; i < response.data.length; i++) {
        // * Name of the venue
        var venue = response.data[i].venue.name;
        // * Venue location
        var location = (response.data[i].venue.city + " " + response.data[i].venue.region);
        // * Date of the Event
        var showDate = moment(response.data[i].datetime).format('MM/DD/YYYY');

        console.log(`You can catch ${bandName.toUpperCase()} at the ${venue} in ${location} on ${showDate}.`);
      }
    });
  fs.appendFile('log.txt', (',' + command + ',' + bandName), (err) => {
    if (err) throw err;
  });
}

const songSearch = song => {
  var queryUrl = "";

  var songName = movie.split('+').join(" ");

  axios.get(queryUrl).then(
    function(response) {
      //  * Artist(s)
      //
      //   * The song's name
      //
      //   * A preview link of the song from Spotify
      //
      //   * The album that the song is from
      //
      // * If no song is provided then your program will default to "The Sign" by Ace of Base.

    });

  fs.appendFile('log.txt', (',' + command + ',' + songName), (err) => {
    if (err) throw err;
  });
}

const movieSearch = movie => {
  if (movie.length > 1) {

    var queryUrl = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    var movieName = movie.split('+').join(" ");

    axios.get(queryUrl).then(
      function(response) {

        //* Title of the movie.
        var title = response.data.Title;
        // * Year the movie came out.
        var year = response.data.Year;
        // * IMDB Rating of the movie.
        var rating = response.data.Ratings[0].Value;
        // * Rotten Tomatoes Rating of the movie.
        var rotTom = response.data.Ratings[1].Value;
        // * Country where the movie was produced.
        var country = response.data.Country;
        // * Language of the movie.
        var lanuage = response.data.Language;
        // * Plot of the movie.
        var plot = response.data.Plot;
        // * Actors in the movie.
        var actors = response.data.Actors;

        console.log(`"${title}" released in: ${response.data.Year}.
        It's IMDB rating is ${rating}, the Rotten Tomatoes rating is ${rotTom}.
        It was produced in ${country} and is in ${lanuage}.`);
        console.log(`Plot Summary: "${plot}"
        Starring: ${actors}`);
      });
    fs.appendFile('log.txt', (',' + command + ',' + movieName), (err) => {
      if (err) throw err;
    });
  } else {
    // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    var queryUrl = "https://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
      function(response) {

        var title = response.data.Title;
        var year = response.data.Year;
        var rating = response.data.Ratings[0].Value;
        var rotTom = response.data.Ratings[1].Value;
        var country = response.data.Country;
        var lanuage = response.data.Language;
        var plot = response.data.Plot;
        var actors = response.data.Actors;

        console.log(`"${title}" released in: ${response.data.Year}.
        It's IMDB rating is ${rating}, the Rotten Tomatoes rating is ${rotTom}.
        It was produced in ${country} and is in ${lanuage}.`);
        console.log(`Plot Summary: "${plot}"
        Starring: ${actors}`);
      });
  }
}

const readRand = () => {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArray = data.split(",");

    // command = dataArray[0];
    // songSearch(dataArray[1]);

    command = dataArray[2];
    movieSearch(dataArray[3]);

    command = dataArray[4];
    concertSearch(dataArray[5]);

  });
}

switch (command) {
  case 'concert-this':
    var artistSearch = []
    for (var i = 3; i < process.argv.length; i++) {
      var userInput = process.argv[i];
      artistSearch.push(userInput);
    }
    var artist = artistSearch.join('+');
    concertSearch(artist);
    break;

  case 'spotify-this-song':
    var musicSearch = []
    for (var i = 3; i < process.argv.length; i++) {
      var userInput = process.argv[i];
      musicSearch.push(userInput);
    }
    var song = musicSearch.join('+');
    songSearch(song);
    break;

  case 'movie-this':
    var fullTitle = [];
    for (var i = 3; i < process.argv.length; i++) {
      var titleSearch = process.argv[i];
      fullTitle.push(titleSearch);
    }
    var movie = fullTitle.join('+');
    movieSearch(movie);
    break;

  case 'do-what-it-says':
    readRand();
    break;

  default:
    console.log('error');
    break;
}
