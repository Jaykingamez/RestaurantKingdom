"use strict";

var db = require('../db-connection');

class AmenityDB{
    getAllAmenity(request, respond){
        var sql = "SELECT * FROM restaurant_review.amenity";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
}
module.exports = AmenityDB;