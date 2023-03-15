function fillPlotTable(){
    let table = document.getElementById("plot-table");
    for(let i = 1; i <= 10; i++){
        let plotid = "plot"+i;
        let url = "https://sampledata.elancoapps.com/data/plot/"+plotid;
        $.getJSON(url, (data)=>{
            //Callback function
            data.forEach(dateData => {
                let content = "<tr>";
                content += "<td><a href=\"plot_info.php?plot_num="+i+"\">"+i+"</a></td>";
                content += "<td>"+dateData.PH+"</td>";
                content += "<td>"+dateData.Temp_C+"</td>";
                content += "<td>"+dateData.AVG_Humidity__+"</td>";
                content += "<td>"+dateData.AVG_Light__+"</td>";
                content += "</tr>";
                table.insertAdjacentHTML("beforeend", content);
            });
        })
    }
}

fillPlotTable();