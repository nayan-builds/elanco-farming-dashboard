<?php
if(!isset($_GET["plot_num"])){
    header("Location: plots.php");
    exit();
}
$plot_num = $_GET["plot_num"];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/mobile.css">
    <link rel="stylesheet" media="only screen and (min-width: 720px)" href="css/desktop.css">
    <title>Plot <?php echo $plot_num; ?> | Elanco Farming Dashboard</title>
</head>
<body>
    <?php include('includes/header.php');?>
    <main>
        <header id="title-bar" class="title-bar">
            <h1>Plot <?php echo $plot_num; ?></h1>
        </header>
        <div id="date-filter">
            <form action="">
                <div>
                    <label for="start-date">Start Date:</label>
                    <input type="date" id="start-date" name="start_date">
                </div>
                <div>
                    <label for="end-date">End Date:</label>
                    <input type="date" id="end-date" name="end_date">
                </div>
                <input type="submit">
            </form>
        </div>
        <div class="table-container">
            <table>
                <tr>
                    <th>Average PH</th>
                    <th>Average Temperature</th>
                    <th>Average Humidity</th>
                    <th>Average Light</th>
                </tr>
            </table>
        </div>
        <canvas id="lineChart" style="width:100%;max-width:600px"></canvas>
<!--
        <canvas id="myChart" style="width:100%;max-width:600px"></canvas>
        <script>
            var xValues = [50,60,70,80,90,100,110,120,130,140,150];
            var yValues = [7,8,8,9,9,9,10,11,14,14,15];

            new Chart("myChart", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                fill: false,
                lineTension: 1/3,
                backgroundColor: "rgba(43,101,172,1.0)",
                borderColor: "rgba(43,101,172,0.1)",
                data: yValues
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                yAxes: [{ticks: {min: 6, max:16}}],
                }
            }
            });
        </script>
-->
    </main>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
  <script src="graphs.js"></script>
</body>
</html>
