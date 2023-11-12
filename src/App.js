import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "./App.css";
import Contentbar from "./components/Contentbar";
import HeaderBar from "./components/HeaderBar";
import AttributeTable from "./components/AttributeTable";
import { circleMarker } from "leaflet";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

/**
 * The main component, all other components are children of App.js
 */

const colors = ["#14ad09", "#090cad", "#d91616", "#e6e916", "#db16e9"]; // colors that are assigned to new layer at random

const attributes = {
  // light and dark mode base map attributes
  light:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  dark: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
};
const urls = {
  // light and dark mode base map tiles
  light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  dark: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
};

function App() {
  const center = [63.4304856527785, 10.395052831328947]; // yo
  const [layers, setLayers] = useState([]);
  const [activeLayers, setActiveLayers] = useState([]);
  const [layerColors, setLayerColors] = useState(colors);
  const [attributeTable, setAttributeTable] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState(false);
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function addLayers(layer) {
    if (!layers.some((el) => el.layername === layer.layername)) {
      layer.visible = true;
      selectStyle(layer);
      setActiveLayers([]);
      setLayers([...layers, layer]);
      // setActiveLayers([...activeLayers, layer]);
      console.log(layers);
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

  useEffect(() => {
    updateActiveLayers();
  }, [layers]);
  useEffect(() => {
    if (layerColors.length === 0) {
      setLayerColors(colors);
    }
  }, [layerColors]);
  return (
    <ThemeProvider theme={theme}>
      {/* <Contentbar
        layers={layers}
        addLayers={addLayers}
        reorderLayers={reorderLayers}
        toggleVisibility={toggleVisibility}
        openAttributeTable={openAttributeTable}
        selectLayer={selectLayer}
        selectedLayer={selectedLayer}
        selectStyle={selectStyle}
        deleteLayer={deleteLayer}
      /> */}
      <HeaderBar
        layers={layers}
        addLayers={addLayers}
        reorderLayers={reorderLayers}
        toggleVisibility={toggleVisibility}
        openAttributeTable={openAttributeTable}
        selectLayer={selectLayer}
        selectedLayer={selectedLayer}
        selectStyle={selectStyle}
        deleteLayer={deleteLayer}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
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
          url={darkMode ? urls.dark : urls.light}
          attribution={darkMode ? attributes.dark : attributes.light}
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
      </MapContainer>
    </ThemeProvider>
  );
}

export default App;
