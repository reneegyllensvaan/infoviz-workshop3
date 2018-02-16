var x_span = 6;
var y_span = 5;
x = d3.scaleLinear()
    .range([-x_span*0.5,x_span*0.5]);

var y = d3.scaleLinear()
    .range([0.2, 0.2+y_span]);

var last_max = 0;

function drawChart( ) {

    var data = popData[0];
    //data = data.map( function (d) { return +d; }); // Convert type to number
    console.log(data);

    data[data.length-1] = last_max;
    //last_max = d3.max(data);
    x.domain([0,100]);
    y.domain([0,100]);

    var points = d3.select("a-scene")
        .selectAll("a-sphere").data( data ); // Creates selections to update and add/remove nodes

    points.enter() // Selects placeholders for adding new nodes
        .append("a-sphere") // Must be used to "realize" placeholders
        .attr("radius",0.1)
        .attr("color", "red")
        .attr("position", function (d,i) { return "" + x(d.critic) + " " + y(d.audience) + " -5"; } );


}

d3.text("data.csv", function(datasetText) {

    var parsedData = d3.csvParseRows(datasetText);

    var ratings = [];
    parsedData.map(function (val){
        if (!isNaN(+val[1])) {
            ratings.push({
                critic: +val[1],
                audience: +val[2]
            });
        }
    });
    popData = [ratings];
    drawChart(6);
});


