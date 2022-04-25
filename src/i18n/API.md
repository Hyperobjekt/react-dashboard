## Functions

<dl>
<dt><a href="#useLangStore">useLangStore(selectState, comparator)</a> ⇒ <code>*</code></dt>
<dd><p>Zustand store for i18n module.</p>
<p>Select individual items from the store with:</p>
<pre><code class="language-js">const language = useLangStore((state) =&gt; state.language);
</code></pre>
<p>Or select multiple with:</p>
<pre><code class="language-js">import shallow from &quot;zustand/shallow&quot;;
const [language, setLanguage] = useLangStore((state) =&gt; [state.language, state.setLanguage], shallow);
</code></pre>
</dd>
<dt><a href="#useLang">useLang(keys, context)</a> ⇒ <code>string</code> | <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns the language string for the given key. You can optionally pass
multiple keys, or a context object to interpolate data into a Mustache
template format.</p>
</dd>
<dt><a href="#useLangObject">useLangObject(ids, options)</a> ⇒ <code>object</code></dt>
<dd><p>Return lang entries for a single id or array of ids</p>
</dd>
<dt><a href="#useLoadLanguage">useLoadLanguage()</a> ⇒ <code>function</code></dt>
<dd><p>Returns a function to load a remote language dictionary into the store from the provided URL.</p>
</dd>
<dt><a href="#useSetLanguage">useSetLanguage()</a> ⇒ <code>function</code></dt>
<dd><p>Returns a function to set the language dictionary for the given language</p>
</dd>
<dt><a href="#loadLanguage">loadLanguage(language, url)</a> ⇒ <code>Promise</code></dt>
<dd><p>Fetch a language file from JSON or CSV. CSV should have &quot;key&quot; and &quot;value&quot; columns.
JSON file should be an object of key / value pairs.</p>
</dd>
<dt><a href="#interpolateString">interpolateString(template, values)</a> ⇒ <code>string</code></dt>
<dd><p>Replaces all occurrences of {{placeholders}} in the given string with the
corresponding values from the given context object.</p>
</dd>
</dl>

<a name="useLangStore"></a>

## useLangStore(selectState, comparator) ⇒ <code>\*</code>
Zustand store for i18n module.

Select individual items from the store with:

```js
const language = useLangStore((state) => state.language);
```

Or select multiple with:

```js
import shallow from "zustand/shallow";
const [language, setLanguage] = useLangStore((state) => [state.language, state.setLanguage], shallow);
```

**Kind**: global function  
**Returns**: <code>\*</code> - the selected values from the store  

| Param | Type | Description |
| --- | --- | --- |
| selectState | <code>function</code> | a function that accepts the full state in the store and returns the desired values. |
| comparator | <code>function</code> | a comparator function that compares the last state selection to the current one.  Be sure to set this if selecting multiple items from the state. |

<a name="useLang"></a>

## useLang(keys, context) ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
Returns the language string for the given key. You can optionally pass
multiple keys, or a context object to interpolate data into a Mustache
template format.

**Kind**: global function  
**Returns**: <code>string</code> \| <code>Array.&lt;string&gt;</code> - an individual language string or an array of strings  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>string</code> \| <code>Array.&lt;string&gt;</code> | an array of language keys |
| context | <code>object</code> | an optional object of values to populate the language string with |

<a name="useLangObject"></a>

## useLangObject(ids, options) ⇒ <code>object</code>
Return lang entries for a single id or array of ids

**Kind**: global function  
**Returns**: <code>object</code> - an object with IDs as props and corresponding language strings as values  

| Param | Type | Description |
| --- | --- | --- |
| ids | <code>Array.&lt;string&gt;</code> |  |
| options | <code>object</code> |  |
| options.prefix | <code>string</code> | prefix to prepend to each of the ids |
| options.context | <code>object</code> | context to use to when interpolating the string |

<a name="useLoadLanguage"></a>

## useLoadLanguage() ⇒ <code>function</code>
Returns a function to load a remote language dictionary into the store from the provided URL.

**Kind**: global function  
**Returns**: <code>function</code> - (language: string, url: string|object) => void  
<a name="useSetLanguage"></a>

## useSetLanguage() ⇒ <code>function</code>
Returns a function to set the language dictionary for the given language

**Kind**: global function  
**Returns**: <code>function</code> - (language: string, [dict: object]) => void  
<a name="loadLanguage"></a>

## loadLanguage(language, url) ⇒ <code>Promise</code>
Fetch a language file from JSON or CSV. CSV should have "key" and "value" columns.
JSON file should be an object of key / value pairs.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| language | <code>string</code> | language identifier (e.g. "en") |
| url | <code>string</code> | url of JSON file to load language from |

<a name="interpolateString"></a>

## interpolateString(template, values) ⇒ <code>string</code>
Replaces all occurrences of {{placeholders}} in the given string with the
corresponding values from the given context object.

**Kind**: global function  

| Param | Type |
| --- | --- |
| template | <code>string</code> | 
| values | <code>object</code> | 

