const table = document.getElementById("crop-table");

function updateTable(cropData){
    while (table.childElementCount > 1) {
        table.removeChild(table.lastChild);
    }
    cropData.forEach(crop => {
        let content = "<tr>";
        content += "<td>"+crop.type+"</td>";
        content += "<td>"+crop.ph.min+"-"+crop.ph.max+"</td>";
        content += "<td>"+crop.temp.min+"-"+crop.temp.max+"</td>";
        content += "<td>"+crop.humid.min+"-"+crop.humid.max+"</td>";
        content += "<td>"+crop.light.min+"-"+crop.light.max+"</td>";
        content += "<td>£"+crop.cost+"</td>";
        content += "<td>£"+crop.yield+"</td>";
        content += "<td>"+crop.time+"</td>";
        content += "</tr>";
        table.insertAdjacentHTML("beforeend", content);
    });
}

async function getCrops(){
    let cropData = [];
    try{
        const response = await fetch('includes/get_crop_json.php');
        cropData = await response.json();
    } catch (error) {
        console.log(error);
    }
    return cropData;
}

function filterCrops(cropData, dataPoint, asc = false){
    console.log("filter");
    if (asc){
        switch (dataPoint){
            case "ph":
                cropData.sort((a,b) => (a.ph.min > b.ph.min) ? 1 : ((b.ph.min > a.ph.min) ? -1 : 0));
                break;
            case "temp":
                cropData.sort((a,b) => (a.temp.min > b.temp.min) ? 1 : ((b.temp.min > a.temp.min) ? -1 : 0));
                break;
            case "humid":
                cropData.sort((a,b) => (a.humid.min > b.humid.min) ? 1 : ((b.humid.min > a.humid.min) ? -1 : 0));
                break;
            case "light":
                cropData.sort((a,b) => (a.light.min > b.light.min) ? 1 : ((b.light.min > a.light.min) ? -1 : 0));
                break;
            case "cost":
                cropData.sort((a,b) => (a.cost > b.cost) ? 1 : ((b.cost > a.cost) ? -1 : 0));
                break;
            case "yield":
                cropData.sort((a,b) => (a.yield > b.yield) ? 1 : ((b.yield > a.yield) ? -1 : 0));
                break;
            case "time":
                cropData.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0));
                break;
            default:
                cropData.sort((a,b) => (a.type < b.type) ? 1 : ((b.type < a.type) ? -1 : 0));
        }
    }
    else{
        switch (dataPoint){
            case "ph":
                cropData.sort((a,b) => (a.ph.max < b.ph.max) ? 1 : ((b.ph.max < a.ph.max) ? -1 : 0));
                break;
            case "temp":
                cropData.sort((a,b) => (a.temp.max < b.temp.max) ? 1 : ((b.temp.max < a.temp.max) ? -1 : 0));
                break;
            case "humid":
                cropData.sort((a,b) => (a.humid.max < b.humid.max) ? 1 : ((b.humid.max < a.humid.max) ? -1 : 0));
                break;
            case "light":
                cropData.sort((a,b) => (a.light.max < b.light.max) ? 1 : ((b.light.max < a.light.max) ? -1 : 0));
                break;
            case "cost":
                cropData.sort((a,b) => (a.cost < b.cost) ? 1 : ((b.cost < a.cost) ? -1 : 0));
                break;
            case "yield":
                cropData.sort((a,b) => (a.yield < b.yield) ? 1 : ((b.yield < a.yield) ? -1 : 0));
                break;
            case "time":
                cropData.sort((a,b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0));
                break;
            default:
                cropData.sort((a,b) => (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0));
        }
    }
    updateTable(cropData);
}

(async() => {
    const cropData = await getCrops();
    const typeFilter = document.getElementById("type-filter");
    const phFilter = document.getElementById("ph-filter");
    const tempFilter = document.getElementById("temp-filter");
    const humidFilter = document.getElementById("humid-filter");
    const lightFilter = document.getElementById("light-filter");
    const costFilter = document.getElementById("cost-filter");
    const yieldFilter = document.getElementById("yield-filter");
    const timeFilter = document.getElementById("time-filter");
    updateTable(cropData);
    typeFilter.addEventListener("click", function(){
        const filter = "type";
        if (table.classList.contains(filter)){
            if (table.classList.contains("desc")){
                table.className = filter + " asc";
                filterCrops(cropData, filter, true);
            }
            else{
                table.className = filter + " desc";
                filterCrops(cropData, filter);
            }
        }
        else{
            table.className = filter + " desc";
            filterCrops(cropData, filter);
        }
    });
    phFilter.addEventListener("click", function(){
    const filter = "ph";
    if (table.classList.contains(filter)){
        if (table.classList.contains("desc")){
            table.className = filter + " asc";
            filterCrops(cropData, filter, true);
        }
        else{
            table.className = filter + " desc";
            filterCrops(cropData, filter);
        }
    }
    else{
        table.className = filter + " desc";
        filterCrops(cropData, filter);
    }});
    tempFilter.addEventListener("click", function(){
        const filter = "temp";
        if (table.classList.contains(filter)){
            if (table.classList.contains("desc")){
                table.className = filter + " asc";
                filterCrops(cropData, filter, true);
            }
            else{
                table.className = filter + " desc";
                filterCrops(cropData, filter);
            }
        }
        else{
            table.className = filter + " desc";
            filterCrops(cropData, filter);
        }
    });
    humidFilter.addEventListener("click", function(){
        const filter = "humid";
        if (table.classList.contains(filter)){
            if (table.classList.contains("desc")){
                table.className = filter + " asc";
                filterCrops(cropData, filter, true);
            }
            else{
                table.className = filter + " desc";
                filterCrops(cropData, filter);
            }
        }
        else{
            table.className = filter + " desc";
            filterCrops(cropData, filter);
        }
    });
    lightFilter.addEventListener("click", function(){
        const filter = "light";
        if (table.classList.contains(filter)){
            if (table.classList.contains("desc")){
                table.className = filter + " asc";
                filterCrops(cropData, filter, true);
            }
            else{
                table.className = filter + " desc";
                filterCrops(cropData, filter);
            }
        }
        else{
            table.className = filter + " desc";
            filterCrops(cropData, filter);
        }
    });
    costFilter.addEventListener("click", function(){
        const filter = "cost";
        if (table.classList.contains(filter)){
            if (table.classList.contains("desc")){
                table.className = filter + " asc";
                filterCrops(cropData, filter, true);
            }
            else{
                table.className = filter + " desc";
                filterCrops(cropData, filter);
            }
        }
        else{
            table.className = filter + " desc";
            filterCrops(cropData, filter);
        }
    });
    yieldFilter.addEventListener("click", function(){
        const filter = "yield";
        if (table.classList.contains(filter)){
            if (table.classList.contains("desc")){
                table.className = filter + " asc";
                filterCrops(cropData, filter, true);
            }
            else{
                table.className = filter + " desc";
                filterCrops(cropData, filter);
            }
        }
        else{
            table.className = filter + " desc";
            filterCrops(cropData, filter);
        }
    });
    timeFilter.addEventListener("click", function(){
        const filter = "time";
        if (table.classList.contains(filter)){
            if (table.classList.contains("desc")){
                table.className = filter + " asc";
                filterCrops(cropData, filter, true);
            }
            else{
                table.className = filter + " desc";
                filterCrops(cropData, filter);
            }
        }
        else{
            table.className = filter + " desc";
            filterCrops(cropData, filter);
        }
    });
})();