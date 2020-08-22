(function() {
    const tableRef = document.getElementById('table-body');

    const items = data.getItemsV1();

    items.forEach((item) => {
        console.log(item);
        const row = document.createElement('tr');
        const name = document.createElement('td');
        name.innerText = item.itemName;
        const price = document.createElement('td');
        price.innerText = item.price;
        row.appendChild(name);
        row.appendChild(price);
        tableRef.appendChild(row);
    });
})();
