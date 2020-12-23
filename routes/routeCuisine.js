"use strict";

const cuisinedb = require('../models/CuisineDB');

var cuisineDBObject = new cuisinedb();

function routeCuisine(app){
    app.route('/cuisine')
        .get(cuisineDBObject.getAllCuisine);
}
module.exports = {routeCuisine}