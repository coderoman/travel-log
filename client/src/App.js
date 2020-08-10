import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import markerImg from './marker.png';

import './App.css';

import { listLogEntries } from './api';

const App = () => {
  const initialViewport = {
    latitude: 37,
    longtitude: -122,
    zoom: 3,
  };
  const [openedPopups, setOpenedPopups] = useState({});
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
            <>
              <Marker
                key={entry._id}
                latitude={entry.latitude}
                longitude={entry.longitude}
              >
                <div
                  className="markerContent"
                  onClick={() => setOpenedPopups({ [entry._id]: true })}
                >
                  <img
                    style={{
                      width: `24px`,
                      height: `24px`,
                    }}
                    src={markerImg}
                    alt="marker"
                    className="marker"
                  />
                  <span>{entry.title}</span>
                </div>
              </Marker>
              {openedPopups[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  anchor="top"
                  onClose={() => setOpenedPopups({ [entry._id]: false })}
                >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>
                      Visited on{' '}
                      {new Date(entry.visitDate).toLocaleDateString()}
                    </small>
                  </div>
                </Popup>
              ) : null}
            </>
          ))}
      </ReactMapGl>
    </>
  );
};

export default App;
