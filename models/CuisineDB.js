"use strict";
var db = require('../db-connection');

class CuisineDB{
    getAllCuisine(request, respond){
        var sql = "SELECT * FROM restaurant_review.cuisine";
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
module.exports = CuisineDB;