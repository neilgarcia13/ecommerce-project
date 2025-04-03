import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from "../../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  
  let cartSummaryHTML = '';

  //Looping thru items that are in the cart
  cart.forEach((cartItem) => {

    //Variable declaration

    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    //Days formatting using external library DayJS
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    //Displaying the generated HTML on the webpage using the DOM
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">

        <div class="delivery-date">
          Delivery date: ${dateString}
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
      
              ${deliveryOptionsHTML(matchingProduct, cartItem)}

            </div>
          </div>
        </div>

      </div>
    `

  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {

    let html = '';

    deliveryOptions.forEach((deliveryOption) => {

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.price === 0 ? 'FREE' : `₱${(deliveryOption.price).toFixed(2)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      //Displaying the generated HTML on the webpage using the DOM
      html += `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">

          <input type="radio"
            ${isChecked ? 'checked' : ''}  
          class="delivery-option-input" name="delivery-option-${matchingProduct.id}">

          <div class="delivery-option-details">
            <div class="delivery-option-date">
              ${dateString}
            </div>

            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>

          </div>
          
        </div>
      `
    });

    return html;

  }

  //Displaying the generated HTML on the webpage using the DOM
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  

  //Delete link function after clicking update link
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {

      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      //Calling these functions to refresh the HTML after saving changes 
      updateCartQuantity();
      renderPaymentSummary();
      
    });

  });

  function updateCartQuantity() {

    const cartQuantity = calculateCartQuantity();

    //Displaying of cart quantity in the checkout header
    document.querySelector('.js-return-to-home-link').innerHTML = `(${cartQuantity} items)`;

  }

  //Calling of this function to update cart quantity in the checkout header
  updateCartQuantity();


  //Update link function
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', (productId) => {

      productId = link.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');

    });

  });


  //Save link function after clicking update link
  document.querySelectorAll('.js-save-link')
    .forEach((link) => {

      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      
      // Click event
      link.addEventListener('click', () => {

        // The quantityInput variable is passed as an argument 
        // to give handleUpdateQuantity function to access it
        handleUpdateQuantity(productId, quantityInput);
        renderPaymentSummary();

      });
      
      // Keydown event
      quantityInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          handleUpdateQuantity(productId, quantityInput);
          renderPaymentSummary();
        }
      });

  });

  //Quick validation and to save new cart quantity in quantityInput 
  function handleUpdateQuantity(productId, quantityInput) {
    const newQuantity = Number(quantityInput.value);

    if (newQuantity <= 0 || newQuantity >= 1000) {

      alert('Quantity must be at least 1 and less than 1000 ');
      return; // early return

    } else if (newQuantity > 0 || newQuantity <= 999) {

      updateQuantity(productId, newQuantity);

      //Displaying the saved quantity on the webpage using the DOM
      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;

      //Displaying of cart quantity in the checkout header
      updateCartQuantity();

      //Removing of the save link and quantityInput after clicking save
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

    } else alert('Value must be numeric.');

  }

  //Looping of each radio button element (delivery option)
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {

      //Shorthand saving of datasets in a separate variables
      const {productId, deliveryOptionId} = element.dataset; 

      //Calling this function to update delivery option selected by the user
      updateDeliveryOption(productId, deliveryOptionId);

      //Calling these functions to refresh the HTML after saving changes
      renderOrderSummary();
      renderPaymentSummary();

    });

  });
}