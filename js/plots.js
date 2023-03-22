//This is a messy solution but it was difficult to find a work around
//for the array.push() function passing by reference rather than value.
async function fillPlotTable(){
    const table = document.getElementById("plot-table");
    const allData = await getAll();
    class PlotData{

        constructor(ph, temp, humid, light, count){
            this.averages = {
                ph: 0,
                temp: 0,
                humid: 0,
                light: 0
            }
            this.averages.ph = ph;
            this.averages.temp = temp;
            this.averages.humid = humid;
            this.averages.light = light;
            this.count = count;
        }
    };
    let plotsAverages = [];
    let prevPlot = "plot1";
    let ph = 0;
    let temp = 0;
    let humid = 0;
    let light = 0;
    let count = 0;
    allData.forEach(data => {
        if(prevPlot != data.Plot){
            plotsAverages.push(new PlotData(ph, temp, humid, light, count));
            ph = 0;
            temp = 0;
            humid = 0;
            light = 0;
            count = 0;
            prevPlot = data.Plot;
        }
        ph += data.PH;
        temp += data.Temp_C;
        humid += data.AVG_Humidity__;
        light += data.AVG_Light__;
        count += 1;
    });
    plotsAverages.push(new PlotData(ph, temp, humid, light, count));
    plotsAverages.forEach((plot, index) => {
        plot.averages.ph = Number((plot.averages.ph / plot.count).toFixed(2));
        plot.averages.temp = Number((plot.averages.temp / plot.count).toFixed(2));
        plot.averages.humid = Number((plot.averages.humid / plot.count).toFixed(2));
        plot.averages.light = Number((plot.averages.light / plot.count).toFixed(2));
        let content = "<tr>";
        content += "<td><a href=\"plot_info.php?plot_num="+(index+1)+"\">"+(index+1)+"</a></td>";
        content += "<td>"+plot.averages.ph+"</td>";
        content += "<td>"+plot.averages.temp+"</td>";
        content += "<td>"+plot.averages.humid+"</td>";
        content += "<td>"+plot.averages.light+"</td>";
        content += "</tr>";
        table.insertAdjacentHTML("beforeend", content);
    });
}

fillPlotTable();

