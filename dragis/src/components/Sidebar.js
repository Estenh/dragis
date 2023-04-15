import React from "react";
import { useState, useRef, useEffect } from "react";
import "./Sidebar.css";

const LOCAL_STORAGE_KEY = "GISLayers";

function Sidebar({ updateLayers }) {
  // const inputFile = useRef();
  // if (inputFile.current) {
  //   let file = inputFile.current.files[0];
  //   let fileReader = new FileReader();
  //   fileReader.readAsText(file);
  //   fileReader.onload = (event) => {
  //     let jsLayer = JSON.parse(fileReader.result);
  //     console.log(jsLayer);
  //     setLayers((prevLayers) => {
  //       return [...prevLayers, jsLayer];
  //     });
  //   };
  //   inputFile.current.value = null;
  // }
  // comment test222
  const input = document.querySelector('input[type="file"]');
  if (input) {
    input.addEventListener("input", function (e) {
      let file = input.files[0];
      let fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function () {
        let json_layer = JSON.parse(fileReader.result);
        json_layer.layername = file.name;
        // if (!layers.some((el) => el.layername === json_layer.layername)) {
        updateLayers(json_layer);
        input.value = "";
        // }
      };
    });
  }
  // function handleLayerAdd(e) {
  //   const layer = inputFile.current.value;
  //   console.log(layer.files);
  //   let reader = new FileReader();
  //   reader.onload = function () {
  //     console.log(reader.result);
  //   };
  //   //reader.readAsText(layer);
  // }
  return (
    <div className="sidebar">
      <ul>
        <li>En</li>
        <li>To</li>
        <li>Tre</li>
        <li>Fire</li>
        <li>Fem</li>
        <li>Seks</li>
        <li>Sju</li>
        <li>Sjus</li>
      </ul>
      <input type="file" placeholder="your" value="" />
      <p className="test">hei</p>
    </div>
  );
}

export default Sidebar;
