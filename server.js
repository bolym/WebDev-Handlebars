/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Michael Boly
 * Email: bolym@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
var port = process.env.PORT || 3003;

var twitData = fs.readFileSync('twitData.json', 'utf8');
var parsedData = JSON.parse(twitData);
var twitArray = [];
var numTwits = Object.keys(parsedData).length;

for(var i = 0; i < numTwits; i++){
  twitArray.push(parsedData[i]);
}

app.get('/', function (req, res, next){

  res.status(200);
  res.render('twitPage', {
    twits: twitArray
  });

});

app.get('/twits/:index', function (req, res, next){

  var validIndexes = ['0', '1', '2', '3', '4', '5', '6', '7'];

  var index = req.params.index;
  console.log("index: ", index);

  if(validIndexes.includes(index)){
    var twitContext = twitArray[index];
    var singleTwit = [];
    singleTwit.push(twitContext);
    res.render('singlePage', {
      singleTwit: singleTwit
    });
    res.status(200);
  } else {
    next();
  }
});

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.render('404Page');
  res.status(404);
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
