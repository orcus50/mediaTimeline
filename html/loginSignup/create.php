><?php

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
  
    $quer = "SELECT * from users where username = '".$user."';";

    $result = $conn->query($quer);
   
    if ($result->num_rows != 0) {
        echo "Username_Taken";
        $conn->close();
    }
    else{

        $quer = "INSERT INTO users (username, password) VALUES ('".$user."','".$pass."');";

        $out = $conn->query($quer);
        $conn->close();

        echo "Account_Created";
    }
?>