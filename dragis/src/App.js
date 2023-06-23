import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "./App.css";
import LocationMarker from "./components/locationMarker.js";
import SidebarTwo from "./components/SidebarTwo";
import Contentbar from "./components/Contentbar";
import myData from "./data/lineTest.json";
import MuiToolbar from "./components/MuiToolbar";
import AttributeTable from "./components/AttributeTable";
import { circleMarker } from "leaflet";

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

  function reorderLayers(layers) {
    setLayers(layers);
    let newArray = layers.filter((layer) => layer.visible);
    setActiveLayers([...newArray]);
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
        radius: 18,
      };
    }
  }

  function drawNewLayers() {
    const newLayers = [...layers];
    const visibleLayers = newLayers.filter((layer) => layer.visible);
    setActiveLayers(visibleLayers);
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
      {/* <Contentbar
        layers={layers}
        addLayers={addLayers}
        reorderLayers={reorderLayers}
        toggleVisibility={toggleVisibility}
      /> */}
      {/* <MuiToolbar layers={layers} addLayers={addLayers} /> */}
      <AttributeTable layers={layers} />
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
            pointToLayer={function (feature, latlng) {
              return circleMarker(latlng, { radius: 5 });
            }}
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
