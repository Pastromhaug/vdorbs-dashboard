/**
 * Created by perandre on 11/1/15.
 */

var fs = require('fs');                                 // Work with filestreams
var express = require('express');                       // Express framework
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var bodyParser = require("body-parser");

var app = express();                                    // Initialize app object
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname));                     // Indicate directory to Express app

app.get('/', function(req, res){                        // Index router
    res.sendFile(__dirname + '/' + "index.html");
});

app.post('/login', function(req, res){
    var id_token = req.body.id_token;
    console.log("new login, id_token: " + id_token);
    res.end(id_token);
});

app.get('/course*', function(req, res) {
   res.sendFile(__dirname + '/' + 'course.html');
});

console.log(config.serverPort);
var server = app.listen(config.serverPort, function() {              // Run server
});
