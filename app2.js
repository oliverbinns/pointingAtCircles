var svgWidth = 300;
var svgCentre = svgWidth / 2;

var svg  = d3.select("svg#circleTest2");


var centreRadius = 10;

var centre = svg.selectAll("circle#centrePoint")
  .data([0]);

centre.exit().remove();

var centreNew = centre.enter().append("circle");
centre = centreNew.merge(centre);

centre
  .attr("id", "centrePoint")
  .attr("cx", svgWidth / 2)
  .attr("cy", svgWidth / 2)
  .attr("fill", "red")
  .attr("r", centreRadius);




var n = 13;
var ang = 2 * Math.PI / n;

var points = [];
for(var i=0; i<n; i++){
  points.push({
    x: svgCentre + (outerDistance * Math.sin(i*ang)),
    y: svgCentre + (outerDistance * Math.cos(i*ang)),
  });
}


for(var point of points){
  point.dx = svgCentre - point.x;
  point.dy = svgCentre - point.y;
  point.theta = Math.atan((svgCentre - point.x)/(svgCentre - point.y));
    
  if(point.dy < 0){
    point.f = 1;
  } else {
    point.f = -1;
  }
}


var outerDistance = 70;
var outerRadius = 5;

var outer = svg.selectAll("circle.outerPoint")
  .data(points);

outer.exit().remove();

var outerNew = outer.enter().append("circle");
outer = outerNew.merge(outer);

outer
  .attr("class", "outerPoint")
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .attr("fill", "blue")
  .attr("r", outerRadius);



var lines = svg.selectAll("line.centralLine")
  .data(points);

lines.enter().append("line")
  .attr("class", "centralLine")
  .attr("x1", svgCentre)
  .attr("y1", svgCentre)
  .attr("x2", d => d.x)
  .attr("y2", d => d.y)
  .attr("stroke", "yellow");




var lines = svg.selectAll("line.edgeLine")
  .data(points);

lines.enter().append("line")
  .attr("class", "edgeLine")
  .attr("x1", d => (svgWidth / 2) + (d.f * centreRadius * Math.sin(d.theta)))
  .attr("y1", d => (svgWidth / 2) + (d.f * centreRadius * Math.cos(d.theta)))
  .attr("x2", d => d.x - (d.f * outerRadius * Math.sin(d.theta)))
  .attr("y2", d => d.y - (d.f * outerRadius * Math.cos(d.theta)))
  .attr("stroke", "green");




var labelDistance = outerRadius + 20;
var outerLabel = svg.selectAll("text.outerLabel")
  .data(points);

outerLabel.enter().append("text")
  .attr("class", "outerLabel")
  .attr("x", d => d.x + (d.f * labelDistance * Math.sin(d.theta)))
  .attr("y", d => d.y + (d.f * labelDistance * Math.cos(d.theta)))
  .attr("dominant-baseline", "middle")
  .attr("text-anchor", "middle")
  .text(d => Math.round(d.theta*100)/100);

