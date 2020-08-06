import React, { useState, useEffect } from 'react';
import ReactMapGl from 'react-map-gl';

const App = () => {
  const initialViewport = {
    latitude: 37,
    longtitude: -122,
  };

  const [viewport, setViewport] = useState(initialViewport);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setViewport({
          latitude,
          longitude,
        });
      },
      () => {},
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <ReactMapGl
      {...viewport}
      width="100vw"
      height="100vh"
      zoom={11}
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    />
  );
};

export default App;
