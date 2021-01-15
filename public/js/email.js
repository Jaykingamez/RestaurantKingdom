function sendEmail(){
    console.log("Sending Email!");
    localStorage.setItem("username", document.getElementById("forgot-username").value);
    
    var requestEmail = new Object();

    requestEmail.username  = document.getElementById("forgot-username").value;

    //username = document.getElementById("forgot-username").value;
    fetchAccountUsername().then((returned_account) => {
        if(returned_account.length > 2){
            requestEmail.email_address = JSON.parse(returned_account)[0]["email_address"];

            var request = new XMLHttpRequest();
            request.open("POST", "/email", true);
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function(){
            };
            
            request.send(JSON.stringify(requestEmail));
        };
    });
}