import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';

import './App.css';

import { listLogEntries } from './api';

const App = () => {
  const initialViewport = {
    latitude: 37,
    longtitude: -122,
    zoom: 3,
  };
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState(initialViewport);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setViewport({
          latitude,
          longitude,
          zoom: 3,
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

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries.entries);
    })();
  }, []);

  return (
    <>
      <ReactMapGl
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/coderoman/ckdiflo2m0j8f1ip8h1d1721n"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {logEntries.length &&
          logEntries.map((entry) => (
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
              offsetLeft={viewport.zoom / 2}
              offsetTop={viewport.zoom / 2}
            >
              <div className="markerContent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: `calc(${viewport.zoom} / 4px`,
                    height: `calc( ${viewport.zoom} / 4px`,
                  }}
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="white"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-map-pin"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{entry.title}</span>
              </div>
            </Marker>
          ))}
      </ReactMapGl>
    </>
  );
};

export default App;
