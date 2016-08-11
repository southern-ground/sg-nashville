<?php

$data = [];

if(count($_POST) === 0){
    $data["error"] = 1;
}else{
    foreach($_POST as $key=>$value){
        $data[$key] = $value;
    }
    $data["error"] = 0;
}

header('Content-type: application/json');

die(json_encode($data, JSON_FORCE_OBJECT));

?>