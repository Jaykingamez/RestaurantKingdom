"use strict";

const express = require("express");

const bodyParser = require("body-parser");
const fs = require('fs');

const routeAccount = require('./routes/routeAccount');
const routeRestaurant = require("./routes/routeRestaurant");
const routeReview = require("./routes/routeReview");
const routeAmenity = require("./routes/routeAmenity");
const routeCuisine = require("./routes/routeCuisine");

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var app = express();
var http = require('http');
var https = require('https');


var host = "localhost";
var port = 8080;
var startPage = "ndex.html";


app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routeAccount.routeAccount(app);
routeRestaurant.routeRestaurant(app);
routeReview.routeReview(app);
routeAmenity.routeAmenity(app);
routeCuisine.routeCuisine(app);

function gotoIndex(req, res) {
    console.log(req.params);
    res.sendFile(__dirname + "/" + startPage);
}

app.get("/" + startPage, gotoIndex);

app.route("/");

var httpsServer = https.createServer(options, app);

httpsServer.listen(port, host, function(){
  //var host = server.address().address;
  var port = httpsServer.address().port;

  console.log("Example app listening at https://%s:%s", host, port);
});

/*
var server = app.listen(port, host, function() {
    //var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
// });*/
