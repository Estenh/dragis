import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "./App.css";
import LocationMarker from "./components/locationMarker.js";
import SidebarTwo from "./components/SidebarTwo";
import myData from "./data/lineTest.json";

const polyStyle = { color: "red", weight: 2, fillOpacity: 0.3 };
const layerColors = ["red", "greenwellow", "indigo"];

function App() {
  const center = [63.4304856527785, 10.395052831328947];
  const [layers, setLayers] = useState([]);

  function updateLayers(layer) {
    if (!layers.some((el) => el.layername === layer.layername)) {
      setLayers([...layers, layer]);
    }
  }
  useEffect(() => {
    console.log(layers);
  }, [layers]);
  return (
    <>
      <SidebarTwo updateLayers={updateLayers} />
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
        {layers.map((layer) => (
          <GeoJSON
            style={polyStyle}
            key={layer.layername}
            data={layer.features}
          />
        ))}
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
