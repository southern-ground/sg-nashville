<?php

$data = [];

if(count($_POST) === 0){
    $data["error"] = 1;
}else{
    foreach($_POST as $key=>$value){
        $data[$key] = $value;
    }
    $data["error"] = 0;
    $message = "FROM: " . $data['email'] . "\n" . "COMPANY: " . $data['company'] . "\n" . "MESSAGE:\n\n" . str_replace("\n.", "\n..", $data['message']);
    $headers = 'From: info@southerngroundartists.com' . "\r\n" .
        'Reply-To: ' . $data['email'] . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    $data["mail"] = mail ( "info@southerngroundartists.com", "SGN Contact Email", $message, $headers );
    $data["secondary"] = mail ( "ferris@southernground.com", "SGN Contact Email", $message, $headers );
}

header('Content-type: application/json');

die(json_encode($data, JSON_FORCE_OBJECT));

?>