// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
});
//Start when the document is ready
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', start);
}else{
    start();
}

// =========== START =========== //
function start(){
    addEvents();

}
// =========== UPDATE & RERENDER =========== //
function update(){
    addEvents();
    updateTotal();
}

// =========== ADD EVENTS =========== //
function addEvents(){
    // Remove items from cart
    let cartRemove_btn = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btn);
    cartRemove_btn.forEach((btn) => {
        btn.addEventListener('click', handle_removeCartItem);
    });

    // Change quantity of items in cart
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach((input) => {
        input.addEventListener('change', handle_changeItemQuantity);
    });

    // Add items to cart
    let addCart_btns = document.querySelectorAll('.add-cart');
    addCart_btns.forEach((btn) => {
        btn.addEventListener('click', handle_addCartItem);
    });
    const buy_btn = document.querySelector('.btn-buy');
    buy_btn.addEventListener('click', handle_buyOrder);

}

// =========== HANDLE EVENTS =========== //


function handle_buyOrder(){
    if(itemsAdded.length <= 0) {
        alert('Your Cart is Empty! Add some products first.');
        return;
    }
    const cartContent = cart.querySelector('.cart-content');
    cartContent.innerHTML = '';
    alert('Your Order is Placed Successfully :)');
    itemsAdded = []; // Clear the cart items after purchase

    update();
}

//==============  HANDLE EVENT FUNCTION ==============//
let itemsAdded = [];
function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector('.product-title').innerText;
    let price = product.querySelector('.product-price').innerHTML;
    let imgSrc = product.querySelector('.product-img').src;

    let newToAdd = {
        title,
        price ,
        imgSrc ,
    };

    // handle item already in cart
    if(itemsAdded.find(el => el.title === newToAdd.title)){
        alert('This item is already in your cart!');
        return;
    }else{
        itemsAdded.push(newToAdd);
    }

    // Add product to cart
    let cartBoxElement = CartBoxComponent(title,price,imgSrc);
    let newNode = document.createElement('div');
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector('.cart-content');
    cartContent.appendChild(newNode);
    update();
}
function handle_removeCartItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        (el) => 
            el.title !== 
        this.parentElement.querySelector('.cart-product-title').innerHTML);
    update();
}

function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value <= 0){
        this.value = 1; // Reset to 1 if invalid input
    }
    this.value = Math.floor(this.value); // Ensure quantity is an integer
    update();
}
// ============== UPDATE & RERENDER FUNCTION ==============//
function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = document.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = cartBox.querySelector('.cart-quantity').value;
        total += price * quantity;
    });

    // keep 2 diggital

    totalElement.innerHTML = '$' + total.toFixed(2);
}


// ============== HTML COMPONENT ==============//

function CartBoxComponent(title,price,imgSrc){
    return `
        <div class="cart-box">
            <img src=${imgSrc} alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <!-- REMOVE CART -->
            <i class='bx bxs-trash-alt cart-remove'></i>
        </div>
    `;}