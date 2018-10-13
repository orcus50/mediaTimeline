function onLoad(){
    
}

var passhash;

function check(){

    if (!valid()){
        document.getElementById("inputPassword").style.backgroundColor = "rgb(255,220,220)";
        document.getElementById("inputPassword2").style.backgroundColor = "rgb(255,220,220)";
    }
    else{
        document.getElementById("inputPassword").style.backgroundColor = "rgb(255,255,255)";
        document.getElementById("inputPassword2").style.backgroundColor = "rgb(255,255,255)";
        document.getElementById("alert").innerHTML = "";
    }

}

function checkUsername(){
    if (! /^[a-zA-Z0-9]+$/.test(document.getElementById("inputUsr").value)){
        document.getElementById("inputUsr").style.backgroundColor = "rgb(255,220,220)";
        return false;
    }
    else{
        document.getElementById("inputUsr").style.backgroundColor = "rgb(255,255,255)";
        document.getElementById("alert").innerHTML = "";
    }
    return true;

}

function signUp(){
    if (!valid()) return;
    if (!checkUsername()) return;

    passhash = md5(document.getElementById("inputPassword").value);

    $.ajax({
        type: 'POST',
        url: 'create.php',
        data: { user: document.getElementById("inputUsr").value, pass: passhash }, 
        success: function(d){
            if (d == ">Account_Created")
                window.location = '../home/index.html?user='+document.getElementById("inputUsr").value+"&password="+passhash;
            else
                document.getElementById("alert").innerHTML = "Username Taken";
        }
      });

}

function login(){

    if (!checkUsername()) return;

    var passhash = md5(document.getElementById("inputPassword").value);

    $.ajax({
        type: 'POST',
        url: 'login.php',
        data: { user: document.getElementById("inputUsr").value, pass: passhash},
        success: function(d){
            if (d == "Valid"){
                window.location = '../home/index.html?user='+document.getElementById("inputUsr").value+"&password="+passhash;
            }
            else{
                document.getElementById("alert").innerHTML = "Wrong password";
            }
            
        }
      });

}


function valid(){
    if (document.getElementById("inputPassword").value.length <= 3){
        
        document.getElementById("alert").innerHTML = "Passwords need to be longer";
        return false;
    }
    if (document.getElementById("inputPassword").value != document.getElementById("inputPassword2").value){
        document.getElementById("alert").innerHTML = "Password must match";
        return false;
    }
    document.getElementById("alert").innerHTML = "";
    return true;
        
}
