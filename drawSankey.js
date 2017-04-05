google.charts.load('current', {'packages':['sankey']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'To');
  data.addColumn('string', 'From');
  data.addColumn('number', 'Reference Count');
  data.addRows([
    [ 'Aphrodite', 'Ares ', .25 ],
    [ 'Aphrodite', 'Hephaestus ', .5 ],
    [ 'Aphrodite', 'Zeus ', .25 ],
    [ 'Apollo', 'None ', 0.0001 ],
    [ 'Ares', 'Athena ', .33 ],
    [ 'Ares', 'Aphrodite ', .33 ],
    [ 'Ares', 'Hephaestus ', .33 ],
    [ 'Ares', 'Zeus ', .33 ],
    [ 'Artemis', 'Apollo ', .408 ],
    [ 'Artemis', 'Ares ', .06 ],
    [ 'Artemis', 'Hera ', .12 ],
    [ 'Artemis', 'Hephaestus ', .06 ],
    [ 'Artemis', 'Poseidon ', .12 ],
    [ 'Artemis', 'Zeus ', .58 ],
    [ 'Athena', 'Hephaestus ', .12 ],
    [ 'Athena', 'Poseidon ', .35 ],
    [ 'Athena', 'Zeus ', .93 ],
    [ 'Demeter and Persephone', 'Hephaestus ', .12 ],
    [ 'Demeter and Persephone', 'Hermes ', .17 ],
    [ 'Demeter and Persephone', 'Hades ', .998 ],
    [ 'Demeter and Persephone', 'Zeus ', .33 ],
    [ 'Dionysus', 'Hermes ', .1 ],
    [ 'Dionysus', 'Hera ', .1 ],
    [ 'Dionysus', 'Hades ', .1 ],
    [ 'Dionysus', 'Zeus ', .41 ],
    [ 'Hades', 'Demeter and Persephone ', .33 ],
    [ 'Hades', 'Hermes ', .67 ],
    [ 'Hephaestus', 'Aphrodite ', .29 ],
    [ 'Hephaestus', 'Hera ', .58 ],
    [ 'Hephaestus', 'Zeus ', .88 ],
    [ 'Hera', 'Hermes ', .27 ],
    [ 'Hera', 'Zeus ', 1 ],
    [ 'Hermes', 'Apollo ', .96 ],
    [ 'Hermes', 'Hera ', .09 ],
    [ 'Hermes', 'Hades ', .09 ],
    [ 'Hermes', 'Zeus ', .35 ],
    [ 'Poseidon', 'Apollo ', .27 ],
    [ 'Poseidon', 'Artemis ', .13 ],
    [ 'Poseidon', 'Hera ', .4 ],
    [ 'Poseidon', 'Zeus ', .27 ],
    [ 'Zeus', 'Athena ', .15 ],
    [ 'Zeus', 'Apollo ', .15 ],
    [ 'Zeus', 'Aphrodite ', .08 ],
    [ 'Zeus', 'Artemis ', .15 ],
    [ 'Zeus', 'Ares ', .08 ],
    [ 'Zeus', 'Demeter and Persephone ', .15 ],
    [ 'Zeus', 'Dionysus ', .15 ],
    [ 'Zeus', 'Hermes ', .08 ],
    [ 'Zeus', 'Hera ', .15 ],
    [ 'Zeus', 'Hephaestus ', .08 ],
    [ 'Zeus', 'Hades ', .15 ],
    [ 'Zeus', 'Hestia ', .15 ],
    [ 'Zeus', 'Poseidon ', .23 ],

  ]);

  // Sets chart options.
  var options = {
    width: 900,
     sankey: {
        link: { color: { fill: '#BEBEBE ' } },
        node: { label: { fontName: 'Avenir',
                         fontSize: 12,
                         color: '#303030',
                         bold: true, } } },

  };

  // Instantiates and draws our chart, passing in some options.
  var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
  chart.draw(data, options);
}

$(document).ready(function() {
      if(isAPIAvailable()) {
        $('#files').bind('change', handleFileSelect);
      }
    });

    function isAPIAvailable() {
      // Check for the various File API support.
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        return true;
      } else {
        // source: File API availability - http://caniuse.com/#feat=fileapi
        // source: <output> availability - http://html5doctor.com/the-output-element/
        document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
        // 6.0 File API & 13.0 <output>
        document.writeln(' - Google Chrome: 13.0 or later<br />');
        // 3.6 File API & 6.0 <output>
        document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
        // 10.0 File API & 10.0 <output>
        document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
        // ? File API & 5.1 <output>
        document.writeln(' - Safari: Not supported<br />');
        // ? File API & 9.2 <output>
        document.writeln(' - Opera: Not supported');
        return false;
      }
    }

    function handleFileSelect(evt) {
      var files = evt.target.files; // FileList object
      var file = files[0];

      // read the file contents
      printTable(file);
    }

    function printTable(file) {
      var reader = new FileReader();
      var data = [];
      reader.readAsText(file);
      reader.onload = function(event){
        var csv = event.target.result;
        data = $.csv.toArrays(csv);
        console.log(typeof data[1][1])
        var html = '';
        for(var row in data) {
          html += '<tr>\r\n';
          for(var item in data[row]) {
            html += '<td>' + data[row][item] + '</td>\r\n';
            console.log("test " + data[row][item]);
          }
          html += '</tr>\r\n';
        }
        $('#contents').html(html);
      };
      reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
      return data;
    }
