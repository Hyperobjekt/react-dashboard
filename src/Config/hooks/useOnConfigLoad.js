import { useCallback } from "react";
import useDashboardStore from "../../store";
import { useMapStore } from "@hyperobjekt/mapgl";

/**
 * Returns a callback for setting default values based on the configuration.
 * @param {function} [onLoad] async function to do any additional loading
 * @returns {function} a function that sets default dashboard and map state
 */
function useOnConfigLoad(onLoad) {
  // generic setter for the dashboard store
  const setValues = useDashboardStore((state) => state.set);
  // setter for map viewport (zoom, lat, lon)
  const setViewState = useMapStore((state) => state.setViewState);

  return useCallback(
    ({ config, defaultValues }) => {
      // extract non-dashboard state from the values
      const { zoom, latitude, longitude, locations, ...dashboardState } =
        defaultValues;
      // set the selections for the dashboard
      setValues(dashboardState);
      // set the viewport state for the map if values exist
      zoom &&
        latitude &&
        longitude &&
        setViewState({
          zoom: Number(zoom),
          latitude: Number(latitude),
          longitude: Number(longitude),
        });
      // call the additional loader if provided, otherwise resolve
      return onLoad ? onLoad({ config, defaultValues }) : Promise.resolve();
    },
    [setValues, setViewState, onLoad]
  );
}

export default useOnConfigLoad;
