"use strict";

const restaurantdb = require('../models/RestaurantDB');

var restaurantDBObject = new restaurantdb();

function routeRestaurant(app){
    app.route("/restaurant")
        .get(restaurantDBObject.getAllRestaurants);
    app.route("/restaurant/amenity/:id")
        .get(restaurantDBObject.getRestaurantAmenity);
    app.route("/restaurant/cuisine/:id")
        .get(restaurantDBObject.getRestaurantCuisine);
    app.route("/search")
        .get(restaurantDBObject.searchRestaurant);
}
module.exports = {routeRestaurant}
