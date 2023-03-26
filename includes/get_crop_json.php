<?php
include("db_conn.php");
$result = $conn->query("SELECT * FROM crops");
$returnAr = [];
while($obj = $result->fetch_object()){
    array_push($returnAr, (object)[
        'type' => $obj->crop,
        'ph' => (object)['min' => (float)$obj->minPH, 'max' => (float)$obj->maxPH],
        'temp' => (object)['min' => (float)$obj->minTemperature, 'max' => (float)$obj->maxTemperature],
        'humid' => (object)['min' => (int)$obj->minHumidity, 'max' => (int)$obj->maxHumidity],
        'light' => (object)['min' => (int)$obj->minLight, 'max' => (int)$obj->maxLight],
        'cost' => (int)$obj->cost,
        'yield' => (int)$obj->yield,
        'time' => (int)$obj->time
    ]);
}
echo json_encode($returnAr);
?>