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
