"use strict";

class Account{
    constructor(accountId, userId, password, firstName, lastName, gender, address,
                mobileNumber, emailAddress, profilePhoto) {
                this.accountId = accountId;
                this.userId = userId;
                this.password = password;
                this.firstName = firstName;
                this.lastName = lastName;
                this.gender = gender;
                this.address = address;
                this.mobileNumber = mobileNumber;
                this.emailAddress = emailAddress;
                this.profilePhoto = profilePhoto;
    }

    //create get methods
    getAccountId(){
        return this.accountId;
    }

    getUserId(){
        return this.userId;
    }

    getPassword(){
        return this.password;
    }

    getFirstName(){
        return this.firstName;
    }

    getLastName(){
        return this.lastName;
    }

    getGender(){
        return this.gender;
    }

    getAddress(){
        return this.address;
    }

    getMobileNumber(){
        return this.mobileNumber;
    }

    getEmailAddress(){
        return this.emailAddress;
    }

    getProfilePhoto(){
        return this.profilePhoto;
    }

    //create set methods

    setUserId(userId){
        this.userId = userId;
    }

    setPassword(password){
        this.password = password;
    }

    setFirstName(firstName){
        this.firstName = firstName;
    }

    setLastName(lastName){
        this.lastName = lastName;
    }

    setGender(gender){
        this.gender = gender;
    }

    setAddress(address){
        this.address = address;
    }

    setMobileNumber(mobileNumber){
        this.mobileNumber = mobileNumber;
    }

    setEmailAddress(emailAddress){
        this.emailAddress = emailAddress;
    }

    setProfilePhoto(profilePhoto){
        this.profilePhoto = profilePhoto;
    }
}
module.exports = Account;