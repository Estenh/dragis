import bufferOp from "jsts/org/locationtech/jts/operation/buffer/BufferOp.js";
import GeoJSONReader from "jsts/org/locationtech/jts/io/GeoJSONReader.js";
import myData from "../data/lineTest.json";

let geo = new GeoJSONReader();
let buffer = new bufferOp(geo);
let dt = geo.read(myData);
buffer.getResultGeometry(2);
console.log(dt);
//console.log(bufpol);

function bufferTestJST() {
  return null;
}
export default bufferTestJST;
