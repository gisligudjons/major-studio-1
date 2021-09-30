
/*global d3*/

d3.json("WigData.json", function(someData){
  someData.forEach((d) => {
      d.date = d["Decade"];
      d.group = d["Century"];
      d.value = d["Count"];
  });

  var range = d3.max(someData, function(d){return d["Decade"];}) - d3.min(someData, function(d){return d["Decade"];});

  var width = 600,
    height = 500,
    start = 0,
    end = 2.25,
    numSpirals = 2
    margin = {top:50,bottom:50,left:50,right:50};

  var theta = function(r) {
    return numSpirals * Math.PI * r;
  };

  // used to assign nodes color by group
  var color = d3.scaleOrdinal(d3.schemeTableau10);

  var r = d3.min([width, height]) / 2 - 10;

  var radius = d3.scaleLinear()
    .domain([start, end])
    .range([20, r]);

  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var points = d3.range(start, end + 0.001, (end - start) / 1000);

  var spiral = d3.radialLine()
    .curve(d3.curveCardinal)
    .angle(theta)
    .radius(radius);

  var path = svg.append("path")
    .datum(points)
    .attr("id", "spiral")
    .attr("d", spiral)
    .style("fill", "none")
    .style("stroke", "steelblue");

  var spiralLength = path.node().getTotalLength(),
      barWidth = (spiralLength / range) + 4;

  var timeScale = d3.scaleTime()
    .domain(d3.extent(someData, function(d){
      return d["Decade"];
    }))
    .range([0, spiralLength]);
  
  // yScale for the bar height
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(someData, function(d){
      return d.value;
    })])
    .range([0, (r / numSpirals) - 30]);

  svg.selectAll("rect")
    .data(someData)
    .enter()
    .append("rect")
    .attr("x", function(d,i){
      
      var linePer = timeScale(d.date),
          posOnLine = path.node().getPointAtLength(linePer),
          angleOnLine = path.node().getPointAtLength(linePer - barWidth);
    
      d.linePer = linePer; // % distance are on the spiral
      d.x = posOnLine.x; // x postion on the spiral
      d.y = posOnLine.y; // y position on the spiral
      
      d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

      return d.x;
    })
    .attr("y", function(d){
      return d.y;
    })
    .attr("width", function(d){
      return barWidth;
    })
    .attr("height", function(d){
      return yScale(d.value);
    })
    .style("fill", function(d){return color(d.group);})
    .style("stroke", "none")
    .attr("transform", function(d){
      return "rotate(" + d.a + "," + d.x  + "," + d.y + ")"; // rotate the bar
    });
  
  // add date labels
  var tF = d3.timeFormat("%Y"),
      firstInMonth = {};



  svg.selectAll("text")
    .data(someData)
    .enter()
    .append("text")
    .text


  var tooltip = d3.select("#chart")
  .append('table')
  .attr('class', 'tooltip');


  tooltip.append('div')
  .attr('class', 'value');
  tooltip.append('div')
  .attr('class', 'date')

  svg.selectAll("rect")
  .on('mouseover', function(d) {

      tooltip.select('.value').html("Wigs: <b>" + Math.round(d.value*100)/100 + "<b>");
      tooltip.select('.date').html("Decade: <b>" + d.Decade + "'s");


      d3.select(this)
      .style("fill","#FFFFFF")
      .style("stroke","#000000")
      .style("stroke-width","2px");

      tooltip.style('display', 'block');
      tooltip.style('opacity', 1);

  })
  .on('mousemove', function(d) {
      tooltip.style('top', (d3.event.layerY + 100) + 'px')
      .style('left', (d3.event.layerX + 550) + 'px');
  })
  .on('mouseout', function(d) {
      d3.selectAll("rect")
      .style("fill", function(d){return color(d.group);})
      .style("stroke", "none")

      tooltip.style('display', 'none');
      tooltip.style('opacity',0);
  });
});