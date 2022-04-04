# @hyperobjekt/react-dashboard

This package provides base configuration for a dashboard and hooks for:

- Configuration loading and retrieval based on current context
- Formatters for different data types
- Hooks to provide data to components (for Maps, Controls, Location Data, etc.)
- i18n
- State management (via zustand)
- Deep linking (via query params)

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

## Configuration

The configuration object provides the foundation for the dashboard. It can be a local JSON object, or a collection of remote JSON / CSV files.

See the following files for examples:

- [demo/local.config.json](demo/local.config.json)
- [demo/remote.config.json](demo/remote.config.json)

> NOTE: using CSV files for configuration is not yet available.

### App Configuration (`app`)

Configuration under the `app` key contains default settings for the dashboard. You can also add your own properties to the app configurationand access them using `useAppConfig("myCustomProperty")`.

- `default_choropleth_colors`:
  - An array of color strings to use for choropleth layers OR a string value for one of the color schemes from [d3-scale-chromatic](https://observablehq.com/@d3/color-schemes)
- `default_bubble_colors`
  - An array of color strings to use for choropleth layers OR a string value for one of the color schemes from [d3-scale-chromatic](https://observablehq.com/@d3/color-schemes)
- `default_region`:
  - The default region to show data for
- `default_choropleth_metric`:
  - The default metric to use for choropleth layers (or `null` if not using choropleth layers)
- `default_bubble_metric`:
  - The default metric to use for bubble layers (or `null` if not using bubble layers)
- `default_subgroup`:
  - The default subgroup to show data for (or `null` if subgroups are not used.)
- `default_year`:
  - The default year to show data for (or `null` if years are not used.)
- `default_viewport`:
  - `zoom`: default zoom level for the map
  - `center`: [longitude, latitude] of the center of the map
- `hover_color`:
  - The color to use for the hover state on the map
- `location_colors`:
  - An array of color strings to use for selected locations.
- `years`:
  - the years available for the data set (or empty array if only showing one year)

**Example app configuration:**

```json
{
  "default_choropleth_colors": "YlGnBu",
  "default_bubble_colors": "#f00",
  "default_region": "states",
  "default_choropleth_metric": "ef",
  "default_bubble_metric": null,
  "default_subgroup": null,
  "default_year": null,
  "default_viewport": {
    "center": [-98.5795, 39.8283],
    "zoom": 3.5
  },
  "hover_color": "#f00",
  "location_colors": ["#1b9e77", "#d95f02", "#7570b3"],
  "years": []
}
```

#### Associated Hooks

- `useAppConfig(key: string)` => `any`  
  Returns the value for the given key.

### Metric Configuration (`metrics`)

Metric configuration determines which data options are available to the dashboard. A metric configuration entry contains:

- `id`
  - a unique string identifier for the metric. this should correspond to the column name or property in the data set.
- `format` (optional)
  - a format string to use for the metric. See the Formatters deocumentation for available options. If no format is provided, the values for the metric will display as-is.
  - default: decimal
- `short_format` (optional)
  - a secondary format string for the metric that formats values in a short form for the metric.

You can also include any additional metric-related properties you want to use in the dashboard (e.g. a source, category, etc.)

All metric names, descriptions, and units are defined in the language configuration.

**Example metric configuration:**

```json
[
  {
    "id": "ef",
    "format": "integer",
    "short_format": "integer_short"
  },
  {
    "id": "efr",
    "format": "percent"
  }
]
```

#### Associated Hooks

##### `useMetricConfig([key: string|string[]])` => `Metric|Metric[]`

Provide no arguments to return an array of all available metrics, an array of metric IDs for a subset of metrics, or a single ID string to return a metric.

The returned metric objects include the values in the metric config along with:

- `name`: the name of the metric from the i18n store (under the key `METRIC_{{ID}}`)
- `hint`: a hint for the metrics from the i18n store (under the key `HINT_{{ID}}`)
- `unit`: a unit of measurement from the i18n store (under the key `UNIT_{{ID}}`)
- `formatter`: a formatter function for the metric, based on the `format` property in the metric config
- `shortFormatter`: a formatter function for the metric, based on the `short_format` property in the metric config

### Region Configuration (`regions`)

Region configuration specifies which regions are available to the dashboard (e.g. counties, zip codes, etc.). A region configuration entry contains:

- `id`
  - a unique string identifier for the region.
- `min_zoom`
  - the minimum zoom level to show the region on the map
- `max_zoom`
  - the maximum zoom level to show the region on the map
- `metrics` (optional)
  - an array of metric IDs that are availabe for this region

All region names are specified in the language configuration.

#### Associated Hooks

##### `useRegionConfig([key: string])` => `Region|Region[]`

Provide no arguments to return an array of all available regions, or a single ID string to return a region.

The returned region objects include the values in the region config along with:

- `name`: the name of the region from the i18n store (under the key `REGION_{{ID}}`)

### Subgroup Configuration (`subgroups`)

Subgroups are used to group data by a specific category. For example, you might have a data set where metric data broken down by different groupings (e.g. age, race, gender, etc). Each subgroup configuration entry contains:

- `id`
  - a unique string identifier for the subgroup.

##### `useSubgroupConfig([key: string])` => `Subgroup|Subgroup[]`

Provide no arguments to return an array of all available subgroups, or a single ID string to return a single subgroup.

The returned region objects include the values in the region config along with:

- `name`: the name of the region from the i18n store (under the key `SUBGROUP_{{ID}}`)

### Scales Configuration (`scales`)

Scales configuration determines the colors and ranges to use for choropleth and bubble layers. A scale configuration entry contains:

```json
{
  "id": "default",
  "region_id": "*",
  "metric_id": "*",
  "subgroup_id": "*",
  "year": "*",
  "type": "choropleth",
  "scale": "continuous",
  "extent_data": "/assets/data/{{region_id}}-extents.csv",
  "extent_min_key": "min",
  "extent_max_key": "max"
}
```

#### Associated Hooks

##### `useChoroplethScale()` => `Region|Region[]`

Provide no arguments to return an array of all available regions, or a single ID string to return a region.

The returned region objects include the values in the region config along with:

- `name`: the name of the region from the i18n store (under the key `REGION_{{ID}}`)

### Map Sources Configurations (`mapSources`)

Map sources are used by the map layers.

- `id`
  - identifier for the source
- `region_id`
  - an identifier for the region that this map source is associated with. Use `"*"` to use this layer for all regions.
- `metric_id`
  - an identifier for the metric that this map source is associated with. Use `"*"` to use this layer for all metrics.
- `subgroup_id`
  - an identifier for the subgroup that this map source is associated with. Use `"*"` to use this layer with all subgroups.
- `year`
  - the year that this map layer is associated with. Use `"*"` to use this layer for all years.
- `source_url`
  - url to the data source (either tileset or geojson)
- `source_type`
  - type of source (e.g. `"geojson"` or `"vector_tiles"`). corresponds to mapboxgl source types.

```json
{
  "id": "states_choropleth",
  "region_id": "states",
  "metric_id": "*",
  "subgroup_id": "*",
  "year": "*",
  "source_url": "https://spi-tilesets.s3.us-west-2.amazonaws.com/v0.0.1/states/{z}/{x}/{y}.pbf",
  "source_type": "vector_tiles"
}
```

### Map Layers Configuration (`mapLayers`)

Map layers configuration specifies which layers will be shown on the map. A map layer configuration entry contains:

- `id`
  - identifier for the map layer
- `region_id`
  - an identifier for the region that this map layer is associated with. Use `"*"` to use this layer for all regions.
- `metric_id`
  - an identifier for the metric that this map layer is associated with. Use `"*"` to use this layer for all metrics.
- `subgroup_id`
  - an identifier for the subgroup that this map layer is associated with. Use `"*"` to use this layer with all subgroups.
- `year`
  - the year that this map layer is associated with. Use `"*"` to use this layer for all years.
- `type`
  - type of layer, either `"choropleth"` or `"bubble"`
- `source_id`
  - identifier for the source
- `source_url`
  - url to the data source (either tileset or geojson)
- `source_type`
  - type of source (e.g. `"geojson"` or `"vector_tiles"`). corresponds to mapboxgl source types.
- `source_layer`
  - name of the layer in the source data (vector tiles only)
- `min_zoom` (optional)
  - minimum zoom level to show the layer
- `max_zoom` (optional)
  - maximum zoom level to show the layer

**Example map layer configuration entry**

```json
{
  "id": "states_choropleth",
  "region_id": "states",
  "metric_id": "*",
  "subgroup_id": "*",
  "year": "*",
  "type": "choropleth",
  "source_id": "states_choropleth",
  "source_layer": "states",
  "min_zoom": 1,
  "max_zoom": 8
}
```

### FUTURE RELEASE: Data Sources (`dataSources`)

Data sources configuration entries contain a data source to fetch when certain selections are made in the dashboard. A data source configuration entry contains:

- `id`
  - a unique string identifier for the data source
- `region_id`
  - an identifier for the region that this data source is associated with. Use `"*"` if the data source is not associated with a region.
- `metric_id`
  - an identifier for the metric that this data source is associated with. Use `"*"` if the data source is not associated with a metric.
- `subgroup_id`
  - an identifier for the subgroup that this data source is associated with. Use `"*"` if the data source is not associated with a subgroup.
- `year`
  - an identifier for the year that this data source is associated with. Use `"*"` if the data source is not associated with a year.
- `type`
  - a string with the type of data that this data source contains.
- `url`
  - the URL that will be fetched when the conditions are met. You can use placeholder values in the URL and they will be replaced with the values of the current dashboard selections. (e.g. `{{region_id}}`, `{{metric_id}}`, `{{year}}`, etc.)

Data sources are only fetched when the entry matches the current selections in the dashboard. For example, the following data source entry will be fetched when "cities" are selected as the region in the dashboard:

```json
{
  "id": "cities_data",
  "region_id": "cities",
  "metric_id": "*",
  "subgroup_id": "*",
  "year": "*",
  "type": "extents",
  "url": "/assets/data/cities.csv"
}
```
