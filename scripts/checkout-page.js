import { cart, removeFromCart } from "../data/cart.js";
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
    <div class="cart-item-container">

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
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>

            <span class="update-quantity-link link-primary">
              Update
            </span>

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

  });
  
})