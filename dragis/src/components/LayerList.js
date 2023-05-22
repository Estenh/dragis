import React from "react";
import Layer from "./Layer";

function LayerList({ layers, toggleVisibility }) {
  return (
    <div className="layerList">
      <h3>Feature layers:</h3>
      <ul>
        {layers.map((layer) => (
          <Layer
            key={layer.layername}
            layer={layer}
            toggleVisibility={toggleVisibility}
          />
        ))}
      </ul>
    </div>
  );
}

export default LayerList;
