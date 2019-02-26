// Do not change lines 1-26
var fs = require('fs');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
var listener = app.listen(8081, function() {
  console.log('Your app is listening on port 8081');
});
app.get("/", function (request, response) {
  displayFile(response);
});
// -------------------------

app.post("/toFile", function (request, response) {
  var text = request.body.text;
  //fs.writeFileSync(__dirname +'/fileStorage', text, function(err) {});
  var fileStorageContent = fs.readFileSync(__dirname +'/fileStorage','utf8');
  var newCounter = Number(fileStorageContent);
  fs.writeFileSync(__dirname +'/files/'+newCounter, text, function(err) {});
  newCounter++;
  fs.writeFileSync(__dirname +'/fileStorage', newCounter, function(err) {});
  displayFile(response);
});

function displayFile(response){
  var fileContents = fs.readFileSync(__dirname +'/private/index.html', 'utf8');
  var fileStorageContent = fs.readFileSync(__dirname +'/fileStorage', 'utf8');
  var fileCounter = Number(fileStorageContent);
  var allFiles = [];
  for(var i = 0 ; i < fileCounter ; i++){
    allFiles.push(fs.readFileSync(__dirname +'/files/'+i, 'utf8'));
  }
  fileContents = fileContents.replace('$fileContent', allFiles.join('<br>'));
  response.send(fileContents);
}