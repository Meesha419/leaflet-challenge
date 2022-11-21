// Initial map object creation
	// Set the longitude, latitude, and the starting zoom level 
		var myMap = L.map("map", {
	    center: [37.7749, -122.4194],
	    zoom: 5
	  });
	  
	  // Tile layer (the background map image) to map
	   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
	    maxZoom: 18,
	    id: "mapbox.streets",
	   	  }).addTo(myMap);
	

	  // Store our API endpoint
	 var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
	//var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
	

	//  GET color radius call to the query URL
	d3.json(queryUrl, function(data) {
	  function styleInfo(feature) {
	    return {
	      opacity: 1,
	      fillOpacity: 1,
	      fillColor: getColor(feature.properties.mag),
	      color: "#000000",
	      radius: getRadius(feature.properties.mag),
	      stroke: true,
	      weight: 0.5
	    };
	  }
	  // set different color from magnitude
	    function getColor(magnitude) {
	    switch (true) {
	    case magnitude > 5:
	      return "#ea452c";
	    case magnitude > 4:
	      return "#ea982c";
	    case magnitude > 3:
	      return "#d6cf13";
	    case magnitude > 2:
	      return "#ede900";
	    case magnitude > 1:
	      return "#d4ee00";
	    default:
	      return "#98ee00";
	    }
	  }
	  // set radiuss from magnitude
	    function getRadius(magnitude) {
	    if (magnitude === 0) {
	      return 1;
	    }
	

	    return magnitude * 4;
	  }
	    // GeoJSON layer
	    L.geoJson(data, {
	      // Maken cricles
	      pointToLayer: function(feature, latlng) {
	        return L.circleMarker(latlng);
	      },
	      // cirecle style
	      style: styleInfo,
	      // popup for each marker
	      onEachFeature: function(feature, layer) {
	        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
	      }
	    }).addTo(myMap);
	  
	    // Legend details
	    var legend = L.control({
	      position: "bottomleft"
	    });
	  
	      legend.onAdd = function() {
	      var div = L.DomUtil.create("div", "info legend");
	  
	      var grades = [0, 1, 2, 3, 4, 5];
	      var colors = [
	        "#98ee00",
	        "#d4ee00",
	        "#eecc00",
	        "#ee9c00",
	        "#ea822c",
	        "#ea2c2c"
	      ];
	  
	      // Looping through
	      for (var i = 0; i < grades.length; i++) {
	        div.innerHTML +=
	          "<i style='background: " + colors[i] + "'></i> " +
	          grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
	      }
	      return div;
	    };
	  
	    legend.addTo(myMap);
	  });

