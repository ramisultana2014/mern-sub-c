import { useEffect, useState } from "react";
import { Marker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
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
