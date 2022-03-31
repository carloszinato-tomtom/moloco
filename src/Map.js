import React, { useState, useEffect, useRef } from "react";
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';

const BARCELONA = [2.0701, 41.3926];

function Map() {
  
  const [map, setMap] = useState({});
  const mapElement = useRef();

  useEffect(() => {
    let map = tt.map({
      key: "QwMM6cMMe1lyGo0jL4w8Zv5nGrerydvb",
      container: mapElement.current,
      center: BARCELONA,
      zoom: 12
    });
    setMap(map);
    return () => map.remove();
  }, []);

  const updateMap = (lat, lon, zoom = 12) => {
    map.setCenter([parseFloat(lat), parseFloat(lon)]);
    map.setZoom(zoom);
  };

  return (
    <div
        ref={mapElement}
        style={{width: '50vw', height: '90vh'}}
    />
  );
}

export default Map;