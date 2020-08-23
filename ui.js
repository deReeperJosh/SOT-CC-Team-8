let _data = [];

(async function() {
    _data = await data.getItemsV4();

    const gifRef = document.getElementById('loading');

    gifRef.parentNode.removeChild(gifRef);

    buildTable();
})();

function buildTable() {
    const tableRef = document.getElementById('table-body');
    while (tableRef.hasChildNodes()) {
        tableRef.removeChild(tableRef.lastChild);
    }

    _data.forEach((item) => {
        const row = document.createElement('tr');
        const name = document.createElement('td');
        name.innerText = item.brand;
        const price = document.createElement('td');
        price.innerText = item.price;
        const storeName = document.createElement('td');
        storeName.innerText = item.storeName;
        row.appendChild(name);
        row.appendChild(storeName);
        row.appendChild(price);
        tableRef.appendChild(row);
    });
}

function sortTableV2() {
    _data = _data.sort((a, b) => {
        return a.brand - b.brand;
    })
    _data = _data.sort((a, b) => {
        if (a.brand == b.brand) { return 0; }
        return a.price - b.price;
    })
    buildTable();
}



function sortTable() {
    const table = document.getElementById("mainTable");
    const tableBody = document.getElementById("table-body");
    var rows, switching, i, x, y, shouldSwitch;
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = tableBody.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 0; i < (rows.length - 1); i++) {
            if (i !== rows.length - 1) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("td")[2];
                y = rows[i + 1].getElementsByTagName("td")[2];
                // Check if the two rows should switch place:
                if (x.innerText > y.innerText) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}