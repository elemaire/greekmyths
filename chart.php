<html>
<head>
  <script src="http://d3js.org/d3.v3.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
  <script src="http://evanplaice.github.io/jquery-csv/src/jquery.csv.min.js"></script>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type="text/javascript" src="bubblecharttest.js" defer></script>
  <script type="text/javascript" src="drawSankey.js"></script>
  <link rel='stylesheet' type = 'text/css' href="stylesheet_myths.css">
</head>
<body>
<div id="container">
  <h1>D'AULAIRES' BOOK OF GREEK MYTHS</h1>
  <h3> by Eric Lemaire </h3>
  <button type="button" class="button homebutt"><a href="index.html">Home</a></button>
  <div id="axis_headers" style="width: 900px; height: 75px;">
    <p id="leftaxis">Gods and Goddesses</p>
    <p id="rightaxis">Myths</p>
  </div>
  <div id="sankey_basic" style="width: 900px; height: 800px;"></div>
  <div id="bubble-chart"></div>
  <input id="myFile" type="file"/>
  <textarea name="displayfile" cols="80" rows="20"><?php readfile("Heramyth.text"); ?></textarea>
</div>
</body>
</html>

<!-- a comment  -->