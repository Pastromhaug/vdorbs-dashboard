/**
 * Created by perandre on 11/1/15.
 */

var fs = require('fs');                                 // Work with filestreams
var express = require('express');                       // Express framework
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var app = express();                                    // Initialize app object

app.use(express.static(__dirname));                     // Indicate directory to Express app

app.get('/', function(req, res){                        // Index router
    res.sendFile(__dirname + '/' + "index.html");
});

console.log(config.serverPort);
var server = app.listen(config.serverPort, function() {              // Run server
});
