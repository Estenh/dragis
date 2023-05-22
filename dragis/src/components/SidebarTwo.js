import React from "react";
import "./Sidebar.css";
import LayerList from "./LayerList";

function SidebarTwo({ addLayers, layers, toggleVisibility }) {
  let handleLayerAdd = (e) => {
    let layerFile = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(layerFile);
    reader.onload = function (e) {
      let jsonLayer = JSON.parse(reader.result);
      jsonLayer.layername = layerFile.name.slice(0, -5);
      addLayers(jsonLayer);
    };
  };
  return (
    <div className="sidebar">
      <LayerList layers={layers} toggleVisibility={toggleVisibility} />
      <input
        type="file"
        id="layerFile"
        placeholder="your"
        onChange={handleLayerAdd}
        value=""
        hidden
      />
      <label htmlFor="layerFile">Add data</label>
    </div>
  );
}

export default SidebarTwo;
