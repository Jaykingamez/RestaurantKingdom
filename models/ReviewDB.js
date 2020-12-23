"use strict";

var db = require('../db-connection');
const Review = require('./Review');

class ReviewDB{
    getAllReviews(request, respond){
        var sql = "SELECT * FROM restaurant_review.review";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    addReview(request, respond){
        var now = new Date();
        var reviewObject = new Review(null, request.body.accountId, request.body.restaurantId, request.body.content, 
            now, request.body.rating);
        var sql = "INSERT INTO restaurant_review.review (account_id, restaurant_id , content, timestamp, rating) VALUES(?, ?, ?, ?, ?)";

        var values = [reviewObject.getAccountId(), reviewObject.getRestaurantId(), reviewObject.getContent(), 
            reviewObject.getTimestamp(), reviewObject.getRating()];
        
        db.query(sql, values, function (error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    updateReview(request, respond){
        var now = new Date();
        var reviewObject = new Review(request.params.id, request.body.reviewId, request.body.restaurantId, request.body.content, 
            now, request.body.rating);
        var sql = "UPDATE restaurant_review.review SET content = ?, rating = ?, timestamp = ? WHERE review_id = ?";
        var values = [reviewObject.getContent(), reviewObject.getRating(), reviewObject.getTimestamp(), reviewObject.getReviewId()];;
        db.query(sql, values, function (error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    deleteReview(request, respond){
        var reviewID = request.params.id;
        var sql = "DELETE FROM restaurant_review.review WHERE review_id = ?";

        db.query(sql, reviewID, function (error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
}
module.exports = ReviewDB;
