// @TODO: YOUR CODE HERE!

//from cheat sheet for event resize
d3.select(window).on("resize", makeResponsive);
makeResponsive();

function makeResponsive(){
    var svgArea = d3.select("body").select("svg");
    //if svg exists remove and reload
    if (!svgArea.empty()){
        svgArea.remove();
    }
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 20,
        right: 40,
        bottom: 60,
        left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // make svg wrapper and append svg group to hold chart
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


    //import data
    d3.csv("data.csv").then(function(data){
    //parse data
        data.forEach(function(scatterdata){
        scatterdata.age = +scatterdata.age;
        scatterdata.smokes = +scatterdata.smokes;
    });
    //create scale functions
    var xLinearScale = d3.scaleLinear()
    .domain([28, d3.max(data, d => d.age)])
    .range([width, 0]);
    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.smokes)])
    .range([height, 0]);
    //create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    //append axis to charts
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
    chartGroup.append("g")
    .call(leftAxis);
    //make circles for data points
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "lightblue")
    .attr("opacity", ".5")
    //https://stackoverflow.com/questions/55988709/how-can-i-add-labels-inside-the-points-in-a-scatterplot

    var stateLabel= chartGroup.selectAll(null).data(data).enter().append("text");
    stateLabel
    .attr("x", function(d){
        return xLinearScale(d.age);
    })
    .attr("y", function(d){
        return yLinearScale(d.smokes);
    })
    .text(function(d){
        return d.abbr;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("fill", "darkblue");
    //init tool tip
    var toolTip = d3.tip()
    .attr("class", "d3.tip")
    .offset([80, -60])
    .html(function(d){
        return(`${d.state}<br>Age (Median): ${d.age}<br>Smokes (%): ${d.smokes}`);
    });
    //tooltip in chart
    chartGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data){
        toolTip.show(data, this)
        .attr("fill", "pink");
    })
    //on event
    .on("mouseout", function(data, index){
        toolTip.hide(data);
    });
    //make labels for axis
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Smokes (%)");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Age (Median)");
    }).catch(function (error){
        console.log(error);
    });
}
