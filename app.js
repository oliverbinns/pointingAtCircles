// Define the size of the area we are working with and a centre point
var svgWidth = 300;
var svgCentre = svgWidth / 2;

// Size of the central circle
var centreRadius = 10;

// Get a reference to the SVG element with d3
var svg  = d3.select("svg#circleTest");

// Add a single, central circle
var centre = svg.selectAll("circle#centrePoint")
  .data([0]);

centre.enter().append("circle")
  .attr("id", "centrePoint")
  .attr("cx", svgCentre)
  .attr("cy", svgCentre)
  .attr("fill", "red")
  .attr("r", centreRadius);


// Controls the number of circles
var n = 12;

// The angular spacing between n points on a full circle (2*π radians)
var ang = 2 * Math.PI / n;

// Make an array of n angular spacings
var points = [];
for(var i=0; i<n; i++){
  points.push(i*ang);
}


// Define the radius of the circle that the outer points sit on
var outerDistance = 70;

// and the size of the outer points
var outerRadius = 5;

// Draw the outer points
var outer = svg.selectAll("circle.outerPoint")
  .data(points);

outer.enter().append("circle")
  .attr("class", "outerPoint")
  .attr("cx", d => (svgCentre) + (outerDistance * Math.sin(d)))
  .attr("cy", d => (svgCentre) + (outerDistance * Math.cos(d)))
  .attr("fill", "blue")
  .attr("r", outerRadius);


var labelDistance = outerDistance + 20;
var outerLabel = svg.selectAll("text.outerLabel")
  .data(points);

outerLabel.enter().append("text")
  .attr("class", "outerLabel")
  .attr("x", d => (svgCentre) + (labelDistance * Math.sin(d)))
  .attr("y", d => (svgCentre) + (labelDistance * Math.cos(d)))
  .attr("dominant-baseline", "middle")
  .attr("text-anchor", "middle")
  .text(d => Math.round(d*100)/100);


// Simple lines - uncomment to show

// var lines = svg.selectAll("line")
//   .data(points);

// lines.enter().append("line")
//   .attr("x1", svgCentre)
//   .attr("y1", svgCentre)
//   .attr("x2", d => (svgCentre) + ((outerDistance) * Math.sin(d)))
//   .attr("y2", d => (svgCentre) + ((outerDistance) * Math.cos(d)))
//   .attr("stroke", "green");


var endRadius = outerDistance - outerRadius;
var lines = svg.selectAll("line")
  .data(points);

lines.enter().append("line")
  .attr("x1", d => svgCentre + (centreRadius * Math.sin(d)))
  .attr("y1", d => svgCentre + (centreRadius * Math.cos(d)))
  .attr("x2", d => svgCentre + (endRadius * Math.sin(d)))
  .attr("y2", d => svgCentre + (endRadius * Math.cos(d)))
  .attr("stroke", "green");
