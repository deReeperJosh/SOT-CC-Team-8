const data = {
    getItemsV1 : function(){
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
    }
} ;

async function getData(){
    let domparser = new DOMParser()​​;
    const response = await fetch("https://www.ishopnewworld.co.nz/Search?q=butter");
    if(response.ok){
        const responseText = await response.text(); 
        const doc = domparser.parseFromString(responseText, "text/html");
        console.log(doc);
    }
}

getData();

Array.from(document.getElementsByClassName('js-product-card-footer')).map(element => JSON.parse(element.getAttribute('data-options')));