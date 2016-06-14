widget = {
  // see http://bl.ocks.org/mbostock/3883245 for reference

  //runs when we receive data from the job
  onData: function (el, indata) {
    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (indata.title) {
      $('h2', el).text(indata.title);
    }

    // $('.content', el).html(data.html);

    var rawData = JSON.parse(indata.html);
    var data = rawData["price"];

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 430 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;

    var formatDate = d3.time.format("%d-%b-%y");

    var x = d3.time.scale()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var line = d3.svg.line()
      .x(function(d) { return x(d[0]); })
      .y(function(d) { return y(d[1]); });

    d3.select("g").remove();

    var svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function(d) { return d[0]; }));
    y.domain(d3.extent(data, function(d) { return d[1]; }));

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  }
};