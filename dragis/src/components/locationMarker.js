import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        Latlong is: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
      </Popup>
    </Marker>
  );
}
export default LocationMarker;
