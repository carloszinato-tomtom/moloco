import React, { useState } from "react";
import { deviceInfo, locationParams } from './types';

import { getDevice, setLocation, resetLocation } from "./api";
import Controls from './Controls';
import Map from './Map';

import dummyData from './dummyData.json';

const BARCELONA = [2.0701, 41.3926];

function App() {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [mapLocation, setMapLocation] = useState(null);

  const findDevice = async () => {
    const response = await getDevice();
    if (response) {
      setDeviceInfo(JSON.parse(response));
    }
  };
  
  const mockLocation = async() => {
    const response = await setLocation({
      deviceId: deviceInfo?.UniqueDeviceID || '',
      lat: BARCELONA[0],
      lon: BARCELONA[1],
    });
    setDeviceInfo(JSON.parse(response));
  };

  const resetDeviceLocation = async() => {
    const response = await resetLocation(deviceInfo?.UniqueDeviceID);
    console.log('response', response);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} className="App">
      <Controls
        findDevice={findDevice}
        mockLocation={mockLocation}
        resetDeviceLocation={resetDeviceLocation}
        deviceName={deviceInfo?.DeviceName || ''}
      />
      <Map />
    </div>
  );
}

export default App;