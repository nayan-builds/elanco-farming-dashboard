function graphing(id, xValues, yValues){
    new Chart(id, {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            fill: false,
            lineTension: 1/3,
            backgroundColor: "rgba(43,101,172,1.0)",
            borderColor: "rgba(43,101,172,0.1)",
            data: yValues
          }]
        },
        options: {
            legend: {display: false},
            scales: {
              yAxes: [{ticks: {min: 6, max:16}}],
            }
          }
      });
}
var xValues = [1,2,3,4,5,6];
var yValues = [6,9,12,12,13];
graphing('lineChart',xValues,yValues);