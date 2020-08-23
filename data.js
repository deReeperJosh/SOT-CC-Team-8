const data = {
    getItemsV1: function() {
        return [{
                itemName: 'butter',
                brand: 'Tararua',
                price: 3.99
            },
            {
                itemName: 'butter',
                brand: 'HomeBrand',
                price: 3.99
            },
            {
                itemName: 'butter',
                brand: 'Mainland',
                price: 2.99
            },
            {
                itemName: 'butter',
                brand: 'SuperBudget',
                price: 1.99
            }
        ];
    },

    getItemsV2: async function() {
        const response = await fetch("https://www.ishopnewworld.co.nz/Search?q=butter");
        if (response.ok) {
            const responseText = await response.text();
            const parser = new DOMParser();

            // html doc from parsed text from new world
            const doc = parser.parseFromString(responseText, 'text/html');

            // html array to js array
            const itemArray = Array.from(doc.getElementsByClassName('js-product-card-footer'));

            //
            // console.log(itemArray);

            // convert all elements to js objects
            const jsArray = itemArray.map(element => JSON.parse(element.getAttribute('data-options')));

            //
            //console.log(jsArray);

            // format converted data into expected json array
            const formattedArray = jsArray.map(element => {
                return {
                    itemName: 'butter',
                    brand: element.productName,
                    price: element.ProductDetails.PricePerItem
                }
            });

            //
            //console.log(formattedArray);

            return formattedArray;
        }
    },

    getItemsV3: async function() {


        const newWorldItems = getItems('New World', 'https://www.ishopnewworld.co.nz/Search?q=');
        const pakNSaveItems = getItems(`Pak'nSave`, 'https://www.paknsaveonline.co.nz/Search?q=');
        const result = await Promise.all([newWorldItems, pakNSaveItems]);

        return [result.flat(2)];

    },

    getItemsV4: async function(item = 'butter') {

        const newWorldItems = getItems('New World', 'https://www.ishopnewworld.co.nz/Search?q=', item);
        const pakNSaveItems = getItems(`Pak'nSave`, 'https://www.paknsaveonline.co.nz/Search?q=', item);
        const result = await Promise.all([newWorldItems, pakNSaveItems]);
        console.log([result.flat(2)]);

        return result.flat(2);



    }


}

async function getItems(storeName, Url, item) {
    const response = await fetch(Url + item);
    if (response.ok) {
        const responseText = await response.text();
        const parser = new DOMParser();

        // html doc from parsed text from new world
        const doc = parser.parseFromString(responseText, 'text/html');

        // html array to js array
        const itemArray = Array.from(doc.getElementsByClassName('js-product-card-footer'));

        //
        // console.log(itemArray);

        // convert all elements to js objects
        const jsArray = itemArray.map(element => JSON.parse(element.getAttribute('data-options')));

        //
        //console.log(jsArray);

        // format converted data into expected json array
        return jsArray.map(element => {
            return {
                storeName: storeName,
                itemName: item,
                brand: element.productName,
                price: element.ProductDetails.PricePerItem
            }
        });

        //
        //console.log(formattedArray);
    }


}
data.getItemsV4('milk');