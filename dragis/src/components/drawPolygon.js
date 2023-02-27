import { Polyline, GeoJSON } from "react-leaflet";
import myData from "../data/lineTest.json";

function DrawPolygon() {
  const pos2 = [
    [63.4294, 10.3939],
    [63.4293, 10.3964],
    [63.4285, 10.3978],
  ];
  const limeOptions = { color: "lime", weight: 3, fillOpacity: 0.1 };
  console.log(myData);
  console.log(pos2);
  // return <Polyline pathOptions={limeOptions} positions={pos2} />;
  return <GeoJSON style={limeOptions} data={myData.features} />;
}

export default DrawPolygon;
