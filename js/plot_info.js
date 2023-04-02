async function getData(plot){
    const data = await getPlot("plot" + plot);
    //Sort data based on date
    data.sort((a,b) => (a.Date.value > b.Date.value) ? 1 : ((b.Date.value > a.Date.value) ? -1 : 0));

    fillTable(data);
    drawGraphs(data);
    
    const dateInput = document.getElementById("start-date");
    dateInput.addEventListener("change", function(){displayRecommended(data, dateInput.value)})
}

function fillTable(data) {
    const table = document.querySelector("#plot-table>tbody");
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

    cropData.forEach(crop => {
        const plotData = getPlotData(data, startDate, crop.time);
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
        let rating = outOfRangeCount / crop.time;
        crop.rating = rating;
    });

    //Lower rating is better
    cropData.sort((a,b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0));
    return cropData;
}

function getPlotData(data, startDate, days){
    const start = new Date(startDate);
    const startCompare = start.toLocaleString("default", {month: '2-digit'}) + "-" + start.toLocaleString("default", {day: '2-digit'})

    //Adds days to start date to get end
    const end = new Date(startDate);
    end.setDate(end.getDate() + days);
    const endCompare = end.toLocaleString("default", {month: '2-digit'}) + "-" + end.toLocaleString("default", {day: '2-digit'})
    if(start < end){
        return data.filter((plotData) => {
            let date = plotData.Date.value.substring(5);
            return date >= startCompare && date <= endCompare;
        });
    }
    else{
        return date.filter((plotData) => {
            let date = plotData.Date.value.substring(5);
            return (date >= startCompare && date <= "12-31") || (date >= "01-01" && date <= endCompare);
        })
    }
}

async function displayRecommended(data, startDate){
    const recommended = await getRecommendedCrops(data, startDate);
    const container = document.getElementById("crop-container");
    container.innerHTML = "";
    for(let i = 0; i < 3; i++){
        let crop = recommended[i];
        let content = "<div class=\"crop\">";
        content += "<h3>"+crop.type+"</h3>";
        content += "<ul>";
        content += "<li>pH: "+crop.ph.min+"-"+crop.ph.max+"</li>";
        content += "<li>Temperature: "+crop.temp.min+"-"+crop.temp.max+"</li>";
        content += "<li>Humidity: "+crop.humid.min+"-"+crop.humid.max+"</li>";
        content += "<li>Light: "+crop.light.min+"-"+crop.light.max+"</li>";
        content += "<li>Cost + Maintenance: £"+crop.cost+"</li>";
        content += "<li>Yield: £"+crop.yield+"</li>";
        content += "<li>Growth Time (Days): "+crop.time+"</li>";
        content += "</ul>";
        content += "</div>";
        container.insertAdjacentHTML("beforeend", content);
    }
    container.scrollIntoView();
}





