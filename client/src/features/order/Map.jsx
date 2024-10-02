import { useEffect, useState } from "react";
import { Marker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import L from leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import styles from "./Map.module.css";
// Create a default icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
function Map({ delivery }) {
  const [mapPosition, setMapPosition] = useState([25.1124, 55.139]);

  useEffect(
    function () {
      if (delivery) setMapPosition([delivery.latitude, delivery.longitude]);
    },
    [delivery]
  );

  return (
    <div className={styles.div}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        <Marker position={mapPosition}>
          <Popup>
            <span>{delivery ? "Delivery point" : "sub-c location"}</span>
          </Popup>
        </Marker>

        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
