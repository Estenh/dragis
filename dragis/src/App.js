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
const colors = ["#14ad09", "#090cad", "#d91616"];

function App() {
  const center = [63.4304856527785, 10.395052831328947];
  const [layers, setLayers] = useState([]);
  const [activeLayers, setActiveLayers] = useState([]);
  const [layerColors, setLayerColors] = useState(colors);
  const [attributeTable, setAttributeTable] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState(false);

  function addLayers(layer) {
    if (!layers.some((el) => el.layername === layer.layername)) {
      layer.visible = true;
      selectStyle(layer);
      setLayers([...layers, layer]);
      // setActiveLayers([...activeLayers, layer]);
    }
  }

  function reorderLayers(layers) {
    setActiveLayers([]);
    setLayers(layers);
  }

  function toggleVisibility(layerName) {
    const newLayers = [...layers];
    const layer = newLayers.find((layer) => layer.layername === layerName);
    layer.visible = !layer.visible;
    const visibleLayers = newLayers.filter((layer) => layer.visible);
    setActiveLayers(visibleLayers);
  }

  function updateActiveLayers() {
    const newLayers = [...layers];
    const visibleLayers = newLayers.filter((layer) => layer.visible);
    setActiveLayers(visibleLayers);
  }

  function selectStyle(layer, color = null, weight = 2, fillOpacity = 1) {
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
      setLayers([...layers]);
    }
  }

  function selectLayer(layername) {
    setSelectedLayer(layername);
  }

  function deleteLayer(deleteLayername) {
    if (deleteLayername === selectedLayer) {
      setSelectedLayer(null);
    }
    setLayers((current) => {
      return current.filter((layer) => layer.layername !== deleteLayername);
    });
  }

  function openAttributeTable(layername) {
    const newState = !attributeTable;
    setAttributeTable(newState);
  }

  function drawNewLayers() {
    const newLayers = [...layers];
    const visibleLayers = newLayers.filter((layer) => layer.visible);
    setActiveLayers(visibleLayers);
  }

  function showSelected(e) {
    console.log(e);
  }

  useEffect(() => {
    console.log(layers);
    updateActiveLayers();
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
      <Contentbar
        layers={layers}
        addLayers={addLayers}
        reorderLayers={reorderLayers}
        toggleVisibility={toggleVisibility}
        openAttributeTable={openAttributeTable}
        selectLayer={selectLayer}
        selectedLayer={selectedLayer}
        selectStyle={selectStyle}
        deleteLayer={deleteLayer}
      />
      <MuiToolbar layers={layers} addLayers={addLayers} />
      {attributeTable && selectedLayer && (
        <AttributeTable
          layers={layers}
          selectedLayer={selectedLayer}
          openAttributeTable={openAttributeTable}
        />
      )}
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
        {/* <LocationMarker /> */}
        {activeLayers.toReversed().map((layer) => (
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
