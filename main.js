"use strict"

//crud project
//consts declearation to get the elements 
//products inputs declearation
const productNameInput = document.getElementById("productNameInput");
const productPriceInput = document.getElementById("productPriceInput");
const productCategoryInput = document.getElementById("productCategoryInput");
const productDescInput = document.getElementById("productDescInput");

//buttons inputs
const add = document.getElementById("addBtn");
const update = document.getElementById("updateBtn");

//table 
const table = document.getElementById("tableBody");

//array declration 
let productsContainer = [];

//variable to contian the current index used for update phase 
let currentIndex = 0;

//local storage check product and data validation 
if (localStorage.getItem("products") != null) {
    productsContainer = JSON.parse(localStorage.getItem("products"));

    //show products on load from local storage
    readProduct();
}

//create add function
//the product object to reseve and hold the inputs from the user
//asign key value to the dynamic const
function addProduct() {
    //product object declration
    var product =
    {
        productName: productNameInput.value,
        productPrice: productPriceInput.value,
        productCateg: productCategoryInput.value,
        productDescr: productDescInput.value
    };
    //push object into array
    productsContainer.push(product);

    //storage the products in local storage
    localStorage.setItem("products", JSON.stringify(productsContainer));

    //read the index products 
    readProduct();

    //clear form inputs to make the form ready for another input
    clearForm();
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

//read the inputs function
function readProduct() {
    //read by litral object
    let display = ``;

    for (var i = 0; i < productsContainer.length; i++) {
        display +=
            `<tr>
        <td>${i + 1}</td>
        <td>${productsContainer[i].productName}</td>
        <td>${productsContainer[i].productPrice}</td>
        <td>${productsContainer[i].productCateg}</td>
        <td>${productsContainer[i].productDescr}</td>
        <td><button class="btn btn-outline-warning" onclick="updateProduct(${i});">Update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i});">delete</button></td>
        </tr>`
    }

    //table element is decleared from tableBody id element
    table.innerHTML = display;
}

//update the inputs function
function updateProduct(index) {
    //change class display to display update instead of add
    update.classList.replace("d-none", "d-inline-block");
    add.classList.add("d-none");

    //display inputs of specified index into inputs
    productNameInput.value = productsContainer[index].productName;
    productPriceInput.value = productsContainer[index].productPrice;
    productCategoryInput.value = productsContainer[index].productCateg;
    productDescInput.value = productsContainer[index].productDescr;

    //store index value into current index for the updatedData method
    currentIndex = index;
}

//add updatedData
function updatedData() {
    productsContainer[currentIndex].productName = productNameInput.value;
    productsContainer[currentIndex].productPrice = productPriceInput.value;
    productsContainer[currentIndex].productCateg = productCategoryInput.value;
    productsContainer[currentIndex].productDescr = productDescInput.value;

    //local storage store data
    localStorage.setItem("products", JSON.stringify(productsContainer));

    readProduct();

    //switch buttons add, update
    update.classList.replace("d-inline-block", "d-none");
    add.classList.remove("d-none");

    clearForm();
}

//delete the input function
function deleteProduct(index) {
    productsContainer.splice(index, 1);
    //delete form local storage so onload the data don't get back by if condition up 
    localStorage.setItem("products", JSON.stringify(productsContainer));
    readProduct();
}

//valedation section 
//decleration of span content validation
const invalidName = document.querySelector("#invalidProductName");
const emptyName = document.querySelector("#emptyProductName");

const invalidPrice = document.querySelector("#invalidProductPrice");
const emptyPrice = document.querySelector("#emptyProductPrice");

const invalidCateg = document.querySelector("#invalidProductCateg");
const emptyCateg = document.querySelector("#emptyProductCateg");

const invalidDesc = document.querySelector("#invalidProductDesc");
const emptyDesc = document.querySelector("#emptyProductDesc");

function addValidation() {
    if (productNameInput.value == "" || productPriceInput.value == "" ||
        productCategoryInput.value == "" || productDescInput.value == "") {
        validateProductName();
        validateProductPrice();
        validateProductCateg();
        validateProductDesc();
    }
    else {
        addProduct();
    }
}

function validateProductName() {
    let rejex = /^[a-zA-Z]{3,8}$/ig;
    if (rejex.test(productNameInput.value) == true) {
        invalidName.classList.replace("d-inline-block", "d-none");
        emptyName.classList.replace("d-inline-block", "d-none");

        return true;
    }
    else if (productNameInput.value == '') {
        invalidName.classList.replace("d-inline-block", "d-none");
        emptyName.classList.replace("d-none", "d-inline-block");
    }
    else 
    {
        invalidName.classList.replace("d-none", "d-inline-block");
        emptyName.classList.replace("d-inline-block", "d-none");

        return false;
    }
}

function validateProductPrice() {
    let rejex = /^[0-9]{1,}$/ig;
    if (rejex.test(productPriceInput.value) == true) {
        invalidPrice.classList.replace("d-inline-block", "d-none");
        emptyPrice.classList.replace("d-inline-block", "d-none");

        return true;
    }
    else if (productNameInput.value == '') {
        invalidPrice.classList.replace("d-inline-block", "d-none");
        emptyPrice.classList.replace("d-none", "d-inline-block");
    }
    else {
        invalidPrice.classList.replace("d-none", "d-inline-block");
        emptyPrice.classList.replace("d-inline-block", "d-none");

        return false;
    }
}

function validateProductCateg() {
    let rejex = /^[a-zA-Z]{3,8}$/ig;
    if (rejex.test(productCategoryInput.value) == true) {
        invalidCateg.classList.replace("d-inline-block", "d-none");
        emptyCateg.classList.replace("d-inline-block", "d-none");

        return true;
    }
    else if(productCategoryInput.value == '') {
        invalidCateg.classList.replace("d-inline-block", "d-none");
        emptyCateg.classList.replace("d-none", "d-inline-block");
    }
    else {
        invalidCateg.classList.replace("d-none", "d-inline-block");
        emptyCateg.classList.replace("d-inline-block", "d-none");

        return false;
    }
}

function validateProductDesc() {
    let rejex = /^[a-zA-Z]$/ig;
    if (rejex.test(productDescInput.value) == true) {
        invalidDesc.classList.replace("d-inline-block", "d-none");
        emptyDesc.classList.replace("d-inline-block", "d-none");

        return true;
    }
    else if (productNameInput.value == '') {
        invalidDesc.classList.replace("d-inline-block", "d-none");
        emptyDesc.classList.replace("d-none", "d-inline-block");
    }
    else {
        invalidDesc.classList.replace("d-none", "d-inline-block");
        emptyDesc.classList.replace("d-inline-block", "d-none");

        return false;
    }
}