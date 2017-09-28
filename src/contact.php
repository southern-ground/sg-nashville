<?php

$data = [];

if (count($_POST) === 0) {

    $data["error"] = 1;

} else {

    foreach ($_POST as $key => $value) {
        $data[$key] = $value;
    }

    $data["mail"] = 0;
    $data["secondary"] = 0;

    $message = "FROM: " . $data['email'] . "\r\n" . "COMPANY: " . $data['company'] . "\r\n" . "MESSAGE:\r\n" . str_replace("\n", "\r\n", $data['message']);
    $message = wordwrap($message, 70, "\r\n");

    $headers = 'From: info@southerngroundartists.com' . "\r\n" .
        'Reply-To: ' . $data['email'] . "\r\n" .
        'BCC: ferris@southernground.com,info@southerngroundnashville.com\r\n' .
        'X-Mailer: PHP/' . phpversion();

    // $data["headers"] = $headers;
    // $data["message"] = $message;

    // INI Settings for Liberty.
    ini_set('SMTP', SMTP_SERVER);
    ini_set('smtp_port', 25);

    $data["error"] = mail("info@southerngroundartists.com", "SGN Contact Email", $message, $headers) ? "0" : "1";

}

header('Content-type: application/json');

die(json_encode($data, JSON_FORCE_OBJECT));

?>