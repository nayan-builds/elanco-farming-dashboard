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
        <div id="filter-bar">
            <h2>Filter</h2>
            <div id="date-filter">
                <form action="" method="get">
                    <input type="hidden" name="plot_num" value="<?php echo $plot_num?>">
                    <div>
                        <label for="start-date">Start Date:</label>
                        <input type="date" id="start-date" name="start_date" min="2022-01-01" max="2022-12-31" value="<?php
                        if(isset($_GET["start_date"])){
                            echo $_GET["start_date"];
                        }
                        else{
                            echo "2022-01-01";
                        }
                        ?>">
                    </div>
                    <div>
                        <label for="end-date">End Date:</label>
                        <input type="date" id="end-date" name="end_date" min="2022-01-01" max="2022-12-31" value="<?php
                        if(isset($_GET["end_date"])){
                            echo $_GET["end_date"];
                        }
                        else{
                            echo "2022-12-31";
                        }
                        ?>">
                    </div>
                    <input type="submit">
                </form>
            </div>
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

        <div class="flex-graph">
            <div class="graph-container">
                <canvas id="myChartph"></canvas>
            </div>
            <div class="graph-container">
                <canvas id="myCharttemp"></canvas>
            </div>
            <div class="graph-container">
                <canvas id="myCharthumid"></canvas>
            </div>
            <div class="graph-container">
                <canvas id="myChartlight"></canvas>
            </div>
        </div>

    </main>
    <script src="js/api.js"></script>
    <script src="js/plot_info.js"></script>
    <script>
        var $_GET = <?php echo json_encode($_GET); ?>;
        var plot = $_GET['plot_num'];

        if ($_GET.hasOwnProperty('start_date') && $_GET.hasOwnProperty('end_date')){
            fillTable(plot, $_GET['start_date'], $_GET['end_date']);
            arrayDataInRange(plot, $_GET['start_date'], $_GET['end_date']);
        }
        else{
            fillTable(plot, "2022-01-01", "2022-12-31");
            arrayDataInRange(plot, "2022-01-01", "2022-12-31");
        }
    </script>
</body>

</html>