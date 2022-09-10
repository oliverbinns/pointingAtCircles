function pathFinder(p1, p2){
  /* Path genrating function between the edges of two circles 
        p1, p2 two points describing circles with attributes
            .x = x-centre of the circle
            .y = y-centre of the circle
            .r = circle radius
    */

  var dx = p1.x - p2.x;
  var dy = p1.y - p2.y;

  var theta = Math.atan(dx/dy);

  var factor;
  if(dy < 0){
    factor = 1;
  } else {
    factor = -1;
  }

  var line = {
    x1: p1.x + (factor * p1.r * Math.sin(theta)),
    y1: p1.y + (factor * p1.r * Math.cos(theta)),
    x2: p2.x - (factor * p2.r * Math.sin(theta)),
    y2: p2.y - (factor * p2.r * Math.cos(theta))
  };

  return line;
}



var svgWidth = 300;

var svg  = d3.select("svg#circleTest3");

var centreRadius = 10;


// Define "centre" origin point at a random position
var point_origin = {
  x: Math.random()*svgWidth,
  y: Math.random()*svgWidth,
  r: centreRadius
};


// Draw centre point
var centre = svg.selectAll("circle#centrePoint")
  .data([point_origin]);

centre.enter().append("circle")
  .attr("id", "centrePoint")
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .attr("fill", "red")
  .attr("r", centreRadius);



var outerRadius = 5;

// Add points with random positions and radii
var points = [];
var n = 10;
for(var i=0; i<n; i++){
  var point = {};

  point.x = Math.random()*svgWidth;
  point.y = Math.random()*svgWidth;
  point.r = Math.random()*outerRadius + 5;

  point.path = pathFinder(point_origin, point);

  points.push(point);

}

// Draw outer points
var outer = svg.selectAll("circle.outerPoint")
  .data(points);

outer.enter().append("circle")
  .attr("class", "outerPoint")
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .attr("fill", "blue")
  .attr("r", d => d.r);


// Add lines from/to centre points
var lines = svg.selectAll("line.centralLine")
  .data(points);

lines.enter().append("line")
  .attr("class", "centralLine")
  .attr("x1", point_origin.x)
  .attr("y1", point_origin.y)
  .attr("x2", d => d.x)
  .attr("y2", d => d.y)
  .attr("stroke", "yellow");



// Add lines from/to edges
var lines = svg.selectAll("line.edgeLine")
  .data(points);

lines.enter().append("line")
  .attr("class", "edgeLine")
  .attr("x1", d => d.path.x1)
  .attr("y1", d => d.path.y1)
  .attr("x2", d => d.path.x2)
  .attr("y2", d => d.path.y2)
  .attr("marker-end", "url(#arrow)")
  .attr("stroke", "green");

