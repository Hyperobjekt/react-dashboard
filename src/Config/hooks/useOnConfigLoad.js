import { useCallback } from "react";
import useDashboardStore from "../../store";
import { useMapStore } from "@hyperobjekt/mapgl";
import { useLangStore } from "../../i18n";

/**
 * Returns a callback for setting default map state and dashboard state based
 * on the default values provided.
 * @returns {function} a function that sets default dashboard and map state
 */
function useOnConfigLoad() {
  // generic setter for the dashboard store
  const setValues = useDashboardStore((state) => state.set);
  // setter for map viewport (zoom, lat, lon)
  const setViewState = useMapStore((state) => state.setViewState);
  // setter for language
  const setLanguage = useLangStore((state) => state.setLanguage);

  return useCallback(
    ({ config, defaultValues }) => {
      // extract non-dashboard state from the values
      const { zoom, latitude, longitude, locations, lang, ...dashboardState } =
        defaultValues;
      // create an object with existing dashboard state values
      const dashboardValues = [
        "choroplethMetric",
        "bubbleMetric",
        "year",
        "region",
        "subgroup",
      ].reduce((acc, key) => {
        if (dashboardState[key]) acc[key] = dashboardState[key];
        return acc;
      }, {});
      // set the selections for the dashboard
      setValues(dashboardValues);
      // set the viewport state for the map if values exist
      zoom &&
        latitude &&
        longitude &&
        setViewState({
          zoom: Number(zoom),
          latitude: Number(latitude),
          longitude: Number(longitude),
        });
      lang && setLanguage(lang);
      return Promise.resolve({ config, defaultValues });
    },
    [setValues, setViewState]
  );
}

export default useOnConfigLoad;
