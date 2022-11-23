/*eslint-disable*/


/**
 * 
 * @param {object} productData information/ data of a product
 * @returns {HTMLElement} Product component(complex element combined of multiple elements)
 */
function getProductComponent(productData = { imageSource: "", itemName: "", brand: "", rating: "", price: 0, itemCategory: "" }) {

    console.log(productData);
    // create all of the tile elements
    let photoGridItem = document.createElement("div");//added by rick
    let cardImage = document.createElement("div");//added by rick (card-image container)
    let imgElement = document.createElement("img");
    let imgContainer = document.createElement("div");//main image container
    let itemNameElement = document.createElement("h4");
    let brandElement = document.createElement("div");
    let ratingContainer = document.createElement("div");
    let ratingElement = document.createElement("div");//added by rick
    let priceElement = document.createElement("div");
    // let addToCartButton = document.createElement("button");
    let infoWrapper = document.createElement("div");
    let buttonWrapper = document.createElement("div");
    let eachProductContainer = document.createElement("div");
    let cartButtonContainer = document.createElement("div");//added by rick
    let cartButton = document.createElement("button");//added by rick
    // add phone text below the price element
    let phoneTextWP = document.createElement("div")
    let phoneTextFS = document.createElement("div")
    let phoneTextEA = document.createElement("div")
    let phoneTextIS = document.createElement("div")
    let phoneTextPU = document.createElement("div")

    // add anchor link to single product page
    let productAnchor = document.createElement("a");





    // additional setups - added by Rick
    // photoGridItem.className = "photo-grid-item"
    imgContainer.setAttribute("class", "Sirv-phone-image-main");
    // let productListContainer = document.getElementById("productListContainer");
    eachProductContainer.className = "photo-grid-item"
    brandElement.className = "brand";
    ratingContainer.className = "rating-container";
    priceElement.className = "price";
    itemNameElement.className = "phone-heading";
    ratingElement.className = "rating";
    ratingElement.setAttribute("style", `--rating: ${productData.rating}`);
    cardImage.className = "card-image";
    productAnchor.className = "phone-heading";
    productAnchor.innerHTML = productData.itemName;
    productAnchor.style.fontSize = "14px";
    productAnchor.style.fontFamily = "Arial, Helvetica, sans-serif";
    productAnchor.href = "./product-detail.html?id=" + productData.id;



    // setup cart-button
    cartButtonContainer.className = "cart-btn-container";
    cartButton.className = "cart-btn";
    cartButton.setAttribute("onclick", "")
    cartButton.innerHTML = "Add to Cart";
    cartButtonContainer.append(cartButton)

    //setup of phone text below pricing --- added by Rick
    phoneTextWP.className = "phone-text";
    phoneTextFS.className = "phone-text";
    phoneTextEA.className = "phone-text";
    phoneTextIS.className = "phone-text";
    phoneTextPU.className = "phone-text";
    phoneTextFS.style.color = "green";
    phoneTextIS.style.color = "green";
    phoneTextWP.innerHTML = "When Purchased online";
    phoneTextFS.innerHTML = "Free shipping"
    phoneTextEA.innerHTML = "Exclusions apply";
    phoneTextIS.innerHTML = "In stock in Burlington";
    phoneTextPU.innerHTML = "Not eligible for pickup"


    // Setup main Image Component;
    imgContainer.style.height = "250px";
    // imgContainer.style.width = "250px";
    imgContainer.style.overflow = "hidden";
    imgElement.setAttribute("src", productData.imageSource);
    imgElement.setAttribute("class", "phone-image-main");//added by rick
    imgElement.alt = productData.itemName//added by rick
    imgElement.style.height = "100%";//may need to add/modify to width 100%
    imgElement.style.margin = "0px auto";
    imgElement.style.width = 100 %
        imgContainer.append(imgElement);
    ratingContainer.append(ratingElement);//added by rick
    // photoGridItem.append(cardImage, cartButtonContainer);


    // area reserved for second "hover-over" image



    // Setup info wrapper 
    // itemNameElement.innerText = productData.itemName;
    brandElement.innerText = productData.brand;
    ratingElement.innerHTML = productData.rating;//modify or delete
    priceElement.innerText = "$" + productData.price;
    infoWrapper.className = "info-container";
    infoWrapper.append(brandElement, ratingContainer, priceElement,
        phoneTextWP, phoneTextFS, phoneTextEA, phoneTextIS, phoneTextPU);
    cardImage.append(imgContainer, productAnchor, infoWrapper)

    // All product elements are inside eachProductContainer
    eachProductContainer.append(cardImage, cartButtonContainer)
    // imgContainer, infoWrapper); fix

    return eachProductContainer;
}

