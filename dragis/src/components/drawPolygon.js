import { Polyline, GeoJSON } from "react-leaflet";
import myData from "../data/lineTest.json";
import { useEffect } from "react";

function DrawPolygon({ layers }) {
  console.log("rerender");
  console.log(layers);
  const limeOptions = { color: "red", weight: 3, fillOpacity: 0.3 };
  return <GeoJSON style={limeOptions} data={layers.features} />;
}

export default DrawPolygon;
