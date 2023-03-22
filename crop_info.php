<?php
if(!isset($_GET["crop"])){
    header("Location: crops.php");
    exit();
}
include("includes/db_conn.php");
$crop = $_GET["crop"];
$stmt = $conn->prepare("SELECT * FROM crops WHERE crop = ?");
$stmt->bind_param("s", $crop);
$stmt->execute();
$result = $stmt->get_result();
$obj = $result->fetch_object();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/mobile.css">
    <link rel="stylesheet" media="only screen and (min-width: 720px)" href="css/desktop.css">
    <title><?php echo $obj->crop;?> | Elanco Farming Dashboard</title>
</head>
<body>
    <?php include('includes/header.php');?>
    <main>
        <header id="title-bar" class="title-bar">
            <h1><?php echo $obj->crop;?></h1>
        </header>
        <div class="table-container">
            <table>
                <tr>
                    <th>PH</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                    <th>Light</th>
                    <th>Cost + Maintenance</th>
                    <th>Yield</th>
                    <th>Growth Time (Days)</th>
                </tr>
                <tr>
                    <td><?php echo "{$obj->minPH}-{$obj->maxPH}";?></td>
                    <td><?php echo "{$obj->minTemperature}-{$obj->maxTemperature}";?></td>
                    <td><?php echo "{$obj->minHumidity}-{$obj->maxHumidity}";?></td>
                    <td><?php echo "{$obj->minLight}-{$obj->maxLight}";?></td>
                    <td><?php echo "£{$obj->cost}";?></td>
                    <td><?php echo "£{$obj->yield}";?></td>
                    <td><?php echo $obj->time;?></td>
                </tr>
            </table>
        </div>
    </main>
</body>
</html>
