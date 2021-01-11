// @TODO: YOUR CODE HERE!
//import data
d3.csv("data.csv").then(function(data){
    //parse data
    data.forEach(funciton(scatterdata){
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
})