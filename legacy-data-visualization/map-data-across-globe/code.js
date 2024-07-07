// Load the meteorite data from the API
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json')
 .then(response => response.json())
 .then(data => {
    // Create the map
    const map = L.map('map').setView([40, -100], 4);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      subdomains: ['a', 'b', 'c']
    }).addTo(map);

    // Create a layer group for the meteorites
    const meteorites = L.layerGroup().addTo(map);

    // Loop through the meteorite data and add markers to the map
    data.features.forEach(meteorite => {
      const lat = meteorite.geometry.coordinates[1];
      const lon = meteorite.geometry.coordinates[0];
      const size = meteorite.properties.mass / 1000; // Convert mass to kg
      const marker = L.circleMarker([lat, lon], {
        radius: size,
        color: 'ed',
        opacity: 0.5,
        fillOpacity: 0.5
      }).addTo(meteorites);

      // Add a tooltip to the marker
      const tooltip = L.tooltip({
        permanent: true,
        direction: 'top',
        className: 'tooltip'
      }).setContent(`
        <h2>${meteorite.properties.name}</h2>
        <p>Mass: ${meteorite.properties.mass} grams</p>
        <p>Year: ${meteorite.properties.year}</p>
      `).addTo(marker);
    });
  });