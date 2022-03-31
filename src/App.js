import React from "react";

import { getDevice, setLocation } from "./api";
import Controls from './Controls';
import Map from './Map';

const BARCELONA = [2.0701, 41.3926];

function App() {

  const findDevice = async() => {
    const response = await getDevice();
  };
  
  const mockLocation = async() => {
    const response = await setLocation({
      deviceId: '123',
      lat: BARCELONA[0],
      lon: BARCELONA[1],
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} className="App">
      <Controls
        findDevice={findDevice}
        mockLocation={mockLocation}
        deviceName={''}
      />
      <Map />
    </div>
  );
}

export default App;