function generateProductElementList(products = []) {


    // get a list of corresponding product elements or components for each product
    // let productElements = products.map(product => getProductComponent(product));

    let productElements = [];

    for (let product of products) {
        let productElement = getProductComponent(product);

        productElements.push(productElement);
    }

    let productListContainer = document.getElementById("productListContainer");
    if (productListContainer !== null) {
        productListContainer.remove();
    }

    productListContainer = document.createElement("div");
    productListContainer.setAttribute("id", "productListContainer");
    productListContainer.className = "photo-grid-container"//added by rick
    // productListContainer.setAttribute("style", "display: flex; flex-wrap: wrap; width: 100%;");
    productListContainer.append(...productElements);



    // change document body to any other element when the parent of product list container is defined
    // document.body.append(productListContainer); //not needed now as it will be appeded inside the "second" div.

    let second = document.querySelector(".second");//added by Rick...read existing element to append to
    // let productListContainer = document.getElementById("productListContainer");//added by Rick
    second.append(productListContainer)
}

window.onload = windowOnloadHandler;
function windowOnloadHandler() {

    let products = getProducts();
    generateProductElementList(products);

    // This part is handled in generateProductElementList as it should happen while generating product list everytime.
    // let second = document.querySelector(".second");//added by Rick...read existing element to append to
    // let productListContainer = document.getElementById("productListContainer");//added by Rick
    // second.append(productListContainer)////added by Rick

    //Added by Saroj for filter, Sort and Clear
    let filterButton = document.querySelector("#filterId");
    filterButton.onclick = handleFilter;

    let sortButton = document.querySelector("#sortBy");
    sortButton.onclick = handleSort;

    let clearButton = document.querySelector("#clearFilter");
    clearButton.onclick = handleFilterClear;
}

function getProducts() {
    return getGlobalData();
}





// 
function matchCategory(productCategory, filterCategory) {
    return filterCategory === null || filterCategory === "" ||
        productCategory.toLowerCase().includes(filterCategory.toLowerCase());
}

function matchBrand(productBrand, filterBrand) {
    return filterBrand === null || filterBrand === "" ||
        productBrand.toLowerCase().includes(filterBrand.toLowerCase());
}

function matchPrice(productPrice, filterPrice) {
    return filterPrice === null || filterPrice === "" ||
        parseFloat(productPrice, 10) <= parseFloat(filterPrice, 10);
}

function matchRating(productRating, filterRating) {
    return filterRating === null || filterRating === "" ||
        parseFloat(productRating, 10) <= parseFloat(filterRating, 10);
}

function handleFilter(event) {
    event.preventDefault();
    let products = getProducts();
    let filterData = getFilterDataOfForm();
    console.log(products)
    let filteredProducts = products.filter(product => {
        return (
            matchCategory(product.itemCategory, filterData.filterCategory) &&
            matchBrand(product.brand, filterData.filterBrand) &&
            matchPrice(product.price, filterData.filterPrice) &&
            matchRating(product.rating, filterData.filterRating)

        )
    });
    generateProductElementList(filteredProducts);
}

function getFilterDataOfForm() {
    let formFilterRef = document.querySelector("#filterForm");
    let filterData = {};

    let inputs = formFilterRef.querySelectorAll("input");

    inputs.forEach(element => {
        filterData[element.name] = element.value;
    });

    return filterData;
}


function handleSort(event) {
    event.preventDefault();
    let products = [...getProducts()];
    let sortData = getSortDataOfForm();
    products.sort(function (a, b) {
        if (sortData.sortDir === "ascending") {
            return parseFloat(a[sortData.sortBy]) - parseFloat(b[sortData.sortBy])
        }
        return parseFloat(b[sortData.sortBy]) - parseFloat(a[sortData.sortBy])
    });

    generateProductElementList(products);
}

function getSortDataOfForm() {
    let sortMap = {
        sortByPrice: "price",
        sortByRating: "rating"
    }
    let sortSelect = document.querySelector("#sortSelect");
    let sortSelectHighLow = document.querySelector("#sortHighLow");
    return {
        sortBy: sortMap[sortSelect.value],
        sortDir: sortSelectHighLow.value
    }
}

function clearFilterForm() {
    let formFilterRef = document.querySelector("#filterForm");

    let inputs = formFilterRef.querySelectorAll("input");

    inputs.forEach(element => {
        element.value = "";
    });
}

function handleFilterClear(event) {
    event.preventDefault();
    clearFilterForm();

    generateProductElementList(getProducts());
}
