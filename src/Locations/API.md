## Functions

<dl>
<dt><a href="#useLocationStore">useLocationStore(stateSelector)</a> ⇒ <code>*</code></dt>
<dd><p>A <a href="https://github.com/pmndrs/zustand/blob/main/readme.md">zustand</a> store that contains active selections for the dashboard.</p>
<p>It is recommended that you use the provided hooks instead of accessing the store directly.  However, the store can be accessed directly if desired.  Be sure to follow the <a href="https://github.com/pmndrs/zustand/blob/main/readme.md#selecting-multiple-state-slices">zustand conventions</a> for accessing store values.</p>
<p>The store contains the following keys:</p>
<ul>
<li><code>selected</code>: an array of selected locations</li>
<li><code>addSelected</code>: a function that adds a location to the selected locations</li>
<li><code>removeSelected</code>: a function that removes a location from the selected locations</li>
<li><code>isSelected</code>: a function that returns true if the provided feature is a selected location.</li>
</ul>
<p><strong>Example:</strong></p>
<pre><code class="language-js">// returns the selected locations from the store
const selected = useLocationStore((state) =&gt; state.selected);
</code></pre>
</dd>
<dt><a href="#getRegionFromGeoid">getRegionFromGeoid(geoid)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the region type based on the GEOID</p>
</dd>
<dt><a href="#getLocationContextFromGeoid">getLocationContextFromGeoid(geoid)</a> ⇒ <code>Object</code></dt>
<dd><p>Returns the parent identifiers for a given geoid</p>
</dd>
<dt><a href="#getStateFromGeoid">getStateFromGeoid(geoid)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the state portion of a geoid.</p>
</dd>
<dt><a href="#getCountyFromGeoid">getCountyFromGeoid(geoid)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the county portion for a geoid.</p>
</dd>
<dt><a href="#getTractFromGeoid">getTractFromGeoid(geoid)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the tract portion of a geoid</p>
</dd>
<dt><a href="#getCityFromGeoid">getCityFromGeoid(geoid)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the city portion for a geoid.</p>
</dd>
<dt><a href="#getBlockGroupFromGeoid">getBlockGroupFromGeoid(geoid)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the block group portion for a geoid.</p>
</dd>
<dt><a href="#areEqual">areEqual(a, b)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns true if features have the same GEOID</p>
</dd>
<dt><a href="#getNextColor">getNextColor(usedColors, availableColors)</a> ⇒ <code>string</code></dt>
<dd><p>Gets the next available color when given an array of used colors and an array of all available colors.</p>
</dd>
<dt><a href="#useAddLocation">useAddLocation()</a> ⇒ <code>function</code></dt>
<dd><p>Returns the &quot;addSelected&quot; function from the store.</p>
</dd>
<dt><a href="#useHoveredLocation">useHoveredLocation()</a> ⇒ <code>MapFeature</code></dt>
<dd><p>Returns the hovered feature on the map. Alias for useMapState(&quot;hoveredFeature&quot;).</p>
</dd>
<dt><a href="#useLocationData">useLocationData(prop)</a> ⇒ <code>Array</code> | <code>Object</code></dt>
<dd><p>Returns the feature properties for a location</p>
</dd>
<dt><a href="#useLocationFeature">useLocationFeature(prop)</a> ⇒ <code>Array.&lt;MapFeature&gt;</code> | <code>MapFeature</code></dt>
<dd><p>Returns an array of selected location features.</p>
</dd>
<dt><a href="#useLocationState">useLocationState(key)</a> ⇒ <code>*</code></dt>
<dd><p>Helper hook for selecting single items from dashboard store</p>
</dd>
<dt><a href="#useRemoveLocation">useRemoveLocation()</a> ⇒ <code>function</code></dt>
<dd><p>Returns the &quot;removeSelected&quot; function from the store.</p>
</dd>
<dt><a href="#useSelectedLocation">useSelectedLocation()</a> ⇒ <code>MapFeature</code></dt>
<dd><p>Returns the selected (clicked) feature on the map.</p>
</dd>
<dt><a href="#useToggleLocation">useToggleLocation()</a> ⇒ <code>function</code></dt>
<dd><p>Returns a callback function that accepts a feature and adds it to the
selected locations list with a color.  If the feature is already selected,
it will be removed from the list.</p>
</dd>
<dt><del><a href="#useToggleSelectedLocation">useToggleSelectedLocation()</a> ⇒ <code>function</code></del></dt>
<dd><p>Returns a callback function that accepts a feature and adds it to the
selected locations list with a color.  If the feature is already selected,
it will be removed from the list. (Deprecated: Use <code>useToggleLocation</code> instead.)</p>
</dd>
</dl>

<a name="useLocationStore"></a>

