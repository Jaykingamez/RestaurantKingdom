"use strict";

class Cuisine{
    static cuisine_dict = {};

    getCuisineDict(){
        return this.cuisine_dict;
    }

    AddToCuisineDict(cuisineId, cuisine){
        this.cuisine_dict[cuisineId] = cuisine;
    }
}
module.exports = Cuisine;