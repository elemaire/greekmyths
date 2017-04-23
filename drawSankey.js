google.charts.load('current', {'packages':['sankey']});
google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);


function drawChart() {

  $.get("outputcsv.csv", function(csvString) {
  var arrayData = $.csv.toArrays(csvString);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Frequency');

    for (row in arrayData) 
    {
        data.addRow([arrayData[row][0], arrayData[row][1], parseFloat((arrayData[row][2]), 10)]);
    } 

  // Sets chart options.
  var options = {
    width: 900,
     sankey: {
        link: { 
          color: { fill: '#BEBEBE ' },
          // colorMode: 'target'
        },

        node: { 
          label: { 
            fontName: 'Nunito',
            fontSize: 18,
            color: '#303030',
            bold: true, 
          },
            width: 20,
            interactivity: true,
            colors: [
              '#F8B195',
              '#F67280',
              '#6C5B7B',
              '#C06C84',
              '#355C7D'
            ]
         
        } 
      }

  };

  // Instantiates and draws our chart, passing in some options.
  var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));

  function showDetail(god) {
     console.log('The user selected ' + god.name);

  }
  
  function selectHandler() {
          var selectedItem = chart.getSelection()[0];
          if (selectedItem) {
            // var node = data.getValue(52, 1);
            // alert('The user selected ' + JSON.stringify(selectedItem.name, null, 4));
            showDetail(selectedItem);
            cleanBubble();
            bubbleDraw(selectedItem.name);
            readFile(selectedItem.name);
            document.getElementById("graph_header").innerHTML = selectedItem.name;
            console.log(selectedItem.name);
          }
        }

        google.visualization.events.addListener(chart, 'select', selectHandler);  

  chart.draw(data, options);
  });
}
