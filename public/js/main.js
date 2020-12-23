"use strict";

window.fbAsyncInit = function() {
    FB.init({
        appId      : '735783033951073',
        cookie     : true,
        xfbml      : true,
        version    : 'v8.0'
    });
        
    FB.AppEvents.logPageView();
    
    // Check if the current user is logged in and has authorized the app
    //FB.getLoginStatus(checkLoginStatus);
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
       });
    
       function statusChangeCallback(response){
           console.log("Hello!");
           if (response.status === 'connected'){

               //display user data 
               FB.api('/me', {fields: 'name, email'}, 
               function(response){
                    console.log(response);
                    console.log("Successful login for: " + response.name);
                    console.log(response.name);
                    console.log(response.email);
                    console.log(response.birthday);
                    console.log(response.hometown);
                    console.log(response.education);
                    console.log(response.website);
                    console.log(response.work);
               });

           }else{
               //not logged in
               FB.login(function(response){
                    console.log(response);
               }, {
                    scope: 'email',
                    return_scopes: true
               });
           }
       }

        
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
1}(document, 'script', 'facebook-jssdk'));


      


 // Check the result of the user status and display login button if necessary
 function checkLoginStatus(response) {
    if(response && response.status == 'connected') {
        alert('User is authorized');
    }
}