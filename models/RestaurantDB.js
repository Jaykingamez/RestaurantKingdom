"use strict";

var db = require('../db-connection');

class RestaurantDB{
    getAllRestaurants(request, respond){
        var sql = "SELECT * FROM restaurant_review.restaurant";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    getRestaurantAmenity(request, respond){
        var restaurantId = request.params.id;
        var sql = "SELECT amenity_id FROM restaurant_review.restaurant_amenity WHERE restaurant_id = ?"
        db.query(sql, restaurantId, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    getRestaurantCuisine(request, respond){
        var restaurantId = request.params.id;
        var sql = "SELECT cuisine_id FROM restaurant_review.restaurant_cuisine WHERE restaurant_id = ?"
        db.query(sql, restaurantId, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });

    }

    //Search fucntion
    //Tags are checked beforehand

    searchRestaurant(request, respond){
        var query = '%' + request.body.search + '%';
        var tags = request.body.tags;
        console.log(query);
        console.log(tags);
        var values = [query];
        var sql = `SELECT restaurant.restaurant_id, restaurant.restaurant_name, restaurant.restaurant_picture, restaurant.address, restaurant.opening_time, restaurant.closing_time, restaurant.telephone_number
                   FROM restaurant
                   LEFT OUTER JOIN restaurant_amenity ON restaurant.restaurant_id = restaurant_amenity.restaurant_id
                   LEFT OUTER JOIN amenity ON restaurant_amenity.amenity_id = amenity.amenity_id
                   LEFT OUTER JOIN restaurant_cuisine ON restaurant.restaurant_id = restaurant_cuisine.restaurant_id
                   LEFT OUTER JOIN cuisine  ON restaurant_cuisine.cuisine_id = cuisine.cuisine_id
                   WHERE restaurant_name LIKE ?`;
        
        for (const [key, value] of Object.entries(tags)) {
            sql += " AND " + key + " = ?";
            values.push(value);
        }
        console.log(values);
        //dont forget group by
        sql += " GROUP BY restaurant.restaurant_id";
        //console.log(sql);

        db.query(sql, values, function(error, result){
            if(error){
                throw error;
            }
            else{
                //console.log(result);
                respond.json(result);
            }
        });

    }
}
module.exports = RestaurantDB;