let shoppingCart = (function () {
    let basket = [];
    return {
      //Item = {id: 0, product: {id: 1, name: 'Coffee', description: 'Coffee Grounds from Ethiopia', price: 9.5}, count: 1}
        upsertItem:function(item){
            // add an item to basket if doesn't exist, or update if exist.
            // basket.push(item);
            let foundItem = basket.find(ele=> ele.id ===item.id);
            if(!foundItem){
                basket.push(item);
            }
            // console.log("11111",basket);

        },
        getItemsCount:function(){
            // returns the total number of items in the basket
           return basket.length;

        },
        getTotalPrice:function(){
            //calculates the total price of items. Each item price is the product's price multiply item's count.
            let price =0;
            basket.forEach(ele =>{
                price+= ele.product.price*ele.count;
            });
            return price;
        },

        removeItemById:function(id){
            //removes an item from the basket
            let itemIndex = basket.findIndex(ele=> ele.id === id);
            basket.splice(itemIndex,1);
            return basket;
        },
        getBasketItem:function(){
            return basket;
        }

    }
})();


const item1 = { id: 0, product: { id: 1, name: 'Coffee', description: 'Coffee Grounds from Ethiopia', price: 9 }, count: 1 }
const item2 = { id: 1, product: { id: 2, name: 'Tea', description: 'Oonlong Tea from China', price: 10 }, count: 5 }
const item3 = { id: 2, product: { id: 3, name: 'Bottled Water', description: 'Bottled Water from US', price: 2 }, count: 30 }

shoppingCart.upsertItem(item1);
shoppingCart.upsertItem(item2);
shoppingCart.upsertItem(item3);
console.log("Expected Result: 119",shoppingCart.getTotalPrice()); //Expected Result: 119
item3.product.name = 'Himilayan Water';
item3.product.price = 10;
shoppingCart.upsertItem(item3);

console.log("Expected Result: 3",shoppingCart.getItemsCount()); //Expected Result: 3
console.log("Expected Result: 359",shoppingCart.getTotalPrice()); //Expected Result: 359
shoppingCart.removeItemById(1);
console.log("Expected 2",shoppingCart.getItemsCount()); //Expected Result: 2
console.log("Expected 309",shoppingCart.getTotalPrice()); //Expected Result: 309
// console.log(shoppingCart.getBasketItem());