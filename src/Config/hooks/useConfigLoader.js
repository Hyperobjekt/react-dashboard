import { useConfigStore, useLoadConfig } from "..";
import useDashboardStore from "../../store";
import { useCurrentRouteParams } from "../../Router";
import { useMapStore } from "@hyperobjekt/mapgl";
import { useDidMount } from "rooks";
import { getDefaultsFromConfig } from "../../utils";

/**
 * Loads configuration from the provided config and any route params. Calls
 * the `onLoad` callback once ready.
 * @returns {void}
 */
function useConfigLoader({ config, enableRouter, onLoad }) {
  // use the async config loader function
  const loadConfig = useLoadConfig();
  // generic setter for the dashboard store
  const setValues = useDashboardStore((state) => state.set);
  // pulls the query params from the url
  const routeValues = useCurrentRouteParams();
  // setter for map viewport (zoom, lat, lon)
  const setViewState = useMapStore((state) => state.setViewState);
  // config ready state
  const isReady = useConfigStore((state) => state.ready);
  const setReady = useConfigStore((state) => state.setReady);

  // load configuration and set default values on mount
  useDidMount(() => {
    // prevent re-loading config
    if (isReady) return;
    loadConfig(config).then((loadedConfig) => {
      const defaultValues = getDefaultsFromConfig(loadedConfig);
      // merge defaults and route options
      const loadedValues = enableRouter
        ? { ...defaultValues, ...routeValues }
        : defaultValues;
      // extract non-dashboard state from the values
      const { zoom, latitude, longitude, locations, ...dashboardState } =
        loadedValues;
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
      // 💅 config has loaded, defaults set, the dashboard is ready
      setReady(true);
      // trigger callback if set
      onLoad && onLoad(loadedValues);
    });
  });
}

export default useConfigLoader;
