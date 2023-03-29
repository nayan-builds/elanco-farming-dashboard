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
            <table id="crop-table">
                <tr>
                    <th class="filter" id="type-filter">Crop</th>
                    <th class="filter" id="ph-filter">PH</th>
                    <th class="filter" id="temp-filter">Temperature</th>
                    <th class="filter" id="humid-filter">Humidity</th>
                    <th class="filter" id="light-filter">Light</th>
                    <th class="filter" id="cost-filter">Cost + Maintenance</th>
                    <th class="filter" id="yield-filter">Yield</th>
                    <th class="filter" id="time-filter">Growth Time (Days)</th>
                </tr>
            </table>
        </div>
    </main>
    <script src="js/crops.js"></script>
</body>
</html>
