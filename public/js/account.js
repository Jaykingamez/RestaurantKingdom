var response = "";
function login(){
    var credentials = new Object();
    credentials.username = document.getElementById("username").value;
    localStorage.setItem("username", credentials.username);
    credentials.password = document.getElementById("password").value;
    var request = new XMLHttpRequest();
    request.open("POST", "/login", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
        response = JSON.parse(request.responseText);
        if (response == "SUCCESS!"){
            window.location.href = "home.html";
        }
        //document.getElementById("loginForm").style.display="none";
        //document.getElementById("message").textContent = response.message;
    };
    request.send(JSON.stringify(credentials)); 
}
function displayImage(event){
    if (document.getElementById('register_profile_photo') == null){
        var image = document.getElementById('edit_profile_photo');
    } else{
        var image = document.getElementById('register_profile_photo');
    }
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
        if (response = "done!"){
            window.location.href = "index.html";
        }
    };
    request.send(formData);
}

function editProfile(){
    var formElement = document.getElementById("edit-profile-form");
    var formData = new FormData(formElement);
    var request = new XMLHttpRequest();
    request.open("PUT", "/profile/" + account[0]["account_id"], true);
    //request.setRequestHeader("Content-Type", "multipart/form-data");
    request.onload = function(){
        response = JSON.parse(request.responseText);
        if (repsonse = "done!"){
            username = formData.get("profile-username");
            localStorage.setItem("username", username);
            window.location.href = "home.html";
        }
    };
    request.send(formData);
}

function fetchAccountUsername(){
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();

        request.open('GET', account_url + "/" + username, true);

        //This command starts the calling of the accounts api
        request.onload = function() {
        //get all the account information into our account variable
        if (request.responseText.length > 2){
            account = JSON.parse(request.responseText);
            document.getElementById("home-profile-photo").src = account[0]["profile_photo"];
            document.getElementById("edit-profile-information").src = account[0]["profile_photo"];
            localStorage.setItem("account", request.responseText);
        }      
        resolve(request.responseText);
        };
        request.send();
    });
    
}

function fetchAccountId(accountId){
    return new Promise( (resolve, reject) =>{
        var request = new XMLHttpRequest();

        request.open('GET', account_url + "/" + accountId, true);

        //This command starts the calling of the accounts api
        request.onload = function() {
        //return this when request is returned
        resolve(JSON.parse(request.responseText));
        };

        request.send();
    });
    
}

function destroyAccountConfirm(){
    document.getElementById("profile-name").innerText = "Destroy account?";
    document.getElementById("profileMain").innerHTML = 
    `<p class="centered">
        Are you sure that you want to destroy your account? Such actions cannot be reversed.
    </p>

    <div class="centered">
        <button onclick="reloadPage()">
            Return
        </button>
        <button onclick="destroyAccount()">
            Destroy my account x)
        </button>
    </div>`
}

function destroyAccount(){

    var request = new XMLHttpRequest();
    request.open("DELETE", "/profile/" + JSON.parse(localStorage.getItem("account"))[0]["account_id"] , true);

    //This command starts the calling of the accounts api
    request.onload = function() {
        //return this when request is returned
        document.getElementById("profileMain").innerHTML = 
        `<p class="centered">
            Your account has been destroyed. To continue to 
            use the services of this site, you will need to create a
            new account.
        </p>

        <div class="centered">
            <button onclick="goToLogin()">
                Return to login page
            </button>
        </div>`
    };

    request.send();
    
}

function resetPassword(){
    var formData = new FormData();
    var accountDetails = JSON.parse(localStorage.getItem("account"))[0];
    formData.append("profile-username", accountDetails["user_id"]);
    formData.append("profile-password", document.getElementById("forgot-password"));
    formData.append("profile-first-name", accountDetails["first-name"])
    formData.append("profile-last-name", accountDetails["last-name"]);
    formData.append("profile-gender", accountDetails["gender"]);
    formData.append("profile-address", accountDetails["address"]);
    formData.append("profile-mobile", accountDetails["mobile-number"]);
    formData.append("profile-email", accountDetails["email"]);
    
    var request = new XMLHttpRequest();
    request.open("PUT", "/profile/" + account[0]["account_id"], true);
    //request.setRequestHeader("Content-Type", "multipart/form-data");
    request.onload = function(){
        response = JSON.parse(request.responseText);
        if (repsonse = "done!"){
            window.location.href = "index.html";
        }
    };
    request.send(formData);
}




    


