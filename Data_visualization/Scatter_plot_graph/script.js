// JavaScript (script.js)
const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

fetch(url)
  .then(response => response.json())
  .then(data => {
    const dataset = data.map(d => ({
      year: new Date(d.Year.toString()),
      time: new Date(0, 0, 0, 0, d.Time.split(':')[0], d.Time.split(':')[1]),
      doping: d.Doping,
      name: d.Name,
      nationality: d.Nationality,
      place: d.Place,
      seconds: d.Seconds,
      url: d.URL
    }));

    const margin = { top: 50, right: 50, bottom: 50, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleTime()
      .domain([d3.min(dataset, d => d.year), d3.max(dataset, d => d.year)])
      .range([0, width]);

    const yScale = d3.scaleTime()
      .domain(d3.extent(dataset, d => d.time))
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    svg.append("g")
      .attr("id", "y-axis")
      .call(yAxis);

    svg.selectAll(".dot")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("data-xvalue", d => d.year)
      .attr("data-yvalue", d => d.time)
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.time))
      .attr("r", 5)
      .style("fill", d => d.doping ? "red" : "blue")
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html(`
          ${d.name} (${d.nationality})<br>
          Year: ${d.year.getFullYear()}<br>
          Time: ${d.time.getMinutes()}:${d.time.getSeconds()}<br>
          ${d.doping ? "Doping Allegation: " + d.doping : "No doping allegations"}
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
    svg.append("text")
      .attr("id", "legend")
      .attr("x", width - 100)
      .attr("y", height - 30)
      .text("Doping Allegations")
      .style("fill", "red");
  });
