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
}


//==============  HANDLE EVENT FUNCTION ==============//
function handle_removeCartItem(){
    this.parentElement.remove();

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

    totalElement.innerHTML = '$' + total.toFixed(2);
}