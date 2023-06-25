import React from "react";
import buffer from "@turf/buffer";
import "./Toolbar.css";

function Toolbar({ layers, addLayers }) {
  function testBuffer() {
    if (layers[0]) {
      const buff = buffer(layers[0], 0.1);
      console.log(buff.features);
      buff.layername = layers[0].layername + "_buffer";
      addLayers(buff);
    }
  }
  function createNewLayer(newLayer) {
    return;
  }

  return (
    <div className="toolbar">
      <button className="one">&#9776; Tools</button>
      <button className="two" onClick={testBuffer}>
        Buffer
      </button>
    </div>
  );
}

export default Toolbar;
