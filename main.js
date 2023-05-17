var productNameInput = document.getElementById('productNameInput');
var productCategoryInput = document.getElementById('productCategoryInput');
var productDescInput = document.getElementById('productDescInput');
var productPriceInput = document.getElementById('productPriceInput');
var productContainer = [];
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var invalidProductName = document.getElementById('invalidProductName');
var emptyProductName = document.getElementById('emptyProductName');
var currentIndex = 0;

if (localStorage.getItem("myProduct") != null) {

    productContainer = JSON.parse(localStorage.getItem('myProduct'));
    display();
} else {
    productContainer = [];
}

function addProduct() {
    // object 
    var products = {
        productName: productNameInput.value,
        productPrice: productPriceInput.value,
        productDesc: productDescInput.value,
        productCatge: productCategoryInput.value,

    };

    
    productContainer.push(products);

    // Local Storage
    localStorage.setItem('myProduct', JSON.stringify(productContainer));
    display();
    clearForm();
   


}


function clearForm() {
    productNameInput.value = '',
        productPriceInput.value = '',
        productDescInput.value = '',
        productCategoryInput.value = '';
}


function display() {
    cartoona = ``;
    for (var i = 0; i < productContainer.length; i++) {

        cartoona += `
        <tr>
        <td>${i}</td>
        <td>${productContainer[i].productName}</td>
        <td>${productContainer[i].productPrice}</td>
        <td>${productContainer[i].productCatge}</td>
        <td>${productContainer[i].productDesc}</td>
        <td> <button class="btn btn-outline-warning " onclick='updateProduct(${i});'>update</button> </td>
        <td> <button class="btn btn-outline-danger" onclick="deleteProduct(${i});">delete</button> </td> 
        </tr>
        `;

    }
    document.getElementById('tableBody').innerHTML = cartoona;
}



function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem('myProduct', JSON.stringify(productContainer));
    display();

}


function updateProduct(index) {
    updateBtn.classList.replace("d-none", "d-inline-block");
    addBtn.classList.add("d-none");
    currentIndex = index;
    productNameInput.value = productContainer[index].productName,
        productPriceInput.value = productContainer[index].productPrice,
        productDescInput.value = productContainer[index].productDesc,
        productCategoryInput.value = productContainer[index].productCatge;

}

function addUpdatedProduct() {
    updateBtn.classList.replace("d-inline-block", "d-none");// hide update button
    addBtn.classList.remove("d-none"); // appear add button again

    productContainer[currentIndex].productName = productNameInput.value,
        productContainer[currentIndex].productPrice = productPriceInput.value,
        productContainer[currentIndex].productDesc = productDescInput.value,
        productContainer[currentIndex].productCatge = productCategoryInput.value;


    localStorage.setItem('myProduct', JSON.stringify(productContainer));
    display();

    clearForm();

}




function validateProductName() {
    var rejex = /^[a-zA-Z]{3,8}$/;
    if (rejex.test(productNameInput.value) == true) {
        invalidProductName.classList.replace("d-block", "d-none");
        emptyProductName.classList.replace("d-block", "d-none");


        return true;
    } else if (productNameInput.value == '') {

        emptyProductName.classList.replace("d-none", "d-block");
        invalidProductName.classList.replace("d-block", "d-none");

    }

    else {
        invalidProductName.classList.replace("d-none", "d-block");
        emptyProductName.classList.replace("d-block", "d-none");
        return false;
    }

}



function validateAddingButton(){
    if (productNameInput.value == ''){
        validateProductName();
    }else{
        addProduct();
    }
}






   












