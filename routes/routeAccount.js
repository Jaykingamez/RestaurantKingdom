"use strict";

const accountdb = require('../models/AccountDB');

var accountDBObject = new accountdb();

function routeAccount(app){
    app.route('/login')
        .post(accountDBObject.getLoginCredentials);
    app.route('/register')
        .post(accountDBObject.addNewAccount);
    app.route('/profile/:username')
        .get(accountDBObject.getAccountData)
    app.route('/profiel/:id')
        .put(accountDBObject.updateAccount)
        .delete(accountDBObject.deleteAccount);
}
module.exports = {routeAccount}