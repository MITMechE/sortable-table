/*
 * Sortable table script by Zachary Yaro <zmyaro@mit.edu>.
 */

/**
 * Create a new sortable table
 * @param {HTMLTableElement} table - The <table> to make sortable
 */
function SortableTable(table) {
	/** {HTMLTableSectionElement} The <table>'s <tbody> */
	this.tbody = table.querySelector('tbody');
	/** {HTMLTableCellElement} The heading of the column the table is currently sorted by */
	this.sortHead;

	// Add event listeners to headings.
	const ths = table.querySelectorAll('thead th');
	this.makeHeadingsClickable(ths)
}

/**
 * @private
 * Compare 2 values for sorting.
 * @param {*} a
 * @param {*} b
 * @returns {Number} -1, 0, or 1
 */
SortableTable.prototype._compareValues = function (a, b) {
	if (a < b) {
		return -1;
	} else if (a > b) {
		return 1;
	}
	return 0;
};

/**
 * Make an individual table heading sort when clicked
 * @param {Array<HTMLTableCellElement>} ths 
 */
SortableTable.prototype.makeHeadingsClickable = function (ths) {
	const boundClickHandler = this.handleHeadingClick.bind(this);
	for (const th of ths) {
		th.classList.add('sortable-heading');
		th.tabIndex = 0;
		th.addEventListener('click', boundClickHandler);
	}
};

/**
 * Sort the table by the selected column.
 * @param {MouseEvent} ev
 */
SortableTable.prototype.handleHeadingClick = function (ev) {
	const colHeading = ev.currentTarget,
		colIndex = colHeading.cellIndex,
		// If this is a freshly clicked heading, ascend first; if it was already clicked, switch direction.
		isAsc = (colHeading !== this.sortHead ||
			colHeading.getAttribute('aria-sort') === 'descending');
	
	// Remove sorting indicators from previously selected heading.
	if (this.sortHead) {
		this.sortHead.removeAttribute('aria-sort');
		this.sortHead.classList.remove('sorted-heading');
	}

	this.sortByCol(colIndex, isAsc);
	
	colHeading.setAttribute('aria-sort', isAsc ? 'ascending' : 'descending');
	colHeading.classList.add('sorted-heading');
	this.sortHead = colHeading;
};

/**
 * Sort the table by the selected column.
 * @param {Number} colIndex - The index of the column to sort by
 * @param {Boolean} isAsc - Whether to sort ascending
 */
SortableTable.prototype.sortByCol = function (colIndex, isAsc) {
	let rows = Array.from(this.tbody.getElementsByTagName('tr'));
	rows.sort((rowA, rowB) => {
		const valA = rowA.children[colIndex].dataset.sortValue || rowA.children[colIndex].textContent.toLowerCase(),
			valB = rowB.children[colIndex].dataset.sortValue || rowB.children[colIndex].textContent.toLowerCase();
		return this._compareValues(valA, valB) * (isAsc ? 1 : -1);
	});
	this.reflowRows(rows);
};

/**
 * Repopulate the table body with the columns in their new order.
 * @param {Array<HTMLTableRowElement>} rows - The rows in their new order
 */
SortableTable.prototype.reflowRows = function (rows) {
	for (const row of rows) {
		// Reappend each row to the body in the new order.
		this.tbody.appendChild(row);
	}
};
