// JavaScript (script.js)
const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

fetch(url)
  .then(response => response.json())
  .then(data => {
    const baseTemperature = data.baseTemperature;
    const monthlyData = data.monthlyVariance;

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const years = monthlyData.map(d => d.year);
    const temperatures = monthlyData.map(d => baseTemperature + d.variance);
    const varianceExtent = d3.extent(monthlyData, d => d.variance);

    const margin = { top: 80, right: 20, bottom: 100, left: 100 };
    const width = 1200 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
      .domain(years)
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(months)
      .range([0, height]);

    const colorScale = d3.scaleLinear()
      .domain(varianceExtent)
      .range(["#4575b4", "#91bfdb", "#e0f3f8", "#fee090", "#fc8d59", "#d73027"])
      .interpolate(d3.interpolateRgb);

    const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter(year => year % 10 === 0));
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g")
      .attr("id", "y-axis")
      .call(yAxis);

    svg.selectAll(".cell")
      .data(monthlyData)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("data-month", d => d.month - 1)
      .attr("data-year", d => d.year)
      .attr("data-temp", d => baseTemperature + d.variance)
      .attr("x", d => xScale(d.year))
      .attr("y", d => yScale(months[d.month - 1]))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .style("fill", d => colorScale(d.variance))
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html(`
          ${months[d.month - 1]} ${d.year}<br>
          Temperature: ${(baseTemperature + d.variance).toFixed(2)}℃<br>
          Variance: ${d.variance.toFixed(2)}℃
        `)
          .attr("data-year", d.year)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", () => {
        d3.select("#tooltip")
          .transition()
          .duration(500)
          .style("opacity", 0);
      });

    // Legend
    const legendColors = ["#4575b4", "#91bfdb", "#e0f3f8", "#fee090", "#fc8d59", "#d73027"];
    const legendValues = [-7, -4, -2, 0, 2, 4, 7];

    const legend = d3.select("#legend");

    legend.selectAll(".legend-item")
      .data(legendValues)
      .enter()
      .append("div")
      .attr("class", "legend-item")
      .style("background-color", d => colorScale(d))
      .text(d => d);
  });
