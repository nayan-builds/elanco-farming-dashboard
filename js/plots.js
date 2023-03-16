function fillPlotTable(){
    let table = document.getElementById("plot-table");
    for(let i = 1; i <= 10; i++){
        let plotid = "plot"+i;
        let url = "https://sampledata.elancoapps.com/data/plot/"+plotid;
        $.getJSON(url, (data)=>{
            //Callback function
            data = data[0];
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
            averages.ph /= data.length;
            averages.temp /= data.length;
            averages.humid /= data.length;
            averages.light /= data.length;
            let content = "<tr>";
            content += "<td><a href=\"plot_info.php?plot_num="+i+"\">"+i+"</a></td>";
            content += "<td>"+averages.ph+"</td>";
            content += "<td>"+averages.temp+"</td>";
            content += "<td>"+averages.humid+"</td>";
            content += "<td>"+averages.light+"</td>";
            content += "</tr>";
            table.insertAdjacentHTML("beforeend", content);
        })
    }
}

fillPlotTable();