var response = "";
function login(){
    var credentials = new Object();
    credentials.username = document.getElementById("username").value;
    credentials.password = document.getElementById("password").value;
    var request = new XMLHttpRequest();
    request.open("POST", "/login", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
        response = JSON.parse(request.responseText);
        if (response = "SUCCESS!"){
            username = credentials.username;
            window.location.href = "home.html";
        }
        //document.getElementById("loginForm").style.display="none";
        //document.getElementById("message").textContent = response.message;
    };
    request.send(JSON.stringify(credentials)); 
}
function displayImage(event){
    var image = document.getElementById('register_profile_photo');
    image.src = URL.createObjectURL(event.target.files[0]);
}

function register(){
    var formElement = document.getElementById("register-form");
    var formData = new FormData(formElement);

    var request = new XMLHttpRequest();
    request.open("POST", "/register", true);
    //request.setRequestHeader("Content-Type", "multipart/form-data");
    request.onload = function(){
        response = JSON.parse(request.responseText);
        if (repsonse = "done!"){
            window.location.href = "index.html";
        }
    };
    request.send(formData);
}

function fetchAccount(){
    var request = new XMLHttpRequest();

    request.open('GET', account_url + "/" + username, true);

    //This command starts the calling of the accounts api
    request.onload = function() {
    //get all the account information into our account variable
    account = JSON.parse(request.responseText);
    };

    request.send();
}


