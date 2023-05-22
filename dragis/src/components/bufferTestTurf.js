import buffer from "@turf/buffer";
import myData from "../data/lineTest.json";
import { GeoJSON } from "react-leaflet";

let buff = buffer(myData, 0.1);

const limeOptions = { color: "lime", weight: 3, fillOpacity: 0.3 };

function BufferTestTurf() {
  return <GeoJSON style={limeOptions} data={buff.features} />;
}
export default BufferTestTurf;
