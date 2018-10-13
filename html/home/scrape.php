<?php

    $url = $_POST['url'];
    if (strpos($_POST['url'], ';') !== false) {
        echo ("Failed hehehe");
        die();
    }

    $command = "node ../hostImporter.js ".$_POST['url'];
    exec($command , $output , $return_var);
    echo (implode("\n",$output));

    //See if you are allready subbed
    
    $user = $_POST["user"];
    $pass = $_POST["pass"];
    if (!preg_match('/^[a-zA-Z0-9]+$/',$user) || !preg_match('/^[a-zA-Z0-9]+$/',$pass))
        die();

    $servername = "localhost";
    $username = "root";
    $password = "pass";

    // Create connection
    $conn = new mysqli($servername, $username, $password, 'mediaTracker');
    $quer = "SELECT * from users where username = '".$user."' and password = '".$pass."';";
    $result = $conn->query($quer);

    //You can login
    if ($result->num_rows == 1) { 
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
        if ($result->num_rows == 1){
            echo "\nsubbed?=yes";
        }
        else{
            echo "\nsubbed?=no";
        }

    }  
    else{
        echo "\nsubbed?=nope";
    }

?>