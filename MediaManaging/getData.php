<?php

    $command = "node NodeJs/hostImporter.js ".$_POST['url'];

    exec($command , $output , $return_var);
    echo (implode("[br]",$output));

?>