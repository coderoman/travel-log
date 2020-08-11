import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import cn from 'classnames';

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
  const [addEntryLocation, setAddEntryLocation] = useState(null);

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

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <>
      <ReactMapGl
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/coderoman/ckdiflo2m0j8f1ip8h1d1721n"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onDblClick={showAddMarkerPopup}
        doubleClickZoom={false}
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
                  <svg
                    className="marker red down"
                    style={{
                      width: '24px',
                      height: '24px',
                    }}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 460 460"
                  >
                    <g>
                      <g>
                        <path
                          d="M213.333,0C130.88,0,64,66.88,64,149.333c0,112,149.333,277.333,149.333,277.333s149.333-165.333,149.333-277.333
			C362.667,66.88,295.787,0,213.333,0z M213.333,202.667c-29.44,0-53.333-23.893-53.333-53.333S183.893,96,213.333,96
			s53.333,23.893,53.333,53.333S242.773,202.667,213.333,202.667z"
                        />
                      </g>
                    </g>
                  </svg>
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
        {addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            >
              <svg
                className={cn('marker', 'yellow', { down: addEntryLocation })}
                style={{
                  width: '24px',
                  height: '24px',
                }}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 426.667 426.667"
              >
                <g>
                  <g>
                    <path
                      d="M213.333,0C130.88,0,64,66.88,64,149.333c0,112,149.333,277.333,149.333,277.333s149.333-165.333,149.333-277.333
			C362.667,66.88,295.787,0,213.333,0z M213.333,202.667c-29.44,0-53.333-23.893-53.333-53.333S183.893,96,213.333,96
			s53.333,23.893,53.333,53.333S242.773,202.667,213.333,202.667z"
                    />
                  </g>
                </g>
              </svg>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top"
            >
              <div className="popup">
                <h3>Новая запись</h3>
              </div>
            </Popup>
          </>
        ) : null}
      </ReactMapGl>
    </>
  );
};

export default App;
