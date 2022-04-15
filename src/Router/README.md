# Query Param Routing

This module handles mapping current state selections to query params.

## Usage

You can add the `<QueryParamRouter />` component as a child of the `<Dashboard />` and it will automatically add query param routing for:

- bubble metric
- choropleth metric
- region
- year
- subgroup
- map viewport (lat, lon, zoom)

```js
<Dashboard config={dashboardConfig}>
  <QueryParamRouter />
</Dashboard>
```

Creates a query param route like:

```
https://.../?c=p&b=tr&s=all&r=counties&y=2018&z=5.61&lat=35.20&lon=-94.90
```

The route params use shortened names for each of the values to keep the URL short. The mapping is as follows:

- `b`: bubbleMetric
- `c`: choroplethMetric
- `r`: region
- `y`: year
- `s`: subgroup
- `lat`: latitude
- `lon`: longitude
- `z`: zoom

### Changing route parameter names

If the default mapping of shortened param names does not suit your needs, you can customize the names by passing a `varMap` prop with overrides to the `<QueryParamRouter />`.

**Example:** use `bubble` as the bubble metric route param, and `zoom` as the zoom route param.

```js
const varMap = {
  bubbleMetric: "bubble",
  zoom: "zoom",
};

<Dashboard config={dashboardConfig}>
  <QueryParamRouter varMap={varMap} />
</Dashboard>;
```

Results in a route like:

```
https://.../?c=p&bubble=tr&s=all&r=counties&y=2018&zoom=5.61&lat=35.20&lon=-94.90
```

### Customizing the route parameters

If you want to add or remove parameters from the route, you can provide an `updateParams` function to the `<QueryParamRouter />` component that returns an object with the query params to set.

```js
const updateParams = ({ params }) => {
  return {
    ...params,
    customParam: "paramValue",
  };
};

<Dashboard config={dashboardConfig}>
  <QueryParamRouter updateParams={updateParams} />
</Dashboard>;
```

> Note: You will also need to add an `onLoad` prop to the `<Dashboard />` component to handle loading any new query params from the route. See the next section for more details.

### Loading parameters

The `defaultValues` prop will be passed to an `onLoad` function. It contains all of the default values set in the config along with any route parameters that have been set.

**Example:** add custom `myParam` and load it from the route on app load.

```js
const handleLoad({config, defaultValues}) {
  const { myParam } = defaultValues;
  // do something with myParam (e.g. load into app state)
}
const updateParams = ({params}) => {
  return {
    ...params,
    myParam: "paramValue"
  };
};
return (
  <Dashboard config={dashboardConfig} onLoad={handleLoad}>
    <QueryParamRouter updateParams={updateParams} />
  </Dashboard>
)
```
