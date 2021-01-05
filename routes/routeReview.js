"use strict";

const reviewdb = require('../models/ReviewDB');

var reviewDBObject = new reviewdb();

function routeReview(app){
    app.route("/review")
        .get(reviewDBObject.getAllReviews)
        .post(reviewDBObject.addReview);
    app.route("/review/:id")
        .delete(reviewDBObject.deleteReview)
        .put(reviewDBObject.updateReview);
    app.route("/review/restaurant")
        .post(reviewDBObject.getCertainRestaurantReview);
}
module.exports = {routeReview}