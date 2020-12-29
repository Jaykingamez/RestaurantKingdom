"use strict";

var fs = require('fs');
var formidable = require('formidable');
var db = require('../db-connection');
const Account = require('./Account');
const folderLocation = '/images/profile_photo/';

class AccountDB{
    getLoginCredentials(request, respond){
        console.log(request.body);
        var userid = request.body.username;
        var password = request.body.password;
        var msg = "";

        var sql = "SELECT password FROM account WHERE user_id = ?"

        db.query(sql, [userid], function(error, result){
            if(error){
                throw error;
            } 
            else{
                if(result.length > 0 ){
                    if(password == result[0].password){
                        msg = "SUCCESS!";
                        console.log(msg);
                    }
                    else{
                        msg = "FAIL!"
                        console.log(msg);
                    }
                }
                else{
                    msg = "USER NOT FOUND!";
                    console.log(msg);
                }
                respond.json(msg);
            }
        });
    }

    //addNewAccount(request, respond){
    //    var filename = null;
    //    const promiseAddNewAccount = new Promise((resolve, reject) =>{
    //        filename = this.checkFile(request, respond);
    //    }).then(this.addAccountDatabse(request,respond, filename))
    //    .then(this.uploadProfilePhoto(request,respond, filename))
    //    .catch((error) => { console.log(error);});
    //}

    addNewAccount(request, respond){
        var form = new formidable.IncomingForm();
        form.parse(request, function (error, fields, files){
            if(error) respond.json(error);
            AccountDB.checkFile(files).then( (filename) => {
                return AccountDB.addAccountDatabase(fields, filename);
            }).then((filename) => {
                console.log("Checking filename is"+ filename);
                AccountDB.uploadProfilePhoto(files, filename);
                respond.json("done"); 
            }).catch((error) => { console.log(error);});
        }); 
    }

    static checkFile(files){
        var filename = null;
        return new Promise((resolve, reject) =>{
            if(files.upload_img){
                console.log("Got file?");
                var sql = `SELECT AUTO_INCREMENT
                FROM information_schema.tables
                WHERE table_name = "account"
                AND table_schema = "restaurant_review"`;
                
                db.query(sql, function(error, result){
                    console.log("querrying?");
                    if (error) { throw error; }
                    else {
                        var index = result[0]["AUTO_INCREMENT"]; 
                        filename = "profile_photo" + index + ".png";
                        resolve(filename);
                    }
                });
            }else{
                resolve(filename);
                //return filename;
            }
        });
    }
    

     static addAccountDatabase(fields, filename){
        //console.log("folderLocation + Filename is " +  folderLocation + filename);
        return new Promise((resolve, reject) =>{
            if (filename == null){
                var pfpPath  = "/images/restaurantKingdom.png";
            }else{
                var pfpPath =folderLocation + filename;
            }
            var accountObject = new Account(null, fields["register-username"], fields["register-password"], fields["register-first-name"],
            fields["register-last-name"], fields["register-gender"], fields["register-address"], fields["register-mobile"], 
            fields["register-email"], pfpPath);

            var sql = `INSERT INTO restaurant_review.account (user_id, password, first_name,  last_name, gender, address,
                mobile_number, email_address, profile_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            
            var values = [accountObject.getUserId(), accountObject.getPassword(), accountObject.getFirstName(),
                accountObject.getLastName(), accountObject.getGender(), accountObject.getAddress(), accountObject.getMobileNumber(),
                accountObject.getEmailAddress(), accountObject.getProfilePhoto()];
            
            db.query(sql, values, function(error, result){
                if (error) { reject(error); }
                resolve(filename);
            });
        });

        
    }

    static uploadProfilePhoto(files, filename){
        return new Promise((resolve, reject) =>{
            if (files.upload_img){
                var file = files.upload_img;
                var oldPath = file.path;
                var newPath = process.cwd() + '/public' + folderLocation + filename;
                console.log(filename);
                console.log(newPath);
                fs.rename(oldPath,  newPath, (error) => {
                    if(error) reject(error);
                    console.log("Moved file!");
                    resolve("Moved file!");
                    
                });
            }   
        });
    }

    getAccountData(request, respond){
        if ( isNaN(request.params.username) ){
            //console.log(request.params.username);
            //console.log("Here! Userrname")
            var accountID = request.params.username;
            var sql = "SELECT * FROM restaurant_review.account where user_id = ?";
        } else{
            //console.log("Using account id");
            var accountID = request.params.username;
            var sql = "SELECT * FROM restaurant_review.account where account_id = ?";
        }   
        db.query(sql, accountID, function(error, result){
            if (error) { 
                throw error; 
            }
            else { 
                respond.json(result); }
            });
    }

    updateAccount(request, respond){
        var accountObject = new Account(request.params.id, rquest.body.username, request.body.password, request.body.firstName,
            request.body.lastName, request.body.gender, request.body.address, request.body.mobile, 
            request.body.email, request.body.uploadImg);
            var sql = `UPDATE restaurant_review.account SET user_id = ?, password = ?, first_name = ?, last_name = ?, gender = ?,
            address = ?, mobile_number = ?, email_address = ?, profile_photo = ? WHERE account_id = ?"`;
            var values = [accountObject.getUserId(), accountObject.getPassword(), accountObject.getFirstName(),
                accountObject.getLastName(), accountObject.getGender(), accountObject.getAddress(), accountObject.getMobileNumber(),
                accountObject.getEmailAddress(), accountObject.getProfilePhoto(), accountObject.getAccountId()];
            db.query(sql, values, function(error, result){
                if (error) { 
                    throw error; 
                }
                else { 
                    respond.json(result); }
                });
    }

    deleteAccount(request, respond){
        var accountID = request.params.id;
        var sql = "DELETE FROM restaurant_review.account WHERE account_id = ?";
        db.query(sql, accountID, function (error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
}
module.exports = AccountDB;