import { useEffect } from "react";
import PropTypes from "prop-types";
import { useMapStore } from "@hyperobjekt/mapgl";
import shallow from "zustand/shallow";
import useRouteStore from "./store";
import useDashboardStore from "../store";
import { useLocationStore } from "../Locations";
import { mapStateToQueryParams, setUrlQueryParams } from "./utils";

/**
 * Helper hook to debounce an effect.
 */
const useDebouncedEffect = (func, deps, time) => {
  useEffect(() => {
    let db = setTimeout(() => {
      func();
    }, time);
    return () => {
      clearTimeout(db);
    };
  }, deps);
};

/**
 * This component pulls state from the various stores in the app and
 * updates the URL query params on changes.
 *
 * > This component does not render anything. Due to the amount of
 * state it watches, it is isolated to prevent re-renders in other components
 * for performance.
 *
 * @component
 */
const QueryParamRouter = ({ varMap: varMapOverride, updateParams }) => {
  // pull the variable map and setter from the router store
  const [varMap, setVarMap] = useRouteStore(
    (state) => [state.varMap, state.setVarMap],
    shallow
  );
  // pull the current dashboard selections from the dashboard store
  const dashboardState = useDashboardStore(
    ({ choroplethMetric, bubbleMetric, subgroup, region, year }) => ({
      choroplethMetric,
      bubbleMetric,
      subgroup,
      region,
      year,
    }),
    shallow
  );
  // pulls the view state from the map store ({zoom, latitude, longitude})
  const viewState = useMapStore((state) => state.viewState);
  // pull the current locations from the map store
  const selected = useLocationStore((state) => state.selected);
  // sets a query params object in the route store
  const setQueryParams = useRouteStore((state) => state.setQueryParams);

  // if a varMap override is provided, update the store
  useEffect(() => {
    varMapOverride &&
      typeof varMapOverride === "object" &&
      setVarMap(varMapOverride);
  }, [varMapOverride, setVarMap]);

  // when state changes, update the query params store (debounced)
  useDebouncedEffect(
    () => {
      const { zoom, latitude, longitude } = viewState;
      // create object with all route param values
      const state = {
        ...dashboardState,
        zoom: zoom?.toFixed(2),
        latitude: latitude?.toFixed(2),
        longitude: longitude?.toFixed(2),
        locations: selected,
      };
      const mappedParams = mapStateToQueryParams({ state, varMap });
      const newParams =
        typeof updateParams === "function"
          ? updateParams({ state, varMap, params: mappedParams })
          : mappedParams;
      setQueryParams(newParams); // set in the route store
      setUrlQueryParams(newParams); // set in the url
    },
    [dashboardState, viewState, setQueryParams, varMap, selected, updateParams],
    1000
  );

  // render nothing!
  return null;
};

QueryParamRouter.propTypes = {
  /**
   * an object that maps state values to route param names
   */
  varMap: PropTypes.object,
  /**
   * a function that takes the current dashboard state and returns an object of query params
   */
  updateParams: PropTypes.func,
};

export default QueryParamRouter;
