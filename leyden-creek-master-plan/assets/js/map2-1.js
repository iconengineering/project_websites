$( document ).ready(function() {

  mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
  var map = new mapboxgl.Map({
      container: 'figure2-1', // container id
      style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
      center: [-104.9, 39.75], // starting position
      zoom: 8.2, // starting zoom
      interactive: false
  });

  map.on('load', function () {
    
  	map.addSource('bounds', {
        type: 'geojson',
        "data": '../assets/js/geojson/leydenBounds.geojson'
    });
    map.addSource('district', {
        type: 'geojson',
        "data": '../assets/js/geojson/districtBounds.geojson'
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
            'line-color': '#888',
            'line-dasharray': [3,2]
        }
    }, 'road-label-small');
    map.addLayer({
        'id': 'districtBounds',
        'type': 'line',
        'source': 'district',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 3], [17, 5], [19, 8]]
          },
            'line-color': '#FF5722'
        }
    });
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
    });
  }); //map load
});