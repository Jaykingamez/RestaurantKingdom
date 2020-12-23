"use strict";

const amenitydb = require('../models/AmenityDB');

var amenityDBObject = new amenitydb();

function routeAmenity(app){
    app.route('/amenity')
        .get(amenityDBObject.getAllAmenity);
}
module.exports = {routeAmenity}