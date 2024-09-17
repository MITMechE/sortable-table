# Simple Sortable Table Script

Written by Zachary Yaro <zmyaro@mit.edu>.

## Making a table sortable

To make a table sortable, call `new SortableTable(myTable)` where `myTable` is an `HTMLTableElement`.  For example:
```
<head>
	⋮
	<link href="sortable_table.css" rel="stylesheet" type="text/css">
	<script src="sortable_table.js"></script>
	<script>
		window.addEventListener('DOMContentLoaded', function () {
			new SortableTable(document.querySelector('table'));
		});
	</script>
</head>
```

The script assumes your `<table>` has its column headings in `<th>`s in a `<thead>`, followed by the sortable rows to in a `<tbody>`.


## Custom sort value

By default, rows will be sorted alphabetically (case-insensitive) by the text in the cells of the selected column.  If the a cell has a `data-sort-value` attribute, it will be sorted by that value instead.  For example:
```
<!-- Sorts alphabetically -->
<tr>
	<td>August 1<sup>st</sup>, 2010</td>
</tr>
<tr>
	<td>December 1<sup>st</sup>, 2010</td>
</tr>
<tr>
	<td>January 1<sup>st</sup>, 2010</td>
</tr>
<tr>
	<td>September 1<sup>st</sup>, 2009</td>
</tr>
```
```
<!-- Sorts correctly -->
<tr>
	<td data-sort-value="20090901">September 1<sup>st</sup>, 2009</td>
</tr>
<tr>
	<td data-sort-value="20100101">January 1<sup>st</sup>, 2010</td>
</tr>
<tr>
	<td data-sort-value="20100801">August 1<sup>st</sup>, 2010</td>
</tr>
<tr>
	<td data-sort-value="20101201">December 1<sup>st</sup>, 2010</td>
</tr>
```
