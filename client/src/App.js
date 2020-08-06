import React, { useState } from "react";
import ReactMapGl from "react-map-gl";

const App = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37,
    longtitude: -122,
    zoom: 8,
  });

  return <ReactMapGl {...viewport} onViewportChange={setViewport} />;
};

export default App;