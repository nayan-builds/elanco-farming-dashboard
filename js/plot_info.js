async function fillTable(plot, startDate, endDate) {
    const table = document.getElementById("plot-table");
    const data = await getPlotDateRange("plot" + plot, startDate, endDate);
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



async function arrayDataInRange(plot, startDate, endDate) {
    const phGraph = document.getElementById('myChartph');
    const tempGraph = document.getElementById('myCharttemp');
    const humidGraph = document.getElementById('myCharthumid');
    const lightGraph = document.getElementById('myChartlight');

    const data = await getPlotDateRange("plot" + plot, startDate, endDate);

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
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
            y: {
                beginAtZero: false
            }
        }
    }

    new Chart(phGraph, {
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

    new Chart(tempGraph, {
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


    new Chart(humidGraph, {
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


    new Chart(lightGraph, {
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
}