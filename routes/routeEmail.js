"use strict";

const email = require('../models/Email');

var emailObject = new email();

function routeEmail(app){
    app.route('/email')
        .post(emailObject.sendEmail);
}
module.exports = {routeEmail}