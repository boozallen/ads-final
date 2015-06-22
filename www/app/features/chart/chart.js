'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('ChartCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  var m = [30, 10, 10, 85],
    w = 960 - m[1] - m[3],
    h = 3530 - m[0] - m[2];

var x = d3.scale.linear().range([0, w]),
    y = d3.scale.ordinal().rangeBands([0, h], 0.3);

var xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-h),
    yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

var svg = d3.select("#chart").append("svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
  .append("g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

d3.csv("mockJson/georgia_counties_vmt.csv", function(input) {

  data = input;
  // Parse numbers, and sort by value.
  data.forEach(function(d) { d.value = +d.value; });
  data.forEach(function (d) {d.n1 = +d.n1; })
  data.sort(function(a, b) { return b.value - a.value; });


  // Set the scale domain.
  x.domain([0, d3.max(data, function(d) { return d.value; })]);
  y.domain(data.map(function(d) { return d.name; }));
  
  change(); 

}); // close d3.csv ...

function change() {
  d3.transition()
    .duration(3750)
    .each(redraw);
}

function redraw() {


  var nbar = svg.selectAll("g.nbar")
      .data(data)
      .attr("class", "nbar");

  var nbarEnter = nbar.enter().insert("g")
    .attr("class", "nbar")
    .attr("transform", function (d) {return "translate(0," + (d.y0 = (9+y(d.name))) +")" ;});

  nbarEnter.append("rect")
    .attr("width", 0)
    .attr("height", y.rangeBand()/2);

  var nbarUpdate = d3.transition(nbar);

  nbarUpdate.select("rect")
    .attr("width", function(d) { return x(d.n1); });

  var bar = svg.selectAll("g.bar")
      .data(data)
      .attr("class", "bar");

  var barEnter = bar.enter().insert("g")
    .attr("class", "bar")
    .attr("transform", function (d) {return "translate(0," + (d.y0 = (y(d.name))) +")" ;});

  initAxes();

  barEnter.append("rect")
    .attr("width", 0)
    .attr("height", y.rangeBand()/2);

  var barUpdate = d3.transition(bar);

  barUpdate.select("rect")
    .attr("width", function(d) { return x(d.value); })
    .attr("fill", "orange");

  svg.selectAll("g.y_axis").call(yAxis)

  svg.selectAll("g.x_axis").call(xAxis)



} // end redraw()


function initAxes()
{

  var initXscale = d3.scale.linear()
    .range([0, 1])
    .domain([0, d3.max(data, function(d) { return d.value; })]);

  var initXaxis = d3.svg.axis()
    .scale(initXscale)
    .tickSize(-h)
    .orient("top");

  svg.append("g")
    .attr("class", "x_axis")
    .call(initXaxis);   

  var initYscale = d3.scale.ordinal()
    .rangeBands([0, 1], 0.1)
    .domain(data.map(function(d) { return d.name; }));

  var initYaxis = d3.svg.axis()
    .scale(initYscale)
    .orient("left")
    .tickSize(0);

  svg.append("g")
    .attr("class", "y_axis")
    .call(initYaxis);

} // initAxes()


  });
