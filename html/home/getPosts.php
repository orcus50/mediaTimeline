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

    //You can login
    if ($result->num_rows == 1) { 

        //Get all active subscriptions
        $quer = "SELECT supplierID from subscriptions where user = '".$user."';";
        
        $result = $conn->query($quer);

        $values = "";
        $num = 0;

        while ($row = mysqli_fetch_assoc($result)) 
        {
            foreach ($row as $col => $val) {
                if ($col == "supplierID" and $num == 0){
                    $values = $values."supplierID = ".$val;
                    $num = 1;
                }
                else if ($col == "supplierID" and $num == 1){
                    $values = $values." or supplierID = ".$val;
                }
            }
        }
        
        $quer = "SELECT * from content where ".$values." order by time desc;";
        $result = $conn->query($quer."\n");

        while ($row = mysqli_fetch_assoc($result)) 
        {
            //URL NAME HOST ICON TIME
            foreach ($row as $col => $val) {

                if ($col == "url")
                    echo $val."\n";
                if ($col == "name")
                    echo $val."\n";
                if ($col == "time")
                    echo $val."\n";

                //Get supplierID values
                if ($col == "supplierID"){
                    $quer2 = "SELECT host,icon,name from suppliers where id = ".$val.";";
                    $result2 = $conn->query($quer2);

                    while ($row2 = mysqli_fetch_assoc($result2)) 
                    {
                        foreach ($row2 as $col2 => $val2) {
                            if ($col2 == "host")
                                echo $val2."\n";
                                if ($col2 == "icon")
                                    echo $val2."\n";
                                if ($col2 == "name")
                                    echo $val2."\n";
                        }
                    }
                }
            }
        }

    }
    
    $conn->close();
    
?>