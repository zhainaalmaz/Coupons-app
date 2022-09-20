import { load } from "@2gis/mapgl";
import React, {useMemo, useEffect} from "react"

const MapWrapper = React.memo(
  () => {
    return (
      <div id="map-container" style={{ width: "100%", height: "100%" }}></div>
    );
  },
  () => true
);

export const Map = () => {
  useEffect(() => {
    let map;
    load().then((mapglAPI) => {
      map = new mapglAPI.Map("map-container", {
        center: [55.31878, 25.23584],
        zoom: 13,
        key: "a4fb5205-d166-4ab4-89a5-a0e737aeb099",
      });
    });

    return () => map && map.destroy();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapWrapper />
    </div>
  );
};
