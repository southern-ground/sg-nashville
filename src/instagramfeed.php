<?php
/**
 * Created by PhpStorm.
 * User: fst
 * Date: 9/13/16
 * Time: 5:10 PM
 */


// create curl resource
$ch = curl_init();

// set url
curl_setopt($ch, CURLOPT_URL, "https://api.instagram.com/v1/users/self/media/recent/?access_token=789619938.6cea823.093ea132e6564ee797ae9c67b8565d41");

//return the transfer as a string
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

// $output contains the output string
$output = curl_exec($ch);

// close curl resource to free up system resources
curl_close($ch);

header('Content-type: application/json');

// die(json_encode($data, JSON_FORCE_OBJECT));
die($output);

?>