import React from "react";
import { useState, useRef, useEffect } from "react";
import "./Sidebar.css";

const LOCAL_STORAGE_KEY = "GISLayers";

function Sidebar({ setLayers }) {
  const inputFile = useRef();

  const input = document.querySelector('input[type="file"]');
  if (input) {
    input.addEventListener("change", function (e) {
      let file = input.files[0];
      let fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function () {
        let json_layer = JSON.parse(fileReader.result);
        setLayers(json_layer);
      };
    });
  }

  function handleLayerAdd(e) {
    const layer = inputFile.current.value;
    console.log(layer.files);
    let reader = new FileReader();
    reader.onload = function () {
      console.log(reader.result);
    };
    //reader.readAsText(layer);
  }
  return (
    <div className="sidebar">
      <ul>
        <li>En</li>
        <li>To</li>
        <li>Tre</li>
        <li>Fire</li>
        <li>Fem</li>
        <li>Seks</li>
      </ul>
      <input ref={inputFile} type="file" />
      <p className="test">hei</p>
    </div>
  );
}

export default Sidebar;
