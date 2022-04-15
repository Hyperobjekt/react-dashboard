# Changelog

## [1.2.0 / 1.2.1] - 2022-04-15

- refactor: replace `mapStateToParams` with `updateParams` prop on `<QueryParamRouter>`
- feat: allow custom route params to be passed to `onLoad`.
- add docs

## [1.1.0] - 2022-04-05

- feat: allow passing a `mapStateToParams` function prop to `<QueryParamRouter />` to customize route params.
- feat: allow passing an asynchronous `onLoad` callback to handle any additional loading before setting ready status.
- fix: load new config when providing new config value

### Routing changes

- `enableRouter` prop is no longer used. use the `<QueryParamRouter />` component as a child of `<Dashboard />` in order to enable routing.

## [1.0.0] - 2022-04-04

- feat: `useChoroplethMapLayers` and `useBubbleMapLayers` now accept an optional object parameter containing:
  - `context`: any context overrides
  - `scale`: scale config overrides
  - `createLayer`: a function that accepts `varName`, `scale`, and `config` parameters and returns layers.
- feat: allow matching context fields based on a regex value (e.g. `/201[0-9]{1}/` to match 2010-2019)
  - regex values must start and end with the `/` character. Regex flags are not supported.
- refactor: split `mapSources` config from `mapLayers` config

### Breaking Changes

1. configuration for map sources has been removed from `mapLayers` and placed in it's own root level `mapSources` key. the configuration object should mirror the keys used for [mapboxgl sources](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/).

**Previous usage:**

```json
{
  ...
  "mapLayers": [
    {
       "id": "states_choropleth",
       "region_id": "states",
       "metric_id": "*",
       "subgroup_id": "*",
       "year": "*",
       "type": "choropleth",
       "source_id": "states_choropleth",
       "source_url": "https://mytilesource.com/{z}/{x}/{y}.pbf",
       "source_type": "vector_tiles",
       "source_layer": "states",
       "min_zoom": 1,
       "max_zoom": 8
    },
    ...,
  ]
}
```

**New Usage:**

```json
{
  "mapSources": [
    {
      "id": "states_source",
      "tiles": ["https://mytilesource.com/{z}/{x}/{y}.pbf"],
      "type": "vector",
    }
    ...,
  ],
  "mapLayers": [
    {
       "id": "states_choropleth",
       "region_id": "states",
       "metric_id": "*",
       "subgroup_id": "*",
       "year": "*",
       "type": "choropleth",
       "source_id": "states_source",
       "source_layer": "states",
       "min_zoom": 1,
       "max_zoom": 8
    },
    ...,
  ]
}
```

2. `useChoroplethScale` and `useBubbleScale` signature has changed. now accepts a single (optional) parameter:

- `context`: context overrides for the scale
- `config`: scale configuration overrides

**Previous usage:**

```js
useBubbleScale(contextOverrides, scaleConfigOverrides);
```

**New Usage:**

```js
useBubbleScale({
  context: contextOverrides,
  config: scaleConfigOverrides,
});
```

3. updated language prefix for hints from `DESC_` to `HINT_`. rename the keys in your language file to `HINT_` to restore hinting functionality.

## [0.5.2] - 2022-03-31

- fix: `useRemoveLocation` should accept ID string instead of object (but still allows object)

## [0.5.1] - 2022-03-30

- fix: remove `@hyperobjekt/mapgl` and `@hyperobjekt/scales` from build output

## [0.5.0] - 2022-03-30

- feat: allow callback function to be provided to `<Dashboard />` via `onLoad` prop
- feat: allow optional routing with `enableRouter` prop on `<Dashboard />`
- fix: do not throw errors if no `extent_data` is provided for scales

## [0.4.4] - 2022-03-29

- fix: use proper value ranges for choropleth layers when start is 0

## [0.4.3] - 2022-03-29

- fix: drop hovered + selected location hooks (not working as intended)

## [0.4.2] - 2022-03-28

- chore: update function signatures and module docs

## [0.4.1] - 2022-03-28

- chore: add API docs for location module
- fix: add alias hooks for hovered and selected location

## [0.4.0] - 2022-03-24

- feat: `useLocationData` and `useLocationFeature` now allow a number as an argument to limit the number of locations

## [0.3.1] - 2022-03-22

- fix: do not return lang key for missing entries

## [0.3.0] - 2022-03-22

- feat: add hooks for locations

## [0.2.1] - 2022-03-21

- fix: return proper formatter for large numbers

## [0.2.0] - 2022-03-20

- feat: add hooks for getting bubble and choropleth metric

## [0.1.1] - 2022-03-18

- fix: add bubble and choropleth layer hooks to exports

## [0.1.0] - 2022-03-15

- initial release
