async function getAll(){
    const url = "https://sampledata.elancoapps.com/data/";
    return await fetchResponse(url);
}

async function getPlot(plotid){
    const url = "https://sampledata.elancoapps.com/data/plot/"+plotid;
    return await fetchResponse(url);
}

async function getPlotDate(plotid, date){
    const url = "https://sampledata.elancoapps.com/data/plot/"+plotid+"/date/"+date;
    return await fetchResponse(url);
}

async function getPlotDateRange(plotid, startDate, endDate){
    const url = "https://sampledata.elancoapps.com/data/plot/"+plotid+"/date/"+startDate+"/"+endDate;
    return await fetchResponse(url);
}

async function fetchResponse(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.log(error);
    }
}