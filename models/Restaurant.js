"use strict"
class Restaurant{
    constructor(restaurantId, restaurantName, restaurantPicture, address,
                openingTime, closingTime, telephoneNumber){
                this.restaurantId = restaurantId;
                this.restaurantName = restaurantName;
                this.restaurantPicture = restaurantPicture;
                this.address = address;
                this.openingTime = openingTime;
                this.closingTime = closingTime;
                this.telephoneNumber = telephoneNumber;
    }

    //create get methods
    getRestaurantId(){
        return this.restaurantId;
    }

    getRestaurantName(){
        return this.restaurantName;
    }

    getRestaurantPicture(){
        return this.restaurantPicture;
    }

    getAddress(){
        return this.address;
    }

    getOpeningTime(){
        return this.openingTime;
    }

    getClosingTime(){
        return this.closingTime;
    }

    getTelephoneNumber(){
        return this.telephoneNumber;
    }

}
module.exports = Restaurant;