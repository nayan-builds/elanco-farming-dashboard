<?php
include("includes/db_conn.php");
$result = $conn->query("SELECT * FROM crops");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/mobile.css">
    <link rel="stylesheet" media="only screen and (min-width: 720px)" href="css/desktop.css">
    <title>Crops | Elanco Farming Dashboard</title>
</head>
<body>
    <?php include('includes/header.php');?>
    <main>
        <header id="title-bar" class="title-bar">
            <h1>Crops</h1>
        </header>
        <div class="table-container">
            <table>
                <tr>
                    <th>Crop</th>
                    <th>PH</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                    <th>Light</th>
                    <th>Cost + Maintenance</th>
                    <th>Yield</th>
                    <th>Growth Time (Days)</th>
                </tr>
                <?php
                while($obj = $result->fetch_object()){
                    echo "<tr>";
                    echo "<td><a href=\"crop_info.php?crop={$obj->crop}\">{$obj->crop}</a></td>";
                    echo "<td>{$obj->minPH}-{$obj->maxPH}</td>";
                    echo "<td>{$obj->minTemperature}-{$obj->maxTemperature}</td>";
                    echo "<td>{$obj->minHumidity}-{$obj->maxHumidity}</td>";
                    echo "<td>{$obj->minLight}-{$obj->maxLight}</td>";
                    echo "<td>£{$obj->cost}</td>";
                    echo "<td>£{$obj->yield}</td>";
                    echo "<td>{$obj->time}</td>";
                    echo "</tr>";
                }
                ?>
            </table>
        </div>
    </main>
</body>
</html>
