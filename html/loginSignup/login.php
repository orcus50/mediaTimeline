<?php

    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    $user = $_POST["user"];
    $pass = $_POST["pass"];

    if (!preg_match('/^[a-zA-Z0-9]+$/',$user) || !preg_match('/^[a-zA-Z0-9]+$/',$pass))
        die();

    $servername = "localhost";
    $username = "root";
    $password = "pass";

    // Create connection
    $conn = new mysqli($servername, $username, $password, 'mediaTracker');

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    $quer = "SELECT * from users where username = '".$user."' and password = '".$pass."';";

    $result = $conn->query($quer);
    $conn->close();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if ($row["password"]==$pass){
            echo "Valid";
        }
    } else {
        echo "Invalid";
    }
    
?>