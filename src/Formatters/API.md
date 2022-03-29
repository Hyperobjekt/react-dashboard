## Functions

<dl>
<dt><a href="#autoFormatNumber">autoFormatNumber(num)</a> ⇒ <code>string</code></dt>
<dd><p>Determines the number precision and returns a short formatted string with appropriate sig figs.
(e.g. 12000000 -&gt; 1.2M)</p>
</dd>
<dt><a href="#formatInteger">formatInteger(num)</a> ⇒ <code>string</code></dt>
<dd><p>Formats full integer values, adding commas for thousands
(e.g. 1234567 -&gt; 1,234,567)</p>
</dd>
<dt><a href="#formatIntegerShort">formatIntegerShort(num)</a> ⇒ <code>string</code></dt>
<dd><p>Formats short integer values.
(e.g. 1200 -&gt; 1.2k)</p>
</dd>
<dt><a href="#formatDecimal">formatDecimal(value, precision)</a> ⇒ <code>string</code></dt>
<dd><p>Formats decimal numbers to the given precision (eg. 123.456789 -&gt; 123.46)</p>
</dd>
<dt><a href="#formatDate8601">formatDate8601(date)</a> ⇒ <code>string</code></dt>
<dd><p>Formats date to ISO string (yyyy-mm-dd) (e.g. 2018-01-02)</p>
</dd>
<dt><a href="#formatShortDate">formatShortDate(date)</a> ⇒ <code>string</code></dt>
<dd><p>Formats date to short format (e.g. Jan 2, &#39;18)</p>
</dd>
<dt><a href="#formatFullDate">formatFullDate(date)</a> ⇒ <code>string</code></dt>
<dd><p>Formats date to full format (e.g. January 2, 2018)</p>
</dd>
<dt><a href="#formatMonth">formatMonth(date)</a> ⇒ <code>string</code></dt>
<dd><p>Formats date to full month name (e.g. January)</p>
</dd>
<dt><a href="#formatShortMonth">formatShortMonth(date)</a> ⇒ <code>string</code></dt>
<dd><p>Formats date to short month name (e.g. Jan)</p>
</dd>
<dt><a href="#formatMonthDay">formatMonthDay(date)</a> ⇒ <code>string</code></dt>
<dd><p>Formats date to short month day (e.g. Jan 2)</p>
</dd>
<dt><a href="#formatMonthYear">formatMonthYear(date)</a> ⇒ <code>string</code></dt>
<dd><p>Formats date to short month year (e.g. Jan &#39;18)</p>
</dd>
<dt><a href="#formatPercent">formatPercent(value)</a> ⇒ <code>string</code></dt>
<dd><p>Formats decimal values to percent with 2 sig figs (e.g. 0.5 -&gt; 50%)</p>
</dd>
<dt><a href="#formatDollars">formatDollars(value)</a> ⇒ <code>string</code></dt>
<dd><p>Formats a number value to full dollar amount with commas.  No cents will be shown. (e.g. 1234567.89 -&gt; $1,234,567)</p>
</dd>
<dt><a href="#formatCurrency">formatCurrency(value)</a> ⇒ <code>string</code></dt>
<dd><p>Formats a number value to a shortened currency format (e.g. 1234567 -&gt; $1.2M)</p>
</dd>
<dt><a href="#formatFullCurrency">formatFullCurrency(value)</a> ⇒ <code>string</code></dt>
<dd><p>Formats a number value to full dollar amount with commas and cents. (e.g. 1234567.89 -&gt; $1,234,567.89)</p>
</dd>
<dt><a href="#formatYesNo">formatYesNo(v)</a> ⇒ <code>string</code></dt>
<dd><p>Formats a truthy value to &quot;Yes&quot; or a falsy value to &quot;No&quot;</p>
</dd>
<dt><a href="#formatOnOff">formatOnOff(v)</a> ⇒ <code>string</code></dt>
<dd><p>Formats a truthy value to &quot;On&quot; or a falsy value to &quot;Off&quot;</p>
</dd>
<dt><a href="#formatNothing">formatNothing(value)</a> ⇒ <code>*</code></dt>
<dd><p>A pass-through function that returns the value provided</p>
</dd>
<dt><a href="#formatPercentValue">formatPercentValue(value)</a> ⇒ <code>string</code></dt>
<dd><p>Formats a number value to a percentage with 2 sig figs.  Does not multiply by 100 (use formatPercent instead for that case).  (e.g. 12.34 -&gt; 12.34%)</p>
</dd>
<dt><a href="#getFormatter">getFormatter(type)</a> ⇒ <code>function</code></dt>
<dd><p>Provides a formatter function based on the provided type string.  Available types include:</p>
<ul>
<li>number (123456789 -&gt; 12.34M)</li>
<li>integer (123456789 -&gt; 123,456,789)</li>
<li>integer_short (123456789 -&gt; 12M)</li>
<li>float (123.456789 -&gt; 123.46)</li>
<li>date (-&gt; 2018-01-02)</li>
<li>full_date (-&gt; January 2, 2018)</li>
<li>short_date (-&gt; Jan 2, &#39;18)</li>
<li>month (-&gt; January)</li>
<li>short_month (-&gt; Jan)</li>
<li>month_day (-&gt; Jan 2)</li>
<li>month_year (-&gt; Jan &#39;18)</li>
<li>percent (0.5 -&gt; 50%)</li>
<li>dollars (123456789 -&gt; $1,234,567)</li>
<li>currency (123456789 -&gt; $1.2M)</li>
<li>full_currency (123456789 -&gt; $1,234,567.89)</li>
<li>yes_no (true -&gt; Yes, false -&gt; No)</li>
<li>on_off (true -&gt; On, false -&gt; Off)</li>
</ul>
</dd>
</dl>

<a name="autoFormatNumber"></a>

## autoFormatNumber(num) ⇒ <code>string</code>
Determines the number precision and returns a short formatted string with appropriate sig figs.
(e.g. 12000000 -> 1.2M)

**Kind**: global function  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 

<a name="formatInteger"></a>

## formatInteger(num) ⇒ <code>string</code>
Formats full integer values, adding commas for thousands
(e.g. 1234567 -> 1,234,567)

**Kind**: global function  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 

<a name="formatIntegerShort"></a>

## formatIntegerShort(num) ⇒ <code>string</code>
Formats short integer values.
(e.g. 1200 -> 1.2k)

**Kind**: global function  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 

<a name="formatDecimal"></a>

## formatDecimal(value, precision) ⇒ <code>string</code>
Formats decimal numbers to the given precision (eg. 123.456789 -> 123.46)

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 
| precision | <code>number</code> | 

<a name="formatDate8601"></a>

## formatDate8601(date) ⇒ <code>string</code>
Formats date to ISO string (yyyy-mm-dd) (e.g. 2018-01-02)

**Kind**: global function  

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

<a name="formatShortDate"></a>

## formatShortDate(date) ⇒ <code>string</code>
Formats date to short format (e.g. Jan 2, '18)

**Kind**: global function  

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

<a name="formatFullDate"></a>

## formatFullDate(date) ⇒ <code>string</code>
Formats date to full format (e.g. January 2, 2018)

**Kind**: global function  

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

<a name="formatMonth"></a>

## formatMonth(date) ⇒ <code>string</code>
Formats date to full month name (e.g. January)

**Kind**: global function  

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

<a name="formatShortMonth"></a>

## formatShortMonth(date) ⇒ <code>string</code>
Formats date to short month name (e.g. Jan)

**Kind**: global function  

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

<a name="formatMonthDay"></a>

## formatMonthDay(date) ⇒ <code>string</code>
Formats date to short month day (e.g. Jan 2)

**Kind**: global function  

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

<a name="formatMonthYear"></a>

## formatMonthYear(date) ⇒ <code>string</code>
Formats date to short month year (e.g. Jan '18)

**Kind**: global function  

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

<a name="formatPercent"></a>

## formatPercent(value) ⇒ <code>string</code>
Formats decimal values to percent with 2 sig figs (e.g. 0.5 -> 50%)

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="formatDollars"></a>

## formatDollars(value) ⇒ <code>string</code>
Formats a number value to full dollar amount with commas.  No cents will be shown. (e.g. 1234567.89 -> $1,234,567)

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="formatCurrency"></a>

## formatCurrency(value) ⇒ <code>string</code>
Formats a number value to a shortened currency format (e.g. 1234567 -> $1.2M)

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 

<a name="formatFullCurrency"></a>

## formatFullCurrency(value) ⇒ <code>string</code>
Formats a number value to full dollar amount with commas and cents. (e.g. 1234567.89 -> $1,234,567.89)

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="formatYesNo"></a>

## formatYesNo(v) ⇒ <code>string</code>
Formats a truthy value to "Yes" or a falsy value to "No"

**Kind**: global function  

| Param | Type |
| --- | --- |
| v | <code>number</code> \| <code>boolean</code> \| <code>string</code> | 

<a name="formatOnOff"></a>

## formatOnOff(v) ⇒ <code>string</code>
Formats a truthy value to "On" or a falsy value to "Off"

**Kind**: global function  

| Param | Type |
| --- | --- |
| v | <code>number</code> \| <code>boolean</code> \| <code>string</code> | 

<a name="formatNothing"></a>

## formatNothing(value) ⇒ <code>\*</code>
A pass-through function that returns the value provided

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 

<a name="formatPercentValue"></a>

## formatPercentValue(value) ⇒ <code>string</code>
Formats a number value to a percentage with 2 sig figs.  Does not multiply by 100 (use formatPercent instead for that case).  (e.g. 12.34 -> 12.34%)

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="getFormatter"></a>

## getFormatter(type) ⇒ <code>function</code>
Provides a formatter function based on the provided type string.  Available types include:
- number (123456789 -> 12.34M)
- integer (123456789 -> 123,456,789)
- integer_short (123456789 -> 12M)
- float (123.456789 -> 123.46)
- date (-> 2018-01-02)
- full_date (-> January 2, 2018)
- short_date (-> Jan 2, '18)
- month (-> January)
- short_month (-> Jan)
- month_day (-> Jan 2)
- month_year (-> Jan '18)
- percent (0.5 -> 50%)
- dollars (123456789 -> $1,234,567)
- currency (123456789 -> $1.2M)
- full_currency (123456789 -> $1,234,567.89)
- yes_no (true -> Yes, false -> No)
- on_off (true -> On, false -> Off)

**Kind**: global function  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

