// JavaScript (script.js)
const url = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
const mapUrl = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

const tooltip = d3.select("#tooltip");

fetch(url)
  .then(response => response.json())
  .then(data => {
    const educationData = data;

    fetch(mapUrl)
      .then(response => response.json())
      .then(topology => {
        const counties = topojson.feature(topology, topology.objects.counties).features;
        const us = topojson.mesh(topology, topology.objects.states, (a, b) => a !== b);

        const width = 960;
        const height = 600;

        const svg = d3.select("#choropleth")
          .attr("width", width)
          .attr("height", height);

        const colorScale = d3.scaleQuantize()
          .domain(d3.extent(educationData, d => d.bachelorsOrHigher))
          .range(["#f7f7f7", "#d9f0a3", "#addd8e", "#78c679", "#31a354", "#006837"]);

        svg.selectAll(".county")
          .data(counties)
          .enter()
          .append("path")
          .attr("class", "county")
          .attr("data-fips", d => d.id)
          .attr("data-education", d => {
            const countyData = educationData.find(data => data.fips === d.id);
            return countyData ? countyData.bachelorsOrHigher : 0;
          })
          .attr("fill", d => {
            const countyData = educationData.find(data => data.fips === d.id);
            return countyData ? colorScale(countyData.bachelorsOrHigher) : "#ccc";
          })
          .attr("d", d3.geoPath())
          .on("mouseover", (event, d) => {
            tooltip.transition()
              .duration(200)
              .style("opacity", 0.9);
            tooltip.html(`
              ${d.properties.area_name}, ${d.properties.state}: ${d3.format(".1f")(educationData.find(data => data.fips === d.id).bachelorsOrHigher)}%
            `)
              .attr("data-education", educationData.find(data => data.fips === d.id).bachelorsOrHigher)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", () => {
            tooltip.transition()
              .duration(500)
              .style("opacity", 0);
          });

        svg.append("path")
          .datum(us)
          .attr("class", "states")
          .attr("d", d3.geoPath());

        // Legend
        const legendColors = ["#f7f7f7", "#d9f0a3", "#addd8e", "#78c679", "#31a354", "#006837"];

        const legend = d3.select("#legend");

        legend.selectAll(".legend-item")
          .data(legendColors)
          .enter()
          .append("div")
          .attr("class", "legend-item")
          .style("background-color", d => d)
          .text(d => {
            const extent = colorScale.invertExtent(d);
            return `${extent[0].toFixed(1)} - ${extent[1].toFixed(1)}%`;
          });
      });
  });
