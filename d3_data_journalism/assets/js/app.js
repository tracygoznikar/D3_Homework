// @TODO: YOUR CODE HERE!
//import data
d3.csv("data.csv").then(function(data){
    //parse data
    data.forEach(funciton (scatterdata) {
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
})