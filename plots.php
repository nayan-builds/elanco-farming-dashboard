<?php
include('api_access.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/mobile.css">
    <link rel="stylesheet" media="only screen and (min-width: 720px)" href="css/desktop.css">
    <title>Plots | Elanco Farming Dashboard</title>
</head>
<body>
    <?php include('includes/header.php');?>
    <main>
        <header id="title-bar" class="title-bar">
            <h1>Plots</h1>
        </header>
        <div class="table-container">
            <table>
                <tr>
                    <th>Plot</th>
                    <th>Average PH</th>
                    <th>Average Temperature</th>
                    <th>Average Humidity</th>
                    <th>Average Light</th>
                </tr>
                <?php
                for($plot_num = 1; $plot_num <= 10; $plot_num++){
                    $plot_id = "plot".$plot_num;
                    $api = new APIGet();
                    $data = $api->get_plot_averages($plot_id);
                    echo "<tr>";
                    echo "<td><a href=\"plot_info.php?plot_num={$plot_num}\">{$plot_num}</a></td>";
                    echo "<td>{$data->ph}</td>";
                    echo "<td>{$data->temp}</td>";
                    echo "<td>{$data->humidity}</td>";
                    echo "<td>{$data->light}</td>";
                    echo "</tr>";
                }
                ?>
            </table>
        </div>
    </main>
</body>
</html>
