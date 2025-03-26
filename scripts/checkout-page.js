import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

let cartSummaryHTML = '';

cart.forEach((cartItem) => {

  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {

    if(product.id === productId) {

      matchingProduct = product;
    }

  });

  console.log(matchingProduct);


  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">

      <div class="delivery-date">
        Delivery date: Tuesday, March 11
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">

          <div class="product-name">
            ${matchingProduct.name}
          </div>

          <div class="product-price">
            ₱${(matchingProduct.price).toFixed(2)}
          </div>

          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>

            <span class="update-quantity-link js-update-link link-primary" data-product-id="${matchingProduct.id}">
              Update
            </span>

            <input class="quantity-input js-quantity-input-${matchingProduct.id}">

            <span class="save-quantity-link js-save-link link-primary" data-product-id="${matchingProduct.id}">Save</span>

            <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${matchingProduct.id}">
              Delete
            </span>

          </div>

        </div>

        <div class="delivery-options">

          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          <div class="delivery-option">

            <input type="radio" checked 
            class="delivery-option-input" name="delivery-option-${matchingProduct.id}">

            <div class="delivery-option-details">
              <div class="delivery-option-date">
                Tuesday, March 11
              </div>

              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
            
          </div>

          <div class="delivery-option">

            <input type="radio" checked 
            class="delivery-option-input" name="delivery-option-${matchingProduct.id}">

            <div class="delivery-option-details">
              <div class="delivery-option-date">
                Wednesday, March 5
              </div>

              <div class="delivery-option-price">
                ₱49.00 - Shipping
              </div>

            </div>
            
          </div>

          <div class="delivery-option">

            <input type="radio" checked 
            class="delivery-option-input" name="delivery-option-${matchingProduct.id}">

            <div class="delivery-option-details">
              <div class="delivery-option-date">
                Monday, March 3
              </div>

              <div class="delivery-option-price">
                ₱99.00 - Shipping
              </div>

            </div>
            
          </div>
        </div>
      </div>

    </div>
  `

});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {

    const productId = link.dataset.productId;
    removeFromCart(productId);
    console.log(cart);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();

    updateCartQuantity();

  });

});

function updateCartQuantity() {

  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-return-to-home-link').innerHTML = `(${cartQuantity} items)`;

}

updateCartQuantity();

document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', (productId) => {

    productId = link.dataset.productId;

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');

  });

});

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    const productId = link.dataset.productId;
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    
    // Click event
    link.addEventListener('click', () => {
      // The quantityInput variable is passed as an argument 
      // to give handleUpdateQuantity function to access it
      handleUpdateQuantity(productId, quantityInput);
    });
    
    // Keydown event
    quantityInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handleUpdateQuantity(productId, quantityInput);
      }
    });
});
  
function handleUpdateQuantity(productId, quantityInput) {
  const newQuantity = Number(quantityInput.value);

  if (newQuantity <= 0 || newQuantity >= 1000) {

    alert('Quantity must be at least 1 and less than 1000 ');
    return; // early return

  } else if (newQuantity > 0 || newQuantity <= 999) {

    updateQuantity(productId, newQuantity);

    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    quantityLabel.innerHTML = newQuantity;

    updateCartQuantity();

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');

  } else alert('Value must be numeric.');

}

