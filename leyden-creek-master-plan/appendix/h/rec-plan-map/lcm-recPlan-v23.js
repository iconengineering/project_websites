mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v9',
    center: [-105.2, 39.845], // starting position
    zoom: 11.75, // starting zoom
    hash: true,
    preserveDrawingBuffer: true
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
    $('.layer-off').prop('checked', false);
    $('.layer-on').prop('checked', true);
    $('.label-off').removeClass('is-checked');
    $('.label-on').addClass('is-checked');
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

function printCanvas() {
    var w = window.open('', '');
    w.document.title = "Printed - Leyden Creek Recommended Plan";
    var img = new Image();
    img.src = map.getCanvas().toDataURL('image/png', 1.0);
    img.style.maxWidth = "100%";
    w.document.body.appendChild(img);
}

map.on('style.load', function () {

    map.addSource('layers', {
        type: 'vector',
        url: 'mapbox://iconeng.58e11b26'
    });

    map.addSource('bounds', {
        type: 'geojson',
        "data": '../../../assets/js/geojson/leydenBounds.geojson'
    });
    map.addSource('arvada', {
        type: 'geojson',
        "data": '../../../assets/js/geojson/arvadaLimits.geojson'
    });
    map.addSource('lcmDevs', {
        type: 'geojson',
        "data": '../../../assets/js/geojson/lcmDevelopments.geojson'
    });
    map.addSource('reaches', {
        type: 'geojson',
        "data": '../../../assets/js/geojson/leydenCreekReaches.geojson'
    });
    map.addSource('storage', {
        type: 'geojson',
        "data": '../../../assets/js/geojson/storageFacilities.geojson'
    });
    map.addSource('streams', {
        type: 'geojson',
        "data": '../../../assets/js/geojson/streams.geojson'
    });
    map.addSource('gages', {
        type: 'geojson',
        "data": '../../../assets/js/geojson/udfcdStreamGages.geojson'
    });
    map.addSource('callouts', {
        type: 'geojson',
        "data": '../../../assets/js/geojson/EPlanCallouts.geojson'
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
        'layout': { 'visibility': 'visible'},
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
            'visibility':'visible',
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
            'visibility': 'visible',
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
        'id': 'developments',
        'type': 'fill',
        'source': 'lcmDevs',
        'layout': { 'visibility': 'visible'},
        'paint': {
            'fill-opacity': 0.4,
            'fill-color': {
                property: 'OBJECTID',
                type: 'categorical',
                stops: [
                    [1, '#795548'],
                    [2, '#CDDC39'],
                    [3, '#009688']
                    ]
                }
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'effectiveFldpln',
        'type': 'fill',
        'source': 'layers',
        'source-layer': 'effectiveFldpln',
        'layout': { 'visibility': 'visible'},
        'paint': {
            'fill-opacity': 0.6,
            'fill-color': {
                property: 'FLD_ZONE',
                type: 'categorical',
                stops: [
                    ['AE', '#2196F3'],
                    ['X', '#BBDEFB']
                    ]
                }
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'callouts',
        'type': 'fill',
        'source': 'callouts',
        'layout': { 'visibility': 'visible'},
        'paint': {
            'fill-color': '#fff',
            'fill-opacity': .01
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'callouts-hover',
        'type': 'line',
        'source': 'callouts',

        'filter': ['==','description',''],
        'layout': {
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
        'id': 'wetland',
        'type': 'fill',
        'source': 'layers',
        'source-layer': 'wetlandMitigation',
        'layout': { 'visibility': 'none'},
        'paint': {
            'fill-opacity': 0.6,
            'fill-color': '#4CAF50'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'fldplnStructures',
        'type': 'fill',
        'source': 'layers',
        'source-layer': 'fldplnStructures',
        'layout': { 'visibility': 'visible'},
        'paint': {
            'fill-opacity': 0.6,
            'fill-color': '#FFEB3B'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': '100yrProposed',
        'type': 'line',
        'source': 'layers',
        'source-layer': '100yrProposed',
        'layout': {
            'visibility': 'visible',
            'line-join': 'miter',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#18FFFF',
            'line-dasharray': [4,2]
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'streams',
        'type': 'line',
        'source': 'streams',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[13, .75], [15, 1.25],[17, 2]]
          },
          'line-opacity': .75,
          'line-color': '#03A9F4'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'proposedStream',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'proposedStream',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 8]]
          },
          'line-color': '#FFFF00'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'reaches',
        'type': 'line',
        'source': 'reaches',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
          'line-color': '#212121'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'proposedGradingMjr',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'proposedGrading',
        'filter': ['==', 'LAYER', 'P-SURF-CONT-MJR'],
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, .75], [17, 1.5], [19, 3]]
          },
          'line-color': '#BF360C'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'proposedGradingMnr',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'proposedGrading',
        'filter': ['==', 'LAYER', 'P-SURF-CONT-MNR'],
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, .25], [17, .5], [19, 1]]
          },
          'line-color': '#BF360C'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'gradingLabels',
        'type': 'symbol',
        'source': 'layers',
        'source-layer': 'proposedGrading',
        'filter': ['==', 'LAYER', 'P-SURF-CONT-MJR'],
        'layout': {
            'visibility': 'none',
          'symbol-placement': 'line',
          'text-field': '{ELEVATION}',
          'text-font': ['Roboto Light','Open Sans Light','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[13,6],[15,8],[17,10]]
          }
        },
        'paint': {
          'text-color': '#fff',
          'text-halo-color': 'rgba(191,54,12 ,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 0.1
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'dropStructure',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'dropStructure',
        'layout': {
            'visibility': 'none',
            'line-join': 'miter',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#FFC107',
            'line-dasharray': [2,1]
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'xingStructure',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'xingStructure',
        'layout': {
            'visibility': 'none',
            'line-join': 'miter',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#FF5722',
            'line-dasharray': [2,1]
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'checkStructures',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'checkStructures',
        'layout': {
            'visibility': 'none',
            'line-join': 'miter',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#D500F9',
            'line-dasharray': [1,1]
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'culvertWingwalls',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'culvertWingwalls',
        'layout': {
            'visibility': 'none',
            'line-join': 'miter',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#FF5722'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'boulderWalls',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'boulderWalls',
        'layout': {
            'visibility': 'none',
            'line-join': 'miter',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#651FFF',
            'line-dasharray': [1,1]
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'futureTrails',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'futureTrails',
        'layout': {
            'visibility': 'none',
            'line-join': 'miter',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 8]]
          },
            'line-color': '#ff8a80'
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'streamsLabels',
        'type': 'symbol',
        'source': 'streams',
        'layout': {
            'visibility': 'visible',
          'symbol-placement': 'line',
          'text-field': '{GNIS_Name}',
          'text-font': ['Roboto Light Italic','Open Sans Light Italic','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[13,9],[15,12],[17,14]]
          }
        },
        'paint': {
          'text-color': '#03A9F4',
          'text-halo-color': 'rgba(250,250,250 ,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 0.1
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
        'id': 'gages',
        'type': 'circle',
        'source': 'gages',
        'layout': { 'visibility': 'visible'},
        "paint": {
            "circle-color": "#673AB7"
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'storage',
        'type': 'circle',
        'source': 'storage',
        'layout': { 'visibility': 'visible'},
        "paint": {
            "circle-color": "#00BCD4"
        }
    }, 'road-label-small');
  }); //map load

// When a click event occurs near a place, open a popup at the location of
// the feature, with description HTML from its properties.
  map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['gages','storage','callouts'] });

    if (!features.length) {
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    if (feature.layer.id == 'gages'){
    var popup = new mapboxgl.Popup()
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<b>' + feature.properties.Name + '</b>')
        .addTo(map);
    } else if (feature.layer.id == 'storage'){
    var popup = new mapboxgl.Popup()
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<b>' + feature.properties.LabelName + '</b>')
        .addTo(map);
    } else if (feature.layer.id == 'callouts'){
    var popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<div>' + feature.properties.description + '</div')
        .addTo(map);
    } else {
      return;
    }
  });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
  map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['gages','storage','callouts'] });
      if (features.length) {
            map.setFilter("callouts-hover", ["==", "description", features[0].properties.description]);
          } else {
            map.setFilter("callouts-hover", ["==", "description", ""]);
          }
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });

  map.on("mouseout", function() {
        map.setFilter("callouts-hover", ["==", "description", ""]);
    });

map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

