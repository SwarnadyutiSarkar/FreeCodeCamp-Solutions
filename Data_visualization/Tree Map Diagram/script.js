// JavaScript (script.js)
const url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

const tooltip = d3.select("#tooltip");

const width = 1000;
const height = 600;

const svg = d3.select("#treemap")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const treemap = d3.treemap()
  .size([width, height])
  .padding(1)
  .round(true);

d3.json(url).then(data => {
  const root = d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

  treemap(root);

  const cells = svg.selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

  cells.append("rect")
    .attr("class", "tile")
    .attr("data-name", d => d.data.name)
    .attr("data-category", d => d.data.category)
    .attr("data-value", d => d.data.value)
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => colorScale(d.parent.data.name))
    .on("mouseover", (event, d) => {
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip.html(`
        Name: ${d.data.name}<br>
        Category: ${d.data.category}<br>
        Value: ${d.data.value}
      `)
        .attr("data-value", d.data.value)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

  // Legend
  const categories = root.leaves().map(node => node.data.category);
  const uniqueCategories = Array.from(new Set(categories));

  const legend = d3.select("#legend");

  legend.selectAll(".legend-item")
    .data(uniqueCategories)
    .enter()
    .append("div")
    .attr("class", "legend-item")
    .style("background-color", d => colorScale(d))
    .text(d => d);
});
