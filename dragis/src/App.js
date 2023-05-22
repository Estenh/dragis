import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "./App.css";
import LocationMarker from "./components/locationMarker.js";
import SidebarTwo from "./components/SidebarTwo";
import Toolbar from "./components/Toolbar";
import myData from "./data/lineTest.json";

const polyStyle = { color: "red", weight: 2, fillOpacity: 0.5 };
const colors = ["green", "blue", "red"];

function App() {
  const center = [63.4304856527785, 10.395052831328947];
  const [layers, setLayers] = useState([]);
  const [activeLayers, setActiveLayers] = useState([]);
  const [layerColors, setLayerColors] = useState(colors);

  function addLayers(layer) {
    if (!layers.some((el) => el.layername === layer.layername)) {
      layer.visible = true;
      selectStyle(layer);
      setLayers([...layers, layer]);
      setActiveLayers([...activeLayers, layer]);
    }
  }

  function toggleVisibility(layerName) {
    const newLayers = [...layers];
    const layer = newLayers.find((layer) => layer.layername === layerName);
    layer.visible = !layer.visible;
    const visibleLayers = newLayers.filter((layer) => layer.visible);
    setActiveLayers(visibleLayers);
  }

  function selectStyle(layer, color = null, weight = 2, fillOpacity = 0.5) {
    const randomIndex = Math.floor(Math.random() * layerColors.length);
    if (!color) {
      layer.style = {
        color: layerColors[randomIndex],
        weight: weight,
        fillOpacity: fillOpacity,
      };
      setLayerColors([
        ...layerColors.slice(0, randomIndex),
        ...layerColors.slice(randomIndex + 1),
      ]);
    } else {
      layer.style = {
        color: color,
        weight: weight,
        fillOpacity: fillOpacity,
      };
    }
  }

  useEffect(() => {
    console.log(layers);
  }, [layers]);
  useEffect(() => {
    if (layerColors.length === 0) {
      setLayerColors(colors);
    }
  }, [layerColors]);
  useEffect(() => {
    console.log(activeLayers);
  }, [activeLayers]);
  return (
    <>
      <SidebarTwo
        addLayers={addLayers}
        layers={layers}
        toggleVisibility={toggleVisibility}
      />
      <Toolbar layers={layers} addLayers={addLayers} />
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
        {activeLayers.map((layer) => (
          <GeoJSON
            style={layer.style}
            key={layer.layername}
            data={layer.features}
          />
        ))}
        <Marker position={[38.5656, -0.0653]}>
          <Popup>Her bor det en løk!</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default App;
