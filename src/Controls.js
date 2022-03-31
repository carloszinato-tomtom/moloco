import React, { useState, useEffect, useRef } from "react";

const Controls = ({ findDevice, mockLocation, deviceName }) => {
  return (
    <div style={{
          display: 'flex',
          flexDirection: 'row'
        }}
    >
      <button onClick={findDevice}>Get Something</button>
      <button onClick={mockLocation}>Set Location</button>
      <p>{`Selected device: ${deviceName}`}</p>
    </div>
  );
}

export default Controls;