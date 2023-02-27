import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import LocationMarker from "./components/locationMarker.js";
import DrawPolygon from "./components/drawPolygon.js";

function App() {
  const center = [63.4304856527785, 10.395052831328947];
  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <DrawPolygon />
      <Marker position={center}>
        <Popup>
          Dette er midten av Trondheim. <br /> Norges fineste by!
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;
