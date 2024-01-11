$( document ).ready(function() {

  mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
  var map = new mapboxgl.Map({
      container: 'figure7-1', // container id
      style: 'mapbox://styles/mapbox/satellite-streets-v9', //stylesheet location
      center: [-105.2, 39.845], // starting position
      zoom: 11.75, // starting zoom
  });

  map.on('load', function () {

    map.addSource('bounds', {
        type: 'geojson',
        "data": '../assets/js/geojson/leydenBounds.geojson'
    });
    map.addSource('schematic', {
        type: 'geojson',
        "data": '../assets/js/geojson/leydenSchematic.geojson'
    });
    map.addSource('reaches', {
        type: 'geojson',
        "data": '../assets/js/geojson/leydenCreekReaches.geojson'
    });
    map.addSource('arvada', {
        type: 'geojson',
        "data": '../assets/js/geojson/arvadaLimits.geojson'
    });
    map.addSource('counties', {
        type: 'geojson',
        "data": 'https://cdn.rawgit.com/ebendennis/dd38752d0d9f5d9227f718f90a22fe8c/raw/1e8496d81069ce94528cd97c6970422800419cd8/ColoradoCountiesLn.geojson'
    });
    map.addLayer({
        'id': 'counties',
        'type': 'line',
        'source': 'counties','layout': {
            'line-join': 'miter',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#fff',
            'line-dasharray': [3,2]
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'arvadaFill',
        'type': 'fill',
        'source': 'arvada',
        'paint': {
            'fill-color': '#B3E5FC',
            'fill-opacity': 0.2
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'arvada',
        'type': 'line',
        'source': 'arvada',
        'layout': {
            'line-join': 'miter',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#333',
            'line-dasharray': [3,2]
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'bounds',
        'type': 'line',
        'source': 'bounds',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 3], [17, 5], [19, 8]]
          },
            'line-color': '#3F51B5'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'reach1',
        'type': 'line',
        'source': 'reaches',
        'filter': ['==', 'Id', 1],
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 8]]
          },
          'line-color': '#bf5b17'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'reach2',
        'type': 'line',
        'source': 'reaches',
        'filter': ['==', 'Id', 2],
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 8]]
          },
          'line-color': '#fdc086'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'reach3',
        'type': 'line',
        'source': 'reaches',
        'filter': ['==', 'Id', 3],
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 8]]
          },
          'line-color': '#ffff99'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'reach4',
        'type': 'line',
        'source': 'reaches',
        'filter': ['==', 'Id', 4],
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 8]]
          },
          'line-color': '#beaed4'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'reachLabels',
        'type': 'symbol',
        'source': 'reaches',
        'layout': {
            'visibility': 'visible',
          'symbol-placement': 'line',
          'text-field': 'Reach {Id}',
          'text-font': ['Roboto Light','Open Sans Light','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[13,12],[15,14],[17,16]]
          }
        },
        'paint': {
          'text-color': '#fff',
          'text-halo-color': 'rgba(50,50,50 ,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 0.1
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'schematic-hover',
        'type': 'circle',
        'source': 'schematic',
        'filter': ['==','title',''],
        "paint": {
            "circle-color": "#ff8a80",
            "circle-radius": 10,
            "circle-blur": .5
        }
    });
    map.addLayer({
        'id': 'schematic',
        'type': 'circle',
        'source': 'schematic',
        "paint": {
            "circle-color": "#ff1744"
        }
    });
  }); //map load

  // When a click event occurs near a place, open a popup at the location of
// the feature, with description HTML from its properties.
  map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['schematic'] });

    if (!features.length) {
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    var popup = new mapboxgl.Popup()
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<b>' + feature.properties.title + '</b><hr>' + feature.properties.description)
        .addTo(map);
  });

  // Use the same approach as above to indicate that the symbols are clickable
  // by changing the cursor style to 'pointer'.
  map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['schematic'] });
      if (features.length) {
            map.setFilter("schematic-hover", ["==", "title", features[0].properties.title]);
          } else {
            map.setFilter("schematic-hover", ["==", "title", ""]);
          }
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });

  map.on("mouseout", function() {
        map.setFilter("schematic-hover", ["==", "title", ""]);
    });

});