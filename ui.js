(async function() {
    const tableRef = document.getElementById('table-body');

    const items = await data.getItemsV2();

    items.forEach((item) => {
        console.log(item);
        const row = document.createElement('tr');
        const name = document.createElement('td');
        name.innerText = item.brand;
        console.log(name);
        const price = document.createElement('td');
        price.innerText = item.price;
        row.appendChild(name);
        row.appendChild(price);
        tableRef.appendChild(row);
    });
})();



function sortTable() {
    const table = document.getElementById("mainTable");
    var rows, switching, i, x, y, shouldSwitch;
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            if (i !== rows.length - 1) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("td")[1];
                y = rows[i + 1].getElementsByTagName("td")[1];
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