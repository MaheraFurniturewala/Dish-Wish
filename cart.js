let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Pizza',
        tag: 'pizza',
        price: 500,
        inCart: 0
    },
    {
        name: 'Pasta',
        tag: 'pasta',
        price: 400,
        inCart: 0
    },
    {
        name: 'Nachos',
        tag: 'nachos',
        price: 300,
        inCart: 0
    },
    {
        name: 'Fries',
        tag: 'fries',
        price: 200,
        inCart: 0
    },
    {
        name: 'Burger',
        tag: 'burger',
        price: 500,
        inCart: 0
    },

]
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart-button span').textContent = productNumbers;
    }
}
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {

        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-button span').textContent = productNumbers + 1;
    }
    else {

        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-button span').textContent = 1;

    }
    setItems(product)


}
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {

        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product){
    let cartCost=localStorage.getItem('totalCost');
    if(cartCost!=null){
        cartCost=parseInt(cartCost);
localStorage.setItem("totalCost",cartCost+product.price);
    }else{

        localStorage.setItem("totalCost",product.price);
    }

}
function displayCart(){
let cartItems=localStorage.getItem("productsInCart")
cartItems=JSON.parse(cartItems);
let productContainer=document.querySelector("tbody");

if(cartItems && productContainer){
    
    productContainer.innerHTML='';
    Object.values(cartItems).map(item=>{
        productContainer.innerHTML+=`
        <tr><td>
        <i class="fa fa-times"></i>
        <img src="${item.tag}.jpg"></img>
        <span>${item.name}</span>
        </td>
        <td>${item.price}
        </td>
        <td>
        <i class="fa fa-plus"></i>
        <span>${item.inCart}</span>
        <i class="fa fa-minus"></i>
        </td>
        <td>
        ${item.inCart*item.price}</td>
        `; 
    });
   

}
}
onLoadCartNumbers();
displayCart()