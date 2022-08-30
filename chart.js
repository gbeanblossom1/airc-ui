var queryData;
const csvData = Papa.parse("data/981_2022_08_30.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  complete: function(results) {
    console.log(results)
    queryData = results.data    
    
    var allData = {};
    Object.entries(queryData).forEach(([key, value]) => {
      allData[value['contracting_agency_name']] = value['sum']/1000000000;
      
    })
    var items = Object.keys(allData).map(function(key) {
      return [key, allData[key]]
    })

    items.sort(function(first, second) {
      return second[1] - first[1];
    })
    console.log(items.slice(0, 5))
    items = items.slice(0, 5);
    var depts = [];
    var dollars = [];
    $.each(items, function(key, value) {
      depts.push(value[0]);
      dollars.push(value[1]);
      
    })
    console.log(depts)
    console.log(dollars)
    main(depts, dollars);
  }
});

function main(depts, dollars)  {
  var ctx1 = document.getElementById('barChart').getContext('2d');
  //TODO turn this into a treemap
  const barChart = new Chart(ctx1, {
      type: 'bar',
      data: {
          // once this is a treemap then use the depts array instead
          labels: ['Army', 'Navy', 'Air Force', 'DLA', 'DHA'],
          datasets: [{
              label: 'Total Contract Dollars By Agency since 2016, in Billions',
              data : dollars,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)'
              ],
              borderwidth: 1
          }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      // plugins: [{
      //   beforeInit: function (chart) {
      //     chart.data.labels.forEach(function (value, index, array) {
      //       var a = [];
      //       a.push(value.slice(0,5));
      //       var i = 1;
      //       while(value.length > (i * 6)) {
      //         a.push(value.slice(i * 6, (i+1) * 6));
      //         i++;
      //       }
      //       array[index] = a;
      //     })
      //   }
      // }]
  });
}
$(function runNonFileData() {
  //Second bar chart
  var ctx2 = document.getElementById('twoChart').getContext('2d');

  const barChart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
          labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
          datasets: [{
              label: "Total Contract Dollars by Year, in Billions",
              data : [449, 345, 494, 755, 451, 798, 101],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(21, 212, 125, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(21, 212, 125, 0.2)'
              ],
              borderwidth: 1
          }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
  });
  google.charts.load('current', {'packages':['gauge']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Contracts', 50]
    ]);

    var options = {
      width: 400, height: 120,
      redFrom: 90, redTo: 100,
      yellowFrom:75, yellowTo: 90,
      minorTicks: 5,
      min: 1
    };

    var chart = new google.visualization.Gauge(document.getElementById('gauge'));

    chart.draw(data, options);

    setInterval(function() {
      data.setValue(0, 25, 75);
      chart.draw(data, options);
    }, 13000);
  }
});