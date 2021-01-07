"use strict";

var fs = require('fs');
var formidable = require('formidable');
var db = require('../db-connection');
const Account = require('./Account');
const { profile } = require('console');
const { isElementAccessExpression, reduceEachTrailingCommentRange } = require('typescript');
const { Z_ASCII } = require('zlib');
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


    addNewAccount(request, respond){
        var form = new formidable.IncomingForm();
        form.parse(request, function (error, fields, files){
            if(error) respond.json(error);
            AccountDB.checkFile(request, files).then( (filename) => {
                return AccountDB.addAccountDatabase(fields, filename);
            }).then((filename) => {
                console.log("Checking filename is"+ filename);
                AccountDB.uploadProfilePhoto(files, filename);
                respond.json("done"); 
            }).catch((error) => { console.log(error);});
        }); 
    }

    static checkFile(request, files){
        var filename = null;
        if (typeof files.upload_img == "undefined"){
            var file = files.edit_upload_img;
        } else if (typeof files.edit_upload_img == "undefined"){
            var file = files.upload_img.size
        }
        return new Promise((resolve, reject) =>{
            if(typeof file == "undefined"){
                resolve(filename);
            }
            if(file.size != 0){
                var sql = `SELECT AUTO_INCREMENT
                FROM information_schema.tables
                WHERE table_name = "account"
                AND table_schema = "restaurant_review"`;
                
                db.query(sql, function(error, result){
                    console.log("querrying?");
                    if (error) { throw error; }
                    else {
                        if (typeof files.upload_img == "undefined"){
                            var index = request.params.id;
                        } else{
                            var index = result[0]["AUTO_INCREMENT"]; 
                        }
                        filename = "profile_photo" + index + ".png";
                        resolve(filename);
                    }
                });
            }else{
                console.log(filename);
                resolve(filename);
                //return filename;
            }
        });
    }
    

     static addAccountDatabase(fields, filename){
        //console.log("folderLocation + Filename is " +  folderLocation + filename);
        return new Promise((resolve, reject) =>{
            if (filename == null){
                var pfpPath  = null;
            }else{
                var pfpPath = folderLocation + filename;
            }
            var accountObject = new Account(null, fields["register-username"], fields["register-password"], fields["register-first-name"],
            fields["register-last-name"], fields["register-gender"], fields["register-address"], fields["register-mobile"], 
            fields["register-email"], pfpPath);

            var sql = `INSERT INTO restaurant_review.account (user_id, password, first_name,  last_name, gender, address,
                mobile_number, email_address, profile_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            
            var values = [accountObject.getUserId(), accountObject.getPassword(), accountObject.getFirstName(),
                accountObject.getLastName(), accountObject.getGender(), accountObject.getAddress(), accountObject.getMobileNumber(),
                accountObject.getEmailAddress(), accountObject.getProfilePhoto()];
            
            console.log(values);
            
            db.query(sql, values, function(error, result){
                if (error) { reject(error); }
                resolve(filename);
            });
        });

        
    }

    static uploadProfilePhoto(files, filename){
        
        if (filename == null) return;
        if (typeof files.upload_img == "undefined"){
            var file = files.edit_upload_img;
        } else if (typeof files.edit_upload_img == "undefined"){
            var file = files.upload_img.size
        }
        return new Promise((resolve, reject) =>{
            var oldPath = file.path;
            var newPath = process.cwd() + '/public' + folderLocation + filename;
            console.log(filename);
            console.log(newPath);
            fs.rename(oldPath,  newPath, (error) => {
                if(error) reject(error);
                console.log("Moved file!");
                resolve("Moved file!");    
            });
              
        });
    }
    // if the ID paramter is passed as a possible number, the correlated account_id is searched for,
    // but if it is a string, the correlated user_id AKA username is searched for
    getAccountData(request, respond){
        if ( isNaN(request.params.id) ){
            //console.log(request.params.username);
            //console.log("Here! Userrname")
            var accountID = request.params.id;
            var sql = "SELECT * FROM restaurant_review.account where user_id = ?";
        } else{
            //console.log("Using account id");
            var accountID = request.params.id;
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
        var form = new formidable.IncomingForm();
        form.parse(request, function (error, fields, files){
            if(error) respond.json(error);
            AccountDB.checkFile(request, files).then( (filename) => {
                return AccountDB.updateAccountDatabase(request,fields, filename);
            }).then((filename) => {
                console.log("Checking filename is"+ filename);
                AccountDB.uploadProfilePhoto(files, filename);
                respond.json("done"); 
            }).catch((error) => { console.log(error);});
        }); 
    }

    static updateAccountDatabase(request, fields, filename){
        return new Promise((resolve, reject) => {
            console.log(filename);
            var accountObject = new Account(request.params.id ,fields["profile-username"], fields["profile-password"], fields["profile-first-name"], fields["profile-last-name"],
                fields["profile-gender"], fields["profile-address"], fields["profile-mobile"], fields["profile-email"], folderLocation + filename);
                if (filename == null){
                    var sql = `UPDATE restaurant_review.account SET user_id = ?, password = ?, first_name = ?, last_name = ?, gender = ?,
                    address = ?, mobile_number = ?, email_address = ? WHERE account_id = ?`;
                    var values = [accountObject.getUserId(), accountObject.getPassword(), accountObject.getFirstName(),
                        accountObject.getLastName(), accountObject.getGender(), accountObject.getAddress(), accountObject.getMobileNumber(),
                        accountObject.getEmailAddress(), accountObject.getAccountId()];
                } else{
                    var sql = `UPDATE restaurant_review.account SET user_id = ?, password = ?, first_name = ?, last_name = ?, gender = ?,
                    address = ?, mobile_number = ?, email_address = ?, profile_photo = ? WHERE account_id = ?`;
                    var values = [accountObject.getUserId(), accountObject.getPassword(), accountObject.getFirstName(),
                        accountObject.getLastName(), accountObject.getGender(), accountObject.getAddress(), accountObject.getMobileNumber(),
                        accountObject.getEmailAddress(), accountObject.getProfilePhoto(), accountObject.getAccountId()];
                }                
                db.query(sql, values, function(error, result){
                    if (error) { 
                        throw error; 
                    }
                    else {  
                        resolve(filename);
                    }
                });
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