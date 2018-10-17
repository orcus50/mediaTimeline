<?php

    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    $user = $_POST["user"];
    $pass = $_POST["pass"];
    $name = $_POST["name"];

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

    //You can login
    if ($result->num_rows == 1) { 

        $id = "";

        $quer = "SELECT id from suppliers where name = '".$name."';";
        echo $quer;
        $result = $conn->query($quer);
        while ($row = mysqli_fetch_assoc($result)) 
            foreach ($row as $col => $val) 
                if ($col == "id")
                    $id = $val;
            
        $quer = "delete from subscriptions where supplierID = ".$id.";";
        echo $quer;
        $result = $conn->query($quer);
        
    }

    
    $conn->close();
    
?>