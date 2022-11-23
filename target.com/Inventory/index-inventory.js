/**
 * Main things to be done:
 * - Take input from the manager in the form field
 * - Add, update(edit) and delete a product
 * - When any change happens in the data (global source) update the view also
 */

// adds click event listeners on add, update and cancel buttons
window.onload = function () {
    let addButton = document.querySelector("#addProduct");
    addButton.onclick = handleAddProduct;

    let updateButton = document.querySelector("#updateProduct");
    updateButton.onclick = handleUpdateProduct;

    let cancelButton = document.querySelector("#cancelUpdate");
    cancelButton.onclick = handleProductUpdateCancel;

    let filterButton = document.querySelector("#filterId");
    filterButton.onclick = handleFilter;

    let sortButton = document.querySelector("#sortBy");
    sortButton.onclick = handleSort;

    let clearButton = document.querySelector("#clearFilter");
    clearButton.onclick = handleFilterClear;

    generateProductRows(getProductData());


};

/**
 * @description
 * - holds the id of product being edited
 * - value null means nothing is being edited
 */
let selectedProductForEdit = null;

function getProductData() {
    return getGlobalData();
}

function saveProductData(products = []) {
    saveGlobalData(products)
}

/**
 * @description
 * - Reads value of all elements of a form
 * - Constructs an object to hold the form data. Where for each property:
 *   - input field name is the `key`
 *   - input field value is the `value`
 *   
 *   e.g. If an input has name='itemName' and value='Phone' then the 
 *   constructed object will contain the mapping like this:
 *   ```
 *   {
 *     ...,
 *     itemName: 'Phone',
 *     ...
 *   }
 *   ```
 * </ul>
 * 
 * @param {HTMLFormElement} form 
 * @returns {object} product object
 */
function getProductDataOfForm(form) {
    let productData = {
        // itemName: "",
        // itemCategory: "",
        // quantity: 0,
        // brand: "",
        // price: 0,
        // rating: 0,
        // imageSource: ""
    }

    let inputs = form.querySelectorAll("input");

    inputs.forEach(element => {
        productData[element.name] = element.value;
    });

    return productData;
}

/**
 * @description
 * Clears the value of all the input fields to empty string for a given form
 * 
 * @param {HTMLFormElement} form 
 */
function clearForm(form) {
    form.querySelectorAll("input").forEach(element => {
        element.value = '';
    });
}

/**
 * @description
 * Clears the update status:
 * - Sets the `selectedProductForEdit` to `null` to indicate nothing is being currently edited
 * - Calls the `clearForm` function to clear all the fields
 * - Shows the `Add` button and hides `Update` and `Cancel` buttons
 */
function clearUpdateStatus() {
    selectedProductForEdit = null;

    let form = document.querySelector("#inventoryForm");
    clearForm(form);

    let addButton = document.querySelector("#addProduct");
    let updateButton = document.querySelector("#updateProduct");
    let cancelButton = document.querySelector("#cancelUpdate");

    addButton.style.display = "inline-block";
    updateButton.style.display = "none";
    cancelButton.style.display = "none";
}

/**
 * @description
 * Handles the `Add` button click event
 * - Extracts form data
 * - Clears the form
 * - Calls the method `addProduct` to add a new product
 * 
 * @param {MouseEvent} event 
 */
function handleAddProduct(event) {
    event.preventDefault();

    // console.log(event.target); // prints form
    let form = document.querySelector("#inventoryForm");

    let productData = getProductDataOfForm(form);
    clearForm(form);

    addProduct(productData);
}

/**
 * @description
 * Adds a new product
 * - Udates the `productIdCounter`
 * - Adds the provided product data to the global products source
 * - Calls the method `generateProductRows` to show the change in the screen
 * 
 * @param {object} productData 
 */
function addProduct(productData = {}) {
    let data = { ...productData, id: ++productIdCounter };

    let newProducts = getProductData().concat(data);
    saveProductData(newProducts);

    generateProductRows(getProductData());

}

/**
 * @description
 * Handles the `Update` button click when the `edit` mode is on
 * - Extracts form data
 * - Clears the form
 * - Calls the method `updateProduct` to update an existing product
 * 
 * @param {MouseEvent} event 
 */
function handleUpdateProduct(event) {
    event.preventDefault();

    if (!selectedProductForEdit)
        return;

    let form = document.querySelector("#inventoryForm");
    let productData = getProductDataOfForm(form);
    clearForm(form);

    updateProduct(selectedProductForEdit, productData);
}

/**
 * @description
 * Updates an existing products with provided data
 * - Checks if the product with given `id` exists or not
 * - If exists, then replaces the existing product data object with new one
 * - Calls `clearUpdateStatus` to get out of `edit` mode as the update is done
 * - Calls the method `generateProductRows` to show the change in the screen
 * 
 * @param {(string | number )} id Product ID
 * @param {object} newProdData 
 */
function updateProduct(id, newProdData) {
    let selectedProductForUpdateIndex = getProductData().findIndex(product => product.id === parseInt(id, 10));

    if (selectedProductForUpdateIndex > -1) {
        let data = { ...newProdData, id: parseInt(id, 10) };
        let newProducts = [...getProductData()];
        newProducts[selectedProductForUpdateIndex] = data;
        saveProductData(newProducts);
    }

    clearUpdateStatus();
    generateProductRows(getProductData());
}

/**
 * @description
 * Handles the `Cancel` button click when the `edit` mode is on just by calling the `clearUpdateStatus` method
 * 
 * @param {MouseEvent} event 
 */
function handleProductUpdateCancel(event) {
    event.preventDefault();

    clearUpdateStatus();
}


/**
 * @description
 * Takes a product data, then generates and returns corresponding table row element.
 * 
 * @param {object} productData 
 * @returns {HTMLTableRowElement}
 */
function getProductRow(productData) {
    let tableRow = document.createElement("tr");
    let tdItemName = document.createElement("td");
    let tdItemCategory = document.createElement("td");
    let tdQuantity = document.createElement("td");
    let tdBrand = document.createElement("td");
    let tdPrice = document.createElement("td");
    let tdRating = document.createElement("td");
    let tdImageSource = document.createElement("td");
    let tdActions = document.createElement("td");

    // Edit button for a given product
    let tdEditButton = document.createElement("button");
    tdEditButton.innerText = "Edit";
    tdEditButton.setAttribute("productid", productData.id);

    tdEditButton.onclick = function () {
        handleProductEdit(productData.id);
    }

    // Delete button for a given product
    let tdDeleteButton = document.createElement("button");
    tdDeleteButton.innerText = 'Delete';
    tdActions.append(tdEditButton, tdDeleteButton);

    tdDeleteButton.onclick = function () {
        handleProductDelete(productData.id);
    }

    tdItemName.innerHTML = productData.itemName;
    tdItemCategory.innerHTML = productData.itemCategory;
    tdQuantity.innerHTML = productData.quantity;
    tdBrand.innerHTML = productData.brand;
    tdPrice.innerHTML = productData.price;
    tdRating.innerHTML = productData.rating; // Call a method to get rating element later
    tdImageSource.innerHTML = productData.imageSource;
    tableRow.append(tdItemName, tdItemCategory, tdQuantity, tdBrand, tdPrice, tdRating, tdImageSource, tdActions);

    return tableRow;
}

/**
 * @description
 * Handles the `Edit` button click for a product
 * - Activates the `edit` mode by setting the `selectedProductForEdit` to `id` of the selected product
 * - Calls the `loadFormWithProductData` to load the data of selected product in the form
 * - Shows the `Update` and `Cancel` button and hides the `Add` button
 * 
 * @param {(string|number))} productId 
 */
function handleProductEdit(productId) {
    selectedProductForEdit = productId;

    loadFormWithProductData();

    let addButton = document.querySelector("#addProduct");
    let updateButton = document.querySelector("#updateProduct");
    let cancelButton = document.querySelector("#cancelUpdate");

    addButton.style.display = "none";
    updateButton.style.display = "inline-block";
    cancelButton.style.display = "inline-block";
}

/**
 * @description
 * Loads the form after finding the selected product (i.e. Fills the data of properties of the product object to corresponding input elements)
 */
function loadFormWithProductData() {
    if (selectedProductForEdit === null)
        return;

    let productData = getProductData().find(p => p.id === parseInt(selectedProductForEdit, 10));

    if (!productData)
        return;

    let form = document.querySelector("#inventoryForm");
    form.querySelectorAll("input").forEach(inputElement => {
        inputElement.value = productData[inputElement.name];
    });
}

/**
 * @description
 * Handles the `Delete` button click for a product
 * - Removes the selected product from the global data source
 * - Calls the method `generateProductRows` to show the changes 
 * 
 * @param {(string|number)} productId 
 */
function handleProductDelete(productId) {
    let productToDeleteIndex = getProductData().findIndex(product => product.id === parseInt(productId, 10));

    if (productToDeleteIndex < 0)
        return;

    getProductData().splice(productToDeleteIndex, 1);

    generateProductRows(getProductData());
}

/**
 * @description
 * Generates product row elements in the DOM
 * 
 * @param {object[]} products 
 *  
 */

//Added by saroj for sort and filter

function generateProductRows(products) {
    let productRowElements = [];    //Product row element list, generate from above function is store here
    products.forEach(product => {
        let productElement = getProductRow(product);
        productRowElements.push(productElement);
    });
    let tbodyRef = document.querySelector("#managerProductList tbody");
    tbodyRef.innerHTML = "";
    tbodyRef.append(...productRowElements); //It will not take array so use spread operator
}

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
    let products = getProductData();
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
    generateProductRows(filteredProducts);
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
    let products = [...getProductData()];
    let sortData = getSortDataOfForm();
    products.sort(function (a, b) {
        if (sortData.sortDir === "ascending") {
            return parseFloat(a[sortData.sortBy]) - parseFloat(b[sortData.sortBy])
        }
        return parseFloat(b[sortData.sortBy]) - parseFloat(a[sortData.sortBy])
    });

    generateProductRows(products);
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


//Added by Saroj to clear filter and sort
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

    generateProductRows(getProductData());
}



