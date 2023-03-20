<?php
if (!isset($_GET["plot_num"])) {
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
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
    <title>Plot <?php echo $plot_num; ?> | Elanco Farming Dashboard</title>
</head>
<body>
    <?php include('includes/header.php'); ?>
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
            <table id="plot-table">
                <tr>
                    <th>Average PH</th>
                    <th>Average Temperature</th>
                    <th>Average Humidity</th>
                    <th>Average Light</th>
                </tr>
            </table>
        </div>

        <div>
            <canvas id="myChart"></canvas>
        </div>

    </main>
    <script src="graphs.js"></script>
</body>

</html>