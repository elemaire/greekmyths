function readFile(myth) {

myth.replace('.csv','');
mythname = myth += "myth.txt";

var request = new XMLHttpRequest();
request.open('GET', mythname, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    document.getElementById('story-text').innerHTML = request.responseText;
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

}

function cleanBubble() {
    var svg = d3.select("#bubble-chart")
    svg.selectAll("*").remove();
}

function bubbleDraw(godname) {

var diameter = 500, //max size of the bubbles
    format = d3.format(",d"),
    color = d3.scale.ordinal()
    .domain(["Zeus ", "Hera ", "Poseidon "])
    .range([  '#C06C84',
              '#355C7D',
              '#F8B195',
              '#F67280',
              '#6C5B7B']);

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#bubble-chart")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var tooltip = d3.select("#bubble-chart")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("padding", "8px")
    .style("background-color", "rgba(0, 0, 0, 0.75)")
    .style("border-radius", "6px")
    .style("font", "12px sans-serif")
    .text("tooltip");
console.log('testing')
window.tooltip = tooltip;

fname = godname +".csv";

d3.csv(fname, function(error, data){

    //convert numerical values from strings to numbers
    data = data.map(function(d){ d.value = +d["Count"]; return d; });

    //bubbles needs very specific format, convert data to this.
    var nodes = bubble.nodes({children:data}).filter(function(d) { return !d.children; });

    //setup the chart
    var bubbles = svg.append("g")
        .attr("transform", "translate(0,0)")
        .selectAll(".bubble")
        .data(nodes)
        .enter();

    //create the bubbles
    bubbles.append("circle")
        .attr("r", function(d){ return d.r; })
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .style("fill", function(d) { return color(d.value); })
        .on("mouseover", function(d) {
              tooltip.text( "References: " + format(d.value));
              tooltip.style("visibility", "visible");
              tooltip.style("position", "initial");

        })
        .on("mousemove", function() {
             return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
        })
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    //format the text for each bubble
    bubbles.append("text")
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return d.y + 5; })
        .attr("text-anchor", "middle")
        .text(function(d){ return d["God"]; })
        .style({
            "fill":"white", 
            "font-family":"Nunito",
            "font-size": "12px"
        });
})

}