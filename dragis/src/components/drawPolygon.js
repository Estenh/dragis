import { Polyline, GeoJSON } from "react-leaflet";
import myData from "../data/polylineCrs2.json";
import { useEffect } from "react";

const limeOptions = { color: "red", weight: 3, fillOpacity: 0.3 };

function DrawPolygon({ layers }) {
  useEffect(() => {
    // console.log("render");
    // console.log(layers.features);
    // console.log(myData.features);
  }, [layers]);
  return <GeoJSON style={limeOptions} data={layers.features} />;
}

export default DrawPolygon;
