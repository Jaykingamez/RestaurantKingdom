"use strict";

class Amenity{
    static amenity_dict = {};


    static getAmenityDict(){
        return this.amenity_dict;
    }

    static AddToAmenityDict(amenityId, amenity){
        this.amenity_dict[amenityId] = amenity;
    }
}
module.exports = Amenity;