/**
 * Created by perandre on 11/1/15.
 */

//var fs = require('fs');                                 // Work with filestreams
var express = require('express');                       // Express framework
//var lessonController = require('./lessonController');   // Lesson controller
//var queryController = require('./queryController');     // Query controller
var personalsettings = require('./personalsettings.js' );


var app = express();                                    // Initialize app object

app.use(express.static(__dirname));                     // Indicate directory to Express app

app.get('/', function(req, res){                        // Index router
    res.sendFile(__dirname + '/' + "index.html");
});

console.log(personalsettings.serverport);
var server = app.listen(personalsettings.serverport, function() {              // Run server
});
