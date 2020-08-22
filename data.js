const data = {
    getItemsV1: function () {
        return [
            {
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

    getItemsV2: async function () {
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
            }
            );

             //
            //console.log(formattedArray);

            return formattedArray;
        }
    }
};