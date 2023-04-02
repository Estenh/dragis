import bbox from "@turf/bbox";
import bboxPolygon from "@turf/bbox-polygon";
import fylke from "../data/fylke.json";
import { GeoJSON } from "react-leaflet";

let midten = bbox(fylke["administrative_enheter.fylke"]);
//console.log(midten);
let bboks = bboxPolygon(midten);
const limeOptions = { color: "lime", weight: 3, fillOpacity: 0.3 };

function CentroidTestTurf() {
  return <GeoJSON style={limeOptions} data={bboks} />;
}
export default CentroidTestTurf;
