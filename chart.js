var queryData;
const csvData1 = Papa.parse("data/New_Query_2022_08_30.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  complete: function(results) {
    console.log(results)
    queryData = results.data    
    var i = 0;
    var allData = {};
    Object.entries(queryData).forEach(([key, value]) => {
      i++
      // Catches Special cases for abreviating 
      if(value['contracting_agency_name'] == "DEPT OF THE ARMY"){
        if(allData['ARMY'] == null){
          allData['ARMY'] = Math.round((value['dollars_obligated'] + Number.EPSILON) * 100)/100;
        } else {
          allData['ARMY'] += Math.round((value['dollars_obligated'] + Number.EPSILON) * 100)/100;
        }   
      } else if(value['contracting_agency_name'] == "DEPT OF THE NAVY"){
        if(allData['NAVY'] == null){
          allData['NAVY'] = Math.round((value['dollars_obligated'] + Number.EPSILON) * 100)/100;
        } else {
          allData['NAVY'] += Math.round((value['dollars_obligated'] + Number.EPSILON) * 100)/100;
        }  
      } else if(value['contracting_agency_name'] == "DEPT OF THE AIR FORCE"){
        if(allData['AIR FORCE'] == null){
          allData['AIR FORCE'] = Math.round((value['dollars_obligated'] + Number.EPSILON) * 100)/100;
        } else {
          allData['AIR FORCE'] += Math.round((value['dollars_obligated'] + Number.EPSILON) * 100)/100;
        }  
      } else if(value['contracting_agency_name'] == "U.S. SPECIAL OPERATIONS COMMAND (USSOCOM)"){
       
        if(allData['USSOCOM'] == null){
          allData['USSOCOM'] = Math.round((value['dollars_obligated'] + Number.EPSILON) * 100)/100;
        } else {
          allData['USSOCOM'] += Math.round((value['dollars_obligated'] + Number.EPSILON) * 100)/100;
        }  
        // Does general abriviations
      } else {
        console.log(i)
        console.log(value['contracting_agency_name'])
        try{
          var abbrev = value['contracting_agency_name'].replace(/\([^\)]*\)/g).match(/\b([A-Z])/g).join('')
          // console.log(allData[abbrev] == null)
          if(allData[abbrev] == null){
            allData[abbrev] = Math.round((value['dollars_obligated'] + Number.EPSILON) * 100)/100;
          } else {
            allData[abbrev] += Math.round((value['dollars_obligated'] + Number.EPSILON) * 100)/100;
          }
        } catch(TypeError) {
          console.log('Done!')
        }
      }
     
      
      
    })
    var items = Object.keys(allData).map(function(key) {
      return [key, allData[key]]
    })

    items.sort(function(first, second) {
      return second[1] - first[1];
    })
    console.log(items.slice(0, 7))
    items = items.slice(0, 7);
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
// add more data to this function by adding to the arguments
function main(depts, dollars)  {
  var ctx1 = document.getElementById('oblBar').getContext('2d');
  const barChart = new Chart(ctx1, {
      type: 'bar',
      data: {
          // once this is a treemap then use the depts array instead
          labels: depts,
          datasets: [{
              label: 'Dollars Obligated',
              data : dollars,
              backgroundColor: [
                'rgba(100, 38, 103, 0.5)',
                'rgba(206, 0, 88, 0.2)',
                'rgba(237, 139, 0, 0.2)',
                'rgba(247, 234, 72, 0.2)',
                'rgba(80, 133, 144, 0.2)'
              ],
              borderColor: [
                'rgba(100, 38, 103, 0.5)',
                'rgba(206, 0, 88, 0.2)',
                'rgba(237, 139, 0, 0.2)',
                'rgba(247, 234, 72, 0.2)',
                'rgba(80, 133, 144, 0.2)'
              ],
              borderwidth: 1
          }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 120000000
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

  // Add the data to these bar graphs
  var ctx3 = document.getElementById('vendorBar').getContext('2d');
  const vendorBar = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['Amerisourcebergen', 'Cardinal Health', 'SAIC', 'O&M', 'Supplycore'],
      datasets: [{
        label: "Vendors by Unique Contracts",
        data: [1544905, 1297912, 1144503, 692105, 353380],
        backgroundColor: [
          'rgba(100, 38, 103, 0.5)',
          'rgba(206, 0, 88, 0.2)',
          'rgba(237, 139, 0, 0.2)',
          'rgba(247, 234, 72, 0.2)',
          'rgba(80, 133, 144, 0.2)'
        ],
        borderColor: [
          'rgba(100, 38, 103, 0.5)',
          'rgba(206, 0, 88, 0.2)',
          'rgba(237, 139, 0, 0.2)',
          'rgba(247, 234, 72, 0.2)',
          'rgba(80, 133, 144, 0.2)'
        ],
        borderwidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        xAxes: [{
          ticks: {
              display: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  })
  var ctx4 = document.getElementById('naicsBar').getContext('2d');
  const naicsBar = new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: ['MEDICAL, DENTAL, AND HOSPITAL EQUIPMENT AND SUPPLIES MERCHANT WHOLESALERS', 'PERISHABLE PREPARED FOOD MANUFACTURING',
    "DRUGS AND DRUGGISTS' SUNDRIES MERCHANT WHOLESALERS", 'COMMERCIAL BAKERIES', 'MEDICINAL AND BOTANICAL MANUFACTURING'],
      datasets: [{
        label: 'Top NAICS vendors by number of contracts',
        data: [3095624, 1536980, 1072686, 1050832, 943020],
        backgroundColor: [
          'rgba(100, 38, 103, 0.5)',
          'rgba(206, 0, 88, 0.2)',
          'rgba(237, 139, 0, 0.2)',
          'rgba(247, 234, 72, 0.2)',
          'rgba(80, 133, 144, 0.2)'
        ],
        borderColor: [
          'rgba(100, 38, 103, 0.5)',
          'rgba(206, 0, 88, 0.2)',
          'rgba(237, 139, 0, 0.2)',
          'rgba(247, 234, 72, 0.2)',
          'rgba(80, 133, 144, 0.2)'
        ],
        borderwidth: 1
      }]
    },
    options: {
      // maintainAspectRatio: false,
      scales: {
        xAxes: [{
          ticks: {
              display: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      plugins: {
        legend: {
          display: false
        }
      },
      responsive: true,
           
    }
  })
  var ctx5 = document.getElementById('darpaLine').getContext('2d');
  var ctx6 = document.getElementById('vendorTable').getContext('2d');
  var ctx7 = document.getElementById('naicsTable').getContext('2d');
  var ctx8 = document.getElementById('commercialPie').getContext('2d');
  const darpaLine = new Chart(ctx5, {})
  const vendorTable = new Chart(ctx6, {})
  const naicsTable = new Chart(ctx7, {})
  const commercialPie = new Chart(ctx8, {})
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
                  'rgba(100, 38, 103, 0.5)',
                  'rgba(206, 0, 88, 0.2)',
                  'rgba(237, 139, 0, 0.2)',
                  'rgba(247, 234, 72, 0.2)',
                  'rgba(80, 133, 144, 0.2)',
                  'rgba(44, 213, 196, 0.2)',
                  'rgba(215, 210, 203, 0.2)'
              ],
              borderColor: [
                  'rgba(100, 38, 103, 0.5)',
                  'rgba(206, 0, 88, 0.2)',
                  'rgba(237, 139, 0, 0.2)',
                  'rgba(247, 234, 72, 0.2)',
                  'rgba(80, 133, 144, 0.2)',
                  'rgba(44, 213, 196, 0.2)',
                  'rgba(215, 210, 203, 0.2)'
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
      wdith: 400, height: 240,
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
