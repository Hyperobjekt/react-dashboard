# @hyperobjekt/react-dashboard

This package provides base configuration for a dashboard and hooks for:

- Configuration loading and retrieval based on current context
- Formatters for different data types
- Hooks to provide data to components (for Maps, Controls, Location Data, etc.)
- i18n
- State management (via zustand)
- Query Param Routing

## Running the demo

Clone this repo, then run `yarn install` and `yarn dev` to run the demo.

Code for the demo is in the `/demo` directory.

## Getting Started

This library contains no UI elements. You provide a configuration to the dashboard, and then you utilize the available hooks to provide data to your components.

```js
// see the configuration documentation below for more details
const DASHBOARD_CONFIG = {
  "app": { ... },
  "metrics": [ ... ],
  "regions": [ ... ],
  "subgroups": [ ... ],
  "scales": [ ... ],
  "mapSources": [ ... ],
  "mapLayers": [ ... ],
  "lang": { ... }
}

const MyDashboardApp = () => {
  return (
    <Dashboard config={DASHBOARD_CONFIG}>
      {/* Your UI components here */}
    </Dashboard>
  )
}
```

You can then use the dashboard hooks in your app as needed.

## Context Hooks

- `useBubbleContext()` => `{metric_id, region_id, subgroup_id, year }`
  - returns current context for the bubble metric
- `useBubbleVarName()` => string
  - returns the current bubble metric variable name (based on accessor config and current context)
- `useChoroplethContext()` => `{ metric_id, region_id, subgroup_id, year }`
  - returns the current context for the choropleth metric
- `useChoroplethVarName()` => string
  - returns the current choropleth metric variable name (based on accessor config and current context)
- `useCurrentContext()` => `{ bubbleMetric, choroplethMetric, region_id, subgroup_id, year }`
  - returns the current context of the dashboard state, including both bubble and choropleth metrics

## Metric Hooks

- `useMetricConfig(id:string || [id:string])`
  - returns metric configuration, with populated names, hints, units, and formatters. Returns all if no argument is provided, a single metric if an ID is passed, or a subset if an array of IDs is passed.
- `useBubbleOptions()`
  - returns an array of bubble metric options with names, hints, units, and formatters.
- `useChoroplethOptions()`
  - returns an array of choropleth metric options with names, hints, units, and formatters.

## Region Hooks

- `useRegionOptions()`
  - returns an array of region options with names

## Subgroup Hooks

- `useSubgroupOptions()`
  - returns an array of subgroup options with names

## Year Hooks

- `useYearOptions()`
  - returns an array of year options

## Scale Hooks

- `useScaleConfig(context)`
  - returns a scale in the configuration that matches the provided context
- `useChoroplethScale({context?, config?})`
  - returns scale functions and props for [Scale components](https://github.com/Hyperobjekt/scales) for a choropleth metric. Optional `context` overrides and scale `config` overrides.
- `useBubbleScale({context?, config?})`
  - returns scale functions and props for [Scale components](https://github.com/Hyperobjekt/scales) for a bubble metric. Optional `context` overrides and scale `config` overrides.

## Map Hooks

- `useMapSources()`
  - returns map sources for the current context
- `useChoroplethMapLayers()`
  - returns choropleth map layers for the current context
- `useBubbleMapLayers()`
  - returns bubble map layers for the current context

## Location Hooks

- `useAddLocation()`
  - returns a function that can be used to add a location feature to the selected locations store
- `useRemoveLocation()`
  - returns a function that can be used to remove a location feature from the selected locations store
- `useLocationFeature(string || number)`
  - returns all selected location features if no argument is provided, or a single location if an ID is passed, or the `n` most recent locations if a number is passed
- `useLocationData(string || number)`
  - returns all selected locations data (`feature.properties`) if no argument is provided, or a single location if an ID is passed, or the `n` most recent locations if a number is passed

## State Store Hooks

All of the above hooks use these state stores as their source of truth. These hooks are all [zustand stores](https://github.com/pmndrs/zustand) that are used by the dashboard. See the [zustand recipes](https://github.com/pmndrs/zustand#recipes) for how to select the state slices you need.

- `useDashboardStore()`
  - contains dashboard state and setters for `bubbleMetric`, `choroplethMetric`, `region`, `year`, `subgroup`.
- `useLocationStore()`
  - contains location state for `selected` locations
- `useConfigStore()`
  - contains configuration state and setters for `app`, `metrics`, `regions`, `subgroups`, `scales`, `mapSources`, `mapLayers`, and `ready` state.
- `useRouteStore()`
  - contains router state and setters for `varMap` and `queryParams`
- `useMapStore()`:
  - contains all relate map state and setters
  - **this store should be imported from [`@hyperobjekt/mapgl`](https://github.com/Hyperobjekt/mapgl) and is not part of `@hyperobjekt/react-dashboard`**. See [documentation in the mapgl repo](https://github.com/Hyperobjekt/mapgl#usemapstore) for this store.

## Data fetching hooks

The base dashboard component is a `QueryProvider` from [react-query](https://react-query.tanstack.com/overview). You can use `useQuery` and any other [react-query](https://react-query.tanstack.com/overview) hooks within the `<Dashboard />` scope.

## Additional Docs

More documentation can be found in their specific module folder:

- **Config**: [README](./src/Config/README.md)
- **i18n**: [README](./src/i18n/README.md) | [API](./src/i18n/API.md)
- **Router**: [README](./src/Router/README.md) | [API](./src/Router/API.md)
- **Formatters**: [README](./src/Formatters/README.md) | [API](./src/Formatters/API.md)
- **Locations**: [README](./src/Locations/README.md) | [API](./src/Locations/API.md)

The following libraries are utilized or intended to be used with this project:

- [react-query](https://react-query.tanstack.com/overview)
- [zustand](https://github.com/pmndrs/zustand)
- [@hyperobjekt/mapgl](https://github.com/Hyperobjekt/mapgl)
  - [react-map-gl](https://visgl.github.io/react-map-gl/docs/get-started/get-started) (foundation for @hyperobjekt/mapgl)
- [@hyperobjekt/scales](https://github.com/Hyperobjekt/scales)
