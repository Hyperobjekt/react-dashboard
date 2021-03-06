## Functions

<dl>
<dt><a href="#useDataSource">useDataSource(url, parser)</a> ⇒ <code>object</code></dt>
<dd><p>Wrapper for <a href="https://react-query.tanstack.com/reference/useQuery">useQuery</a>. Returns react-query result for the provided data source.</p>
</dd>
<dt><a href="#fetchDataSource">fetchDataSource(url, parser)</a> ⇒ <code>Promise</code></dt>
<dd><p>Fetches a CSV or JSON file, parses it, and returns the data.</p>
</dd>
<dt><a href="#parseId">parseId(id)</a> ⇒ <code>string</code></dt>
<dd><p>Pulls out wildcard definitions in the ID (e.g. states_*_00 becomes states_00)</p>
</dd>
<dt><a href="#parseValue">parseValue(value, options)</a> ⇒ <code>*</code></dt>
<dd><p>Parses a value based on the provided type.  If no type is provided,
then d3 <code>autoType</code> is used to determine the type.</p>
</dd>
<dt><a href="#parseValues">parseValues(stringValue, options)</a> ⇒ <code>*</code></dt>
<dd><p>Parses a string value based on the provided type and splits
multi-value strings separated by &quot;;&quot; (or provided separator option.)</p>
</dd>
<dt><a href="#parseJsonData">parseJsonData(data, parser)</a> ⇒ <code>Array</code> | <code>Object</code></dt>
<dd><p>Passes data entries through the parser function, or if the data is
not an array it passes the whole data through the parser function.</p>
</dd>
<dt><a href="#parseCsvString">parseCsvString(data, parser)</a> ⇒ <code>Array.&lt;object&gt;</code></dt>
<dd><p>Alias for csvParse with autoType. Parses a csv string into an
array of objects based on the parser (or autotype) function.</p>
</dd>
</dl>

<a name="useDataSource"></a>

## useDataSource(url, parser) ⇒ <code>object</code>
Wrapper for [useQuery](https://react-query.tanstack.com/reference/useQuery). Returns react-query result for the provided data source.

**Kind**: global function  
**Returns**: <code>object</code> - `useQuery` result (see [react-query docs](https://react-query.tanstack.com/reference/useQuery))  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | a URL to fetch data from (either CSV or JSON) |
| parser | <code>function</code> | (optional) a function that parses a CSV row or JSON data (default: [d3.autoType](https://github.com/d3/d3-dsv#autoType)) |

<a name="fetchDataSource"></a>

## fetchDataSource(url, parser) ⇒ <code>Promise</code>
Fetches a CSV or JSON file, parses it, and returns the data.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | a URL to fetch data from (either CSV or JSON) |
| parser | <code>function</code> | (optional) a function that parses a CSV row or JSON data (default: [d3.autoType]( |

<a name="parseId"></a>

## parseId(id) ⇒ <code>string</code>
Pulls out wildcard definitions in the ID (e.g. states_*_00 becomes states_00)

**Kind**: global function  
**Returns**: <code>string</code> - identifier with wildcards removed  

| Param | Type |
| --- | --- |
| id | <code>\*</code> | 

<a name="parseValue"></a>

## parseValue(value, options) ⇒ <code>\*</code>
Parses a value based on the provided type.  If no type is provided,
then d3 `autoType` is used to determine the type.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> |  |
| options | <code>object</code> |  |
| options.type | <code>string</code> | "date"|"float"|"integer"|"boolean" |

<a name="parseValues"></a>

## parseValues(stringValue, options) ⇒ <code>\*</code>
Parses a string value based on the provided type and splits
multi-value strings separated by ";" (or provided separator option.)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stringValue | <code>\*</code> |  |
| options | <code>object</code> | {type, separator} |
| options.type | <code>string</code> | "date"|"float"|"integer"|"boolean" |
| options.separator | <code>string</code> | separator for array values (default: ";") |

<a name="parseJsonData"></a>

## parseJsonData(data, parser) ⇒ <code>Array</code> \| <code>Object</code>
Passes data entries through the parser function, or if the data is
not an array it passes the whole data through the parser function.

**Kind**: global function  

| Param | Type |
| --- | --- |
| data | <code>\*</code> | 
| parser | <code>function</code> | 

<a name="parseCsvString"></a>

## parseCsvString(data, parser) ⇒ <code>Array.&lt;object&gt;</code>
Alias for csvParse with autoType. Parses a csv string into an
array of objects based on the parser (or autotype) function.

**Kind**: global function  

| Param | Type |
| --- | --- |
| data | <code>string</code> | 
| parser | <code>function</code> | 