## useLocationStore(stateSelector) ⇒ <code>\*</code>
A [zustand](https://github.com/pmndrs/zustand/blob/main/readme.md) store that contains active selections for the dashboard.

It is recommended that you use the provided hooks instead of accessing the store directly.  However, the store can be accessed directly if desired.  Be sure to follow the [zustand conventions](https://github.com/pmndrs/zustand/blob/main/readme.md#selecting-multiple-state-slices) for accessing store values.

The store contains the following keys:
- `selected`: an array of selected locations
- `addSelected`: a function that adds a location to the selected locations
- `removeSelected`: a function that removes a location from the selected locations
- `isSelected`: a function that returns true if the provided feature is a selected location.

**Example:**
```js
// returns the selected locations from the store
const selected = useLocationStore((state) => state.selected);
```

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stateSelector | <code>function</code> | selector function that returns the state slice |

<a name="getRegionFromGeoid"></a>

## getRegionFromGeoid(geoid) ⇒ <code>string</code>
Returns the region type based on the GEOID

**Kind**: global function  
**Returns**: <code>string</code> - "states", "counties", "cities", "tracts", "bg"  

| Param | Type |
| --- | --- |
| geoid | <code>string</code> | 

<a name="getLocationContextFromGeoid"></a>

## getLocationContextFromGeoid(geoid) ⇒ <code>Object</code>
Returns the parent identifiers for a given geoid

**Kind**: global function  

| Param | Type |
| --- | --- |
| geoid | <code>string</code> | 

<a name="getStateFromGeoid"></a>

## getStateFromGeoid(geoid) ⇒ <code>string</code>
Returns the state portion of a geoid.

**Kind**: global function  

| Param | Type |
| --- | --- |
| geoid | <code>string</code> | 

<a name="getCountyFromGeoid"></a>

## getCountyFromGeoid(geoid) ⇒ <code>string</code>
Returns the county portion for a geoid.

**Kind**: global function  

| Param | Type |
| --- | --- |
| geoid | <code>string</code> | 

<a name="getTractFromGeoid"></a>

## getTractFromGeoid(geoid) ⇒ <code>string</code>
Returns the tract portion of a geoid

**Kind**: global function  

| Param | Type |
| --- | --- |
| geoid | <code>string</code> | 

<a name="getCityFromGeoid"></a>

## getCityFromGeoid(geoid) ⇒ <code>string</code>
Returns the city portion for a geoid.

**Kind**: global function  

| Param | Type |
| --- | --- |
| geoid | <code>string</code> | 

<a name="getBlockGroupFromGeoid"></a>

## getBlockGroupFromGeoid(geoid) ⇒ <code>string</code>
Returns the block group portion for a geoid.

**Kind**: global function  

| Param | Type |
| --- | --- |
| geoid | <code>string</code> | 

<a name="areEqual"></a>

## areEqual(a, b) ⇒ <code>boolean</code>
Returns true if features have the same GEOID

**Kind**: global function  

| Param | Type |
| --- | --- |
| a | <code>GeoJsonFeature</code> | 
| b | <code>GeoJsonFeature</code> | 

<a name="getNextColor"></a>

## getNextColor(usedColors, availableColors) ⇒ <code>string</code>
Gets the next available color when given an array of used colors and an array of all available colors.

**Kind**: global function  

| Param | Type |
| --- | --- |
| usedColors | <code>Array.&lt;string&gt;</code> | 
| availableColors | <code>Array.&lt;string&gt;</code> | 

<a name="useAddLocation"></a>

## useAddLocation() ⇒ <code>function</code>
Returns the "addSelected" function from the store.

**Kind**: global function  
**Returns**: <code>function</code> - function that adds the provided feature to the selected locations if it doesn't exist  
<a name="useHoveredLocation"></a>

## useHoveredLocation() ⇒ <code>MapFeature</code>
Returns the hovered feature on the map. Alias for useMapState("hoveredFeature").

**Kind**: global function  
<a name="useLocationData"></a>

## useLocationData(prop) ⇒ <code>Array</code> \| <code>Object</code>
Returns the feature properties for a location

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>string</code> \| <code>number</code> | optional string with the id of the location to return, or number to return latest `n` feature data |

<a name="useLocationFeature"></a>

## useLocationFeature(prop) ⇒ <code>Array.&lt;MapFeature&gt;</code> \| <code>MapFeature</code>
Returns an array of selected location features.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>string</code> \| <code>number</code> | optional id to return a specific location, or number to return latest `n` features |

<a name="useLocationState"></a>

## useLocationState(key) ⇒ <code>\*</code>
Helper hook for selecting single items from dashboard store

**Kind**: global function  
**Returns**: <code>\*</code> - the value for the corresponding key in the store  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key that corresponds to the item in the store |

<a name="useRemoveLocation"></a>

## useRemoveLocation() ⇒ <code>function</code>
Returns the "removeSelected" function from the store.

**Kind**: global function  
**Returns**: <code>function</code> - function that removes the provided id to the selected locations if it exists  
<a name="useSelectedLocation"></a>

## useSelectedLocation() ⇒ <code>MapFeature</code>
Returns the selected (clicked) feature on the map.

**Kind**: global function  
<a name="useToggleLocation"></a>

## useToggleLocation() ⇒ <code>function</code>
Returns a callback function that accepts a feature and adds it to the
selected locations list with a color.  If the feature is already selected,
it will be removed from the list.

**Kind**: global function  
<a name="useToggleSelectedLocation"></a>

## ~~useToggleSelectedLocation() ⇒ <code>function</code>~~
***Deprecated***

Returns a callback function that accepts a feature and adds it to the
selected locations list with a color.  If the feature is already selected,
it will be removed from the list. (Deprecated: Use `useToggleLocation` instead.)

**Kind**: global function  
