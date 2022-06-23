import React, { useState, useEffect, useRef } from "react";
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import ttMap from '@tomtom-international/web-sdk-maps';
import ttService from '@tomtom-international/web-sdk-services'

const BARCELONA = [2.0701, 41.3926];
const AMSTERDAM = [4.900437,52.379184];

function Map() {
  
  const [map, setMap] = useState({});
  const mapElement = useRef();

  useEffect(() => {
    let map = ttMap.map({
      key: "QwMM6cMMe1lyGo0jL4w8Zv5nGrerydvb",
      container: mapElement.current,
      center: AMSTERDAM,
      zoom: 12
    });
    setMap(map);
    map.on('load', function() {
        map.showTrafficFlow();
        var nav = new ttMap.NavigationControl({});
        map.addControl(nav, 'bottom-right');
    });
    return () => map.remove();
  }, []);

  const updateMap = (lat, lon, zoom = 12) => {
    map.setCenter([parseFloat(lat), parseFloat(lon)]);
    map.setZoom(zoom);
  };
  
  const getRoute = async() => {
      const routeOptions = {
          key: "QwMM6cMMe1lyGo0jL4w8Zv5nGrerydvb",
          locations: '4.900437,52.379184:4.325819,52.080756'
          // Ams centraal 4.900437,52.379184
          // DH CS: 4.325819,52.080756
      };
      
      const route = await (await ttService.services.calculateRoute(routeOptions)).toGeoJson()
      addPolygonToMap('1', route);
      
  };

    function addPolygonToMap(id, rangeData) {
        let polygonLayer = buildStyle(id, rangeData);
        map.addLayer(polygonLayer);
    }

    function buildStyle(id, data) {
        return {
            'id': id,
            'type': 'line',
            'source': {
                'type': 'geojson',
                'data': data
            },
            'paint': {
                'line-color': '#3b73b4',
                'line-width': 7,
            },
            'layout': {}
        }
    }

  return (
    <>
        <button onClick={getRoute}>Route</button>
        <div
            ref={mapElement}
            style={{width: '50vw', height: '90vh'}}
        />
    </>
  );
}

export default Map;