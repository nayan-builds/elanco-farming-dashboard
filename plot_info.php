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
            <table>
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

        <script>
            const xlabels = [];
            const yph = [];
            const ytemperature = [];
            const yhumidity = [];
            const ylight = [];

            plotChart();

            async function plotChart() {
                await getData();

                const ctx = document.getElementById('myChart');

                //for all the y axis lines
                var phLine = {
                    label: "pH",
                    data: yph,
                    borderColor: 'red'
                };
                var temperatureLine = {
                    label: "temperature",
                    data: ytemperature,
                    borderColor: 'blue'
                };
                var humidityLine = {
                    label: "humidity",
                    data: yhumidity,
                    borderColor: 'green'
                };
                var lightLine = {
                    label: "light",
                    data: ylight,
                    borderColor: 'yellow'
                };

                

                var dates = {
                    labels: xlabels,
                    datasets: [phLine, temperatureLine, humidityLine, lightLine]
                };

                new Chart(ctx, {
                    type: 'line',
                    data: dates,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }


            //get the date from csv file
            getData();
            async function getData() {
                const response = await fetch('test.csv');
                //test.cvs is just a smaller version of the full sensor_data.csv file
                //too many datapoints makes the full graph with sensor_data.csv messy
                const data = await response.text();

                const table = data.split('\n').slice(1);
                table.forEach(row => {
                    const columns = row.split(',');
                    const date = columns[2];
                    xlabels.push(date);
                    const ph = columns[3];
                    yph.push(ph);
                    const temperature = columns[4];
                    ytemperature.push(temperature);
                    const humidity = columns[5];
                    yhumidity.push(humidity);
                    const light = columns[6];
                    ylight.push(light);
                    console.log(date, ph, temperature, humidity, light)
                })
            }
        </script>
    </main>
</body>

</html>