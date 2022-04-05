import { useConfigStore, useLoadConfig } from "..";
import { useCurrentRouteParams } from "../../Router";
import { getDefaultsFromConfig } from "../../utils";
import { useEffect, useRef } from "react";

// a dummy async load function that is used if `onLoad` is not provided
const dummyOnLoad = () => {
  return Promise.resolve();
};

/**
 * Loads configuration from the provided config and any route params. Calls
 * the `onLoad` callback once ready.
 * @param {Object} props - useConfigLoader props
 * @param {string} props.config - the dashboard configuration object
 * @param {string} props.onLoad - an async function that accepts an object containing `config` and `defaultValues`.  must be an async function (return a promise)
 * @returns {void}
 */
function useConfigLoader({ config, onLoad = dummyOnLoad }) {
  // use the async config loader function
  const loadConfig = useLoadConfig();
  // pulls the query params from the url
  const routeValues = useCurrentRouteParams();
  // config ready state
  const setReady = useConfigStore((state) => state.setReady);
  const isLoading = useRef(false);

  // load configuration and set default values on mount
  useEffect(() => {
    // prevent re-loading config
    if (isLoading.current) return;
    isLoading.current = true;
    loadConfig(config).then((loadedConfig) => {
      const defaultValues = getDefaultsFromConfig(loadedConfig);
      // merge defaults and route options
      const loadedValues = { ...defaultValues, ...routeValues };
      // 💅 config has loaded, defaults set, the dashboard is ready
      onLoad({ config: loadedConfig, defaultValues: loadedValues })
        .then(() => {
          setReady(true);
          isLoading.current = false;
        })
        .catch((err) => {
          console.error(err);
          throw new Error("Error running onLoad callback");
        });
    });
  }, [config, onLoad]);
}

export default useConfigLoader;
