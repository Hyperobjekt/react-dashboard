# Locations

## Hooks

### `useAddLocation(): function`

Returns a function that adds a location to the store. When adding a location, the function will retrieve any associated data sources for the location.

```ts
function(MapFeature: object || GEOID: string) {}
```

### `useRemoveLocation(): function`

Returns a function that removes a location from the store. Location ID should be a GEOID for the location.

```ts
function(MapFeature: object || GEOID: string) {}
```

### `useToggleLocation(): function`

Returns a function that adds a location to the store if it doesn't exist, or removes it if it does. When adding a location, the function will retrieve any associated data sources for the location.

```ts
function(MapFeature: object || GEOID: string) {}
```

### `useLocationData([GEOID: string]): Array<object> || object`

Returns an array of all added locations, with their associated data and color. If GEOID string is provided, the hook will return an object with data for the corresponding GEOID.

### `useLocationFeature([GEOID: string]): Array<MapFeature> || MapFeature`

Returns an array of map features for all selected locations. If a GEOID string is provided, the hook will return a GeoJSON feature for the corresponding GEOID.
