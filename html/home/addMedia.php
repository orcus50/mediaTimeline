<?php

    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    $user = $_POST["user"];
    $pass = $_POST["pass"];
    $url = $_POST["url"];

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

    $url = $_POST["url"];

    $quer = "SELECT * from users where username = '".$user."' and password = '".$pass."';";
    $result = $conn->query($quer);

    //You can login
    if ($result->num_rows == 1) { 

        $command = "node ../hostImporter.js ".$_POST['url'];
        exec($command , $output , $return_var);

        $host = explode("?=", $output[1])[1];
        $name = explode("?=", $output[2])[1];
        $icon = explode("?=", $output[3])[1];
        $chapters = explode("?=", $output[4])[1];

        $quer = "SELECT * from suppliers where url = '".$url."';";
        $result2 = $conn->query($quer);

        //Doesnt exist? add it
        if ($result2->num_rows == 0){
            //Add media to list of tracked media globaly
            $quer2 = "insert into suppliers (url, host, name, icon, contentCount) values ('".$url."', '".$host."', '".$name."', '".$icon."', ".$chapters.");";
            $result = $conn->query($quer2);
        }

        
        //Get id of media
        $quer = "SELECT * from suppliers where url = '".$url."';";
        $result = $conn->query($quer);

        while ($row = mysqli_fetch_assoc($result)) 
        {
            foreach ($row as $col => $val) {
                if ($col == "id")
                    $sub = $val;
            } 
        }

        $quer = "select * from subscriptions where user = '".$user."' and supplierID = '".$sub."';";
        $result = $conn->query($quer);
        
        //R U subbed?
        if ($result->num_rows == 0){
            //Subscribe to this media yourself
            $quer2 = "insert into subscriptions (user, supplierID) values ('".$user."', '".$sub."');";
            $result = $conn->query($quer2);
        }
    }

    
    $conn->close();
    
?>