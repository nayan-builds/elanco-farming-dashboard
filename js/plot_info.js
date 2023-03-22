async function fillTable(plot, startDate, endDate){
    const table = document.getElementById("plot-table");
    const data = await getPlotDateRange("plot"+plot, startDate, endDate);
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
    content += "<td>"+averages.ph+"</td>";
    content += "<td>"+averages.temp+"</td>";
    content += "<td>"+averages.humid+"</td>";
    content += "<td>"+averages.light+"</td>";
    content += "</tr>";
    table.insertAdjacentHTML("beforeend", content);
}



async function arrayDataInRange(plot, startDate, endDate){
    const ctx = document.getElementById('myChart');
    const data = await getPlotDateRange("plot"+plot, startDate, endDate);

    
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


//for all the y axis lines
// var phLine = {
//     label: "pH",
//     data: ph,
//     borderColor: 'red'
// };
// var temperatureLine = {
//     label: "temperature",
//     data: temp,
//     borderColor: 'blue'
// };
// var humidityLine = {
//     label: "humidity",
//     data: humid,
//     borderColor: 'green'
// };
// var lightLine = {
//     label: "light",
//     data: light,
//     borderColor: 'yellow'
// };


// var dates = {
//     labels: date,
//     datasets: [phLine, temperatureLine, humidityLine, lightLine]
// };

console.log(date);
console.log(ph);


new Chart(ctx, {
    type: 'line',
    // data: dates,
    data: {
        labels: date,
        datasets: [
            {
                backgroundColor: 'rgb(0, 255, 0)',
                data: ph,
                barThickness: 50
            }]
      },
      
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
      

    // options: {
    //     scales: {
    //         x: {
    //             type: 'time',
    //             time: {
    //                 unit: 'day'
    //             }
    //         },
    //         y: {
    //             beginAtZero: true
    //         }
    //     }
    // }
});
}