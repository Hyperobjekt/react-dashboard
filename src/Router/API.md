## Functions

<dl>
<dt><a href="#useDebouncedEffect">useDebouncedEffect()</a></dt>
<dd><p>Helper hook to debounce an effect.</p>
</dd>
<dt><a href="#QueryParamRouter">QueryParamRouter()</a></dt>
<dd><p>This component pulls state from the various stores in the app and
updates the URL query params on changes.</p>
<blockquote>
<p>This component does not render anything. Due to the amount of
state it watches, it is isolated to prevent re-renders in other components
for performance.</p>
</blockquote>
</dd>
<dt><a href="#useRouteStore">useRouteStore(selectState, comparator)</a> ⇒ <code>*</code></dt>
<dd><p>Zustand store for Router module. Stores the following state for global access:</p>
<ul>
<li><code>varMap</code>: maps state keys to query param names (eg. <code>{choroplethMetric: &quot;c&quot;}</code> maps the <code>choroplethMetric</code> state key to the <code>c</code> query param)</li>
<li><code>setVarMap</code>: setter to change the state to query param naming.</li>
<li><code>queryParams</code>: the current query params for the URL.</li>
<li><code>setQueryParams</code>: setter to update the query params for the URL.</li>
</ul>
<p>Select individual items from the store with:</p>
<pre><code class="language-js">const queryParams = useRouteStore((state) =&gt; state.queryParams);
</code></pre>
<p>Or select multiple with:</p>
<pre><code class="language-js">import shallow from &quot;zustand/shallow&quot;;
const [queryParams, setQueryParams] = useRouteStore((state) =&gt; [state.queryParams, state.setQueryParams], shallow);
</code></pre>
</dd>
<dt><a href="#useCurrentRouteParams">useCurrentRouteParams()</a> ⇒ <code>object</code></dt>
<dd><p>Pulls a state object based on the current query parameters.</p>
</dd>
<dt><a href="#getCurrentUrlQueryParams">getCurrentUrlQueryParams()</a> ⇒ <code>object</code></dt>
<dd><p>Returns the query params for the current URL.</p>
</dd>
<dt><a href="#setUrlQueryParams">setUrlQueryParams(values)</a> ⇒ <code>void</code></dt>
<dd><p>Sets the query params with the provided values.</p>
</dd>
<dt><a href="#mapStateToQueryParams">mapStateToQueryParams(state, varMap)</a> ⇒ <code>object</code></dt>
<dd><p>Takes a state object and maps it to a query params object</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#RouteState">RouteState</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="useDebouncedEffect"></a>

## useDebouncedEffect()
Helper hook to debounce an effect.

**Kind**: global function  
<a name="QueryParamRouter"></a>

## QueryParamRouter()
This component pulls state from the various stores in the app and
updates the URL query params on changes.

> This component does not render anything. Due to the amount of
state it watches, it is isolated to prevent re-renders in other components
for performance.

**Kind**: global function  
**Component**:   
<a name="useRouteStore"></a>

## useRouteStore(selectState, comparator) ⇒ <code>\*</code>
Zustand store for Router module. Stores the following state for global access:

- `varMap`: maps state keys to query param names (eg. `{choroplethMetric: "c"}` maps the `choroplethMetric` state key to the `c` query param)
- `setVarMap`: setter to change the state to query param naming.
- `queryParams`: the current query params for the URL.
- `setQueryParams`: setter to update the query params for the URL.

Select individual items from the store with:

```js
const queryParams = useRouteStore((state) => state.queryParams);
```

Or select multiple with:

```js
import shallow from "zustand/shallow";
const [queryParams, setQueryParams] = useRouteStore((state) => [state.queryParams, state.setQueryParams], shallow);
```

**Kind**: global function  
**Returns**: <code>\*</code> - the selected values from the store  

| Param | Type | Description |
| --- | --- | --- |
| selectState | <code>function</code> | a function that accepts the full state in the store and returns the desired values. |
| comparator | <code>function</code> | a comparator function that compares the last state selection to the current one.  Be sure to set this if selecting multiple items from the state. |

<a name="useCurrentRouteParams"></a>

## useCurrentRouteParams() ⇒ <code>object</code>
Pulls a state object based on the current query parameters.

**Kind**: global function  
<a name="getCurrentUrlQueryParams"></a>

## getCurrentUrlQueryParams() ⇒ <code>object</code>
Returns the query params for the current URL.

**Kind**: global function  
**Returns**: <code>object</code> - an object of query params  
<a name="setUrlQueryParams"></a>

## setUrlQueryParams(values) ⇒ <code>void</code>
Sets the query params with the provided values.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>object</code> | an object of query params |

<a name="mapStateToQueryParams"></a>

## mapStateToQueryParams(state, varMap) ⇒ <code>object</code>
Takes a state object and maps it to a query params object

**Kind**: global function  
**Returns**: <code>object</code> - query params to set for the route  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>RouteState</code>](#RouteState) | current state for the dashboard |
| varMap | <code>object</code> | a mapping from state names to query param names. |

<a name="RouteState"></a>

## RouteState : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| bubbleMetric | <code>string</code> | bubble metric identifier |
| choroplethMetric | <code>string</code> | choropleth metric identifier |
| region | <code>string</code> | region identifier |
| subgroup | <code>string</code> | subgroup identifier |
| year | <code>string</code> | year |
| latitude | <code>number</code> | latitude |
| longitude | <code>number</code> | longitude |
| zoom | <code>number</code> | zoom level |
| selected | <code>Array.&lt;Object&gt;</code> | array of selected location features |

