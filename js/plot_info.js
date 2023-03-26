
async function getData(plot){
    const data = await getPlot("plot" + plot);
    fillTable(data);
    drawGraphs(data);
    getRecommendedCrops(1, 1);
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
        tension: 0.5,
        maintainAspectRatio: false,
        scales: {
            x: {
                min: '2022-01-01',
                max: '2022-12-31',
                type: 'time',
                time: {
                    unit: 'month'
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
        console.log(date.value)
        if (date.value == ''){
            options.scales.x.time.unit = 'month';
        }
        else{
            options.scales.x.time.unit = 'day';
        }
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
            options.scales.x.min = min;
        
            options.scales.x.max = max;
        
            phChart.update();
            tempChart.update();
            humidChart.update();
            lightChart.update();
        }
    }
}

async function getRecommendedCrops(data, startDate){
    //Getting crop data in form:
    // [{
    //     type: 'type',
    //     ph: {
    //         min: 'minPH',
    //         max: 'maxPH',
    //     },
    //     temp: {
    //         min: 'minPH',
    //         max: 'maxPH',
    //     },
    //     humid: {
    //         min: 'minPH',
    //         max: 'maxPH',
    //     },
    //     light: {
    //         min: 'minPH',
    //         max: 'maxPH',
    //     },
    //     cost: 'cost',
    //     yield: 'yield',
    //     time: 'time'
    // }]
    let cropData = [];
    try{
        const response = await fetch('includes/get_crop_json.php');
        cropData = await response.json();
    } catch (error) {
        console.log(error);
    }


    console.log(cropData);
    cropData.forEach(crop => {
        const start = new Date(startDate);
        const end = start;
        end.setDate(end.getDate() + crop.time)
        const getYear = end.toLocaleString("default", {year: 'numeric'});
        const getMonth = end.toLocaleString("default", {month: '2-digit'});
        const getDay = end.toLocaleString("default", {day: '2-digit'});
        console.log(getYear + "-" + getMonth + "-" + getDay);
        const plotData = [] //Need to get plot data for days from start to growth time of crop
        let outOfRangeCount = 0
        plotData.forEach(plotDateData => {
            if(plotDateData.PH < crop.ph.min || plotDateData.PH > crop.ph.max){
                outOfRangeCount++;
            }
            if(plotDateData.Temp_C < crop.temp.min || plotDateData.Temp_C > crop.temp.max){
                outOfRangeCount++;
            }
            if(plotDateData.AVG_Humidity__ < crop.humid.min || plotDateData.AVG_Humidity__ > crop.humid.max){
                outOfRangeCount++;
            }
            if(plotDateData.AVG_Light__ < crop.light.min || plotDateData.AVG_Light__ > crop.light.max){
                outOfRangeCount++;
            }
        });
        crop.out = outOfRangeCount;
    });
    cropData.sort((a,b) => (a.out < b.out) ? 1 : ((b.out < a.out) ? -1 : 0));
}





