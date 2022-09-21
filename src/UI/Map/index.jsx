import { load } from "@2gis/mapgl";
import React, { useEffect, useState } from "react";

const MapWrapper = React.memo(
  () => {
    return (
      <div id="map-container" style={{ width: "100%", height: "100%" }}></div>
    );
  },
  () => true
);

export const Map = ({ dol, shir }) => {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    let map;
    let marker;
    if (!isAdded) {
      if (!map) {
        load().then((mapglAPI) => {
          map = new mapglAPI.Map("map-container", {
            center: [+shir, +dol],
            zoom: 17,
            key: "a4fb5205-d166-4ab4-89a5-a0e737aeb099",
          });

          marker = new mapglAPI.Marker(map, {
            coordinates: [+shir, +dol],
          });
        });
      }
      setIsAdded(true);
    }

    return () => {
      map && map.destroy();
      marker && marker.destroy();
    };
  }, []);

  if (isAdded) {
    <></>;
  }

  return (
    <div style={{ width: "100%", height: "100%", maxHeight: "400px" }}>
      <MapWrapper />
    </div>
  );
};
