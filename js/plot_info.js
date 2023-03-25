
async function getData(plot){
    const data = await getPlot("plot" + plot);
    fillTable(data);
    drawGraphs(data);
}

function fillTable(data) {
    const table = document.getElementById("plot-table");
    let averages = {
        ph: 0,
        temp: 0,
        humid: 0,
        light: 0
    }
    data.forEach(dateData => {
        averages.ph += dateData.PH;
        averages.temp += dateData.Temp_C;
        averages.humid += dateData.AVG_Humidity__;
        averages.light += dateData.AVG_Light__;
    });
    averages.ph = Number((averages.ph / data.length).toFixed(2));
    averages.temp = Number((averages.temp / data.length).toFixed(2));
    averages.humid = Number((averages.humid / data.length).toFixed(2));
    averages.light = Number((averages.light / data.length).toFixed(2));
    let content = "<tr>";
    content += "<td>" + averages.ph + "</td>";
    content += "<td>" + averages.temp + "</td>";
    content += "<td>" + averages.humid + "</td>";
    content += "<td>" + averages.light + "</td>";
    content += "</tr>";
    table.insertAdjacentHTML("beforeend", content);
}



function drawGraphs(data) {
    const phGraph = document.getElementById('myChartph');
    const tempGraph = document.getElementById('myCharttemp');
    const humidGraph = document.getElementById('myCharthumid');
    const lightGraph = document.getElementById('myChartlight');

    //Sort data based on date
    data.sort((a,b) => (a.Date.value > b.Date.value) ? 1 : ((b.Date.value > a.Date.value) ? -1 : 0));

    const date = []
    const ph = []
    const temp = []
    const humid = []
    const light = []

    data.forEach(dateData => {
        date.push(dateData.Date.value);
        ph.push(dateData.PH);
        temp.push(dateData.Temp_C);
        humid.push(dateData.AVG_Humidity__);
        light.push(dateData.AVG_Light__);
    });

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                min: '2022-01-01',
                max: '2022-12-31',
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
            y: {
                beginAtZero: false
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: context => {
                        const d = new Date(context[0].parsed.x);
                        const formattedDate = d.toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        });
                        return formattedDate;
                    }
                }
            }
        }
    }

    var phChart = new Chart(phGraph, {
        type: 'line',
        data: {
            labels: date,
            datasets: [
                {
                    label: 'pH',
                    backgroundColor: 'green',
                    borderColor: 'green',
                    data: ph,
                }]
        },
        options
    });

    var tempChart = new Chart(tempGraph, {
        type: 'line',
        data: {
            labels: date,
            datasets: [
                {
                    label: 'temperature',
                    backgroundColor: 'red',
                    borderColor: 'red',
                    data: temp,
                }]
        },
        options
    });


    var humidChart = new Chart(humidGraph, {
        type: 'line',
        data: {
            labels: date,
            datasets: [
                {
                    label: 'humidity',
                    backgroundColor: 'purple',
                    borderColor: 'purple',
                    data: humid,
                }]
        },
        options
    });


    var lightChart = new Chart(lightGraph, {
        type: 'line',
        data: {
            labels: date,
            datasets: [
                {
                    label: 'light',
                    backgroundColor: 'orange',
                    borderColor: 'orange',
                    data: light,
                }]
        },
        options
    });

    const monthInput = document.getElementById("month-input");
    monthInput.addEventListener("change", function(){filterCharts(monthInput)});

    function filterCharts(date){
        console.log("pog")
        console.log(phChart);
        const year = date.value.substring(0, 4);
        const month = date.value.substring(5, 7);
    
        //Gets the last day of the month
        const lastDay = (y, m) => {
            return new Date(y, m, 0).getDate();
        }
    
        const startDate = date.value + "-01";
        const endDate = date.value + "-" + lastDay(year, month);
        setChartBounds(startDate, endDate);
    
        function setChartBounds(min, max){
            phChart.options.scales.x.min = min;
            tempChart.options.scales.x.min = min;
            humidChart.options.scales.x.min = min;
            lightChart.options.scales.x.min = min;
        
            phChart.options.scales.x.max = max;
            tempChart.options.scales.x.max = max;
            humidChart.options.scales.x.max = max;
            lightChart.options.scales.x.max = max;
        
            phChart.update();
            tempChart.update();
            humidChart.update();
            lightChart.update();
        }
    }
}






