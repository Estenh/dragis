import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import LocationMarker from "./components/locationMarker.js";
import DrawPolygon from "./components/drawPolygon.js";
import BufferTestTurf from "./components/bufferTestTurf";
import CentroidTestTurf from "./components/centroidTestTurf";
import Sidebar from "./components/Sidebar";
import myData from "./data/lineTest.json";

function App() {
  const center = [63.4304856527785, 10.395052831328947];
  const [layers, setLayers] = useState(myData);
  console.log(layers.features);
  return (
    <>
      <Sidebar setLayers={setLayers} />
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <DrawPolygon layers={layers} />
        <BufferTestTurf />
        <Marker position={center}>
          <Popup>
            Dette er midten av Trondheim. <br /> Norges fineste by!
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default App;
