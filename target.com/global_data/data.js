// main data of our system (Global variable to be imported in all the html pages which needs it, like: inventory page and customer product list page)
// When a product is added by manager, that product data is added in this array
// if manager wants to remove a product, that product is to be removed from this array
// same for updating
let productIdCounter = 0;
let globalProductsSource = [
    {
        imageSource: "https://target.scene7.com/is/image/Target/GUEST_f41fd0ae-7e4c-42ad-bae8-172c07f7d0d1",
        itemName: "Boost Mobile Prepaid Samsung Galaxy A03s (32GB) Smartphone - Black",
        brand: "Samsung",
        rating: "3.4",
        price: 599.99,
        quantity: 9,
        itemCategory: ""
    },
    {
        imageSource: "https://target.scene7.com/is/image/Target/GUEST_854cc1de-03b8-4952-b389-1ddcbdc25d0e",
        itemName: "Tracfone Prepaid Apple iPhone XR 4G CDMA (64GB) - Black",
        brand: "Apple",
        rating: "5",
        price: 179.99,
        quantity: 9,
        itemCategory: ""
    },
    


    {
        imageSource: "https://target.scene7.com/is/image/Target/GUEST_cb29b7a2-6858-4324-b237-c7a8418398f0?wid=253&hei=253&qlt=80&fmt=pjpeg",
        itemName: "VTech DECT 6.0 Expandable Cordless Phone with Answering Machine - 3 Handsets (CS5329-3)",
        brand: "V-tech",
        rating: "4",
        price: 59.99,
        quantity: 9,
        itemCategory: ""
    },
    {
        imageSource: "https://target.scene7.com/is/image/Target/GUEST_fc3faa9a-3211-4700-ac88-aefcac59254b?wid=253&hei=253&qlt=80&fmt=pjpeg",
        itemName: "Consumer Cellular ZTE Avid 589 (32GB) - Gray",
        brand: "Consumer Cellular",
        rating: "4",
        price: 59.99,
        quantity: 9,
        itemCategory: ""
    },

    {
        imageSource: "https://target.scene7.com/is/image/Target/GUEST_08860a03-2e4d-45f1-b4b5-d43e4cb6005e?wid=253&hei=253&qlt=80&fmt=pjpeg",
        itemName: "Samsung Galaxy A53 5G Unlocked (128GB) Smartphone - Black",
        brand: "Samsung",
        rating: "3",
        price: 449.99,
        quantity: 9,
        itemCategory: ""
    },
    {
        imageSource: "https://target.scene7.com/is/image/Target/GUEST_1c6a2dd9-ce8a-4e1e-bd92-a2654c42fbe4?wid=253&hei=253&qlt=80&fmt=pjpeg",
        itemName: "Motorola Moto 2022 G Stylus LTE Unlocked- Dark Blue",
        brand: "Motorola",
        rating: "4.5",
        price: 299.99,
        quantity: 9,
        itemCategory: ""
    },
    {
        imageSource: "https://target.scene7.com/is/image/Target/GUEST_f96d5029-70c1-49f1-a67f-784302a50700?wid=253&hei=253&qlt=80&fmt=pjpeg",
        itemName: "Tracfone Prepaid BLU View 2 (32GB) Smartphone - Black",
        brand: "BLU",
        rating: "3.1",
        price: 24.99,
        quantity: 9,
        itemCategory: ""
    },
    {
        imageSource: "https://target.scene7.com/is/image/Target/GUEST_3e9d3000-4faf-4d67-93d1-74b9a9567aa5?wid=253&hei=253&qlt=80&fmt=pjpeg",
        itemName: "Simple Mobile Prepaid Apple iPhone SE 2nd Gen (64GB) - White",
        brand: "Apple",
        rating: "4.1",
        price: 149.99,
        quantity: 9,
        itemCategory: ""
    }
    ,
    {
        imageSource: "https://target.scene7.com/is/image/Target/GUEST_feeb28ac-b403-4a05-ad00-1d2e5d17cd6c?wid=253&hei=253&qlt=80&fmt=pjpeg",
        itemName: "Tracfone Prepaid Apple iPhone SE 2nd Gen (64GB) CDMA - Black",
        brand: "Apple",
        rating: "4.4",
        price: 189.99,
        quantity: 9,
        itemCategory: ""
    }
    ,
    {
        imageSource: "https://target.scene7.com/is/image/Target/GUEST_d859cd7e-2380-448d-a73d-db946882b653?wid=253&hei=253&qlt=80&fmt=pjpeg",
        itemName: "GPO Retro GPODUKE Duke Push Button Telephone - Black",
        brand: "GPO Retro",
        rating: "3.1",
        price: 56.71,
        quantity: 9,
        itemCategory: ""
    },
    {
        imageSource: "https://target.scene7.com/is/image/Target/GUEST_ed7229c3-e0d9-45a9-aa78-3293a8ab4f93?wid=253&hei=253&qlt=80&fmt=pjpeg",
        itemName: "AT&T DECT 6.0 Big-Button Cordless Phone System",
        brand: "AT&T",
        rating: "3",
        price: 69.99,
        quantity: 9,
        itemCategory: ""
    }
    ,
    {
        imageSource: "https://target.scene7.com/is/image/Target/GUEST_837426de-5e9f-4d20-a018-4a829eb1a89c?wid=253&hei=253&qlt=80&fmt=pjpeg",
        itemName: "AT&T TR1909 Trimline Corded Phone with Caller ID - White",
        brand: "AT&T",
        rating: "3.7",
        price: 17.99,
        quantity: 9,
        itemCategory: ""
    }
];

if(!window.localStorage.getItem("globalProductsSource")) {
    window.localStorage.setItem("globalProductsSource", JSON.stringify(globalProductsSource));
}

function saveGlobalData(newData) {
    window.localStorage.setItem("globalProductsSource", JSON.stringify(newData));
}

function getGlobalData() {
    let data = window.localStorage.getItem("globalProductsSource");

    if(!data){
        return [];
    }

    return JSON.parse(data);
}

function getProductById(productId) {
    let products = getGlobalData();

    return products.find(p => p.id === productId);
}
