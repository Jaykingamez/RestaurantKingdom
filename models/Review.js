"use strict"

class Review{
    constructor(reviewId, accountId, restaurantId, content, timestamp, rating){
        this.reviewId = reviewId;
        this.accountId = accountId;
        this.restaurantId = restaurantId;
        this.content = content;
        this.timestamp = timestamp;
        this.rating = rating;
    }

    //create get methods
    getReviewId(){
        return this.reviewId;
    }

    getAccountId(){
        return this.accountId;
    }

    getRestaurantId(){
        return this.restaurantId;
    }

    getContent(){
        return this.content;
    }

    getTimestamp(){
        return this.timestamp;
    }

    getRating(){
        return this.rating;
    }

    //create set methods
    setContent(content){
        this.content = content;
    }

    setTimestamp(timestamp){
        this.timestamp = timestamp;
    }

    setRating(rating){
        this.rating = rating;
    }
}
module.exports = Review;