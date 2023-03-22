// function graphing(id, xValues, yValues){
//     new Chart(id, {
//         type: "line",
//         data: {
//           labels: xValues,
//           datasets: [{
//             fill: false,
//             lineTension: 1/3,
//             backgroundColor: "rgba(43,101,172,1.0)",
//             borderColor: "rgba(43,101,172,0.1)",
//             data: yValues
//           }]
//         },
//         options: {
//             legend: {display: false},
//             scales: {
//               yAxes: [{ticks: {min: 6, max:16}}],
//             }
//           }
//       });
// }
// var xValues = [1,2,3,4,5,6];
// var yValues = [6,9,12,12,13];
// graphing('lineChart',xValues,yValues);







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
        type: 'scatter',
        data: dates,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
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
    })
}
