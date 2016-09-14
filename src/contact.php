<?php

$data = [];

if(count($_POST) === 0){
    $data["error"] = 1;
}else{
    foreach($_POST as $key=>$value){
        $data[$key] = $value;
    }
    $data["error"] = 0;
    $message = "FROM: " . $data['email'] . "\n" . "RE: " . $data['venue'] . "\n" . "Message:\n" . str_replace("\n.", "\n..", $data['message']);
    $headers = 'From: info@southerngroundnashville.com' . "\r\n" .
        'Reply-To: ' . $data[email] . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    $data["mail"] = mail ( "ferris@southernground.com", "SGN Contact Re: " + $data['venue'] , $message, $headers );
}

header('Content-type: application/json');

die(json_encode($data, JSON_FORCE_OBJECT));

?>