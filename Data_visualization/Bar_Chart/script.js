// Data for the bar chart (sample data)
const dataset = [
    { date: "1947-01-01", gdp: 243.1 },
    { date: "1947-04-01", gdp: 246.3 },
    { date: "1947-07-01", gdp: 250.1 },
    // Add more data points here...
  ];
  
  // Dimensions and margins
  const margin = { top: 20, right: 30, bottom: 30, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  // Create SVG element
  const svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // Scales
  const xScale = d3.scaleBand()
    .domain(dataset.map(d => d.date))
    .range([0, width])
    .padding(0.1);
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.gdp)])
    .nice()
    .range([height, 0]);
  
  // Axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  
  // Append axes
  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
  
  svg.append("g")
    .attr("id", "y-axis")
    .call(yAxis);
  
  // Create bars
  svg.selectAll(".bar")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", d => d.date)
    .attr("data-gdp", d => d.gdp)
    .attr("x", d => xScale(d.date))
    .attr("y", d => yScale(d.gdp))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.gdp))
    .on("mouseover", (event, d) => {
      const tooltip = d3.select("#tooltip");
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip.html(`Date: ${d.date}<br>GDP: ${d.gdp}`)
        .attr("data-date", d.date)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
      d3.select("#tooltip")
        .transition()
        .duration(500)
        .style("opacity", 0);
    });
  