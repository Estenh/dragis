import React from "react";

function Layer({ layer, toggleVisibility }) {
  function handleVisibilityChange() {
    toggleVisibility(layer.layername);
  }
  return (
    <li>
      <input
        type="checkbox"
        checked={layer.visible}
        onChange={handleVisibilityChange}
      />
      {layer.layername}
    </li>
  );
}

export default Layer;
