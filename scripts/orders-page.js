import { getProduct } from "../data/products.js";
import { orders } from "../data/orders.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
import { calculateCartQuantity, addSingleItemInCart } from "../data/cart.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

function loadPage() {

  updateCartQuantity();

  let ordersHTML = '';

  orders.forEach((order) => {

    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    ordersHTML += `
      <div class="order-container">

        <div class="order-header">

          <div class="order-header-left-section">

            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>

            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>₱${(order.orderTotal).toFixed(2)}</div>
            </div>

          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.orderId}</div>
          </div>

        </div>

        <div class="order-details-grid">

          ${productsListHTML(order)}

        </div>

      </div>
    `;
    
  });

  function productsListHTML(order) {

    let productsListHTML = '';

    order.products.forEach((productDetails) => {

      const today = dayjs();

      const product = getProduct(productDetails.productId);
      const orderTime = dayjs(order.orderTime);
      
      const deliveryOptionId = productDetails.deliveryOptionId;
      const deliveryOption = getDeliveryOption(deliveryOptionId);

      const deliveryDate = orderTime.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('MMMM D');

      const percentProgress = ((today - orderTime) / (deliveryDate - orderTime)) * 100;

      productsListHTML += `
        
        <div class="product-image-container">
          <img src="${product.image}" class="product-image">
        </div>

        <div class="product-details">

          <div class="product-name">${product.name}</div>

          <div class="product-delivery-date">${percentProgress >= 100 ? 'Delivered' : 'Arriving'} on: ${dateString}</div>

          <div class="product-quantity">Quantity: ${productDetails.quantity}</div>

          <button class="buy-again-button js-buy-again-button" data-product-id="${product.id}">

            <img class="buy-again-icon" src="../images/icons/buy-again.png">
            <span class="buy-again-message">Buy Again</span>
            
          </button>

        </div>

        <div class="product-actions">

          <a href="tracking-page.html?orderId=${order.orderId}&productId=${product.id}">
            <button class="track-order-button">Track Order</button>
          </a>

        </div>
      `;
    });

    return productsListHTML;

  }

  document.querySelector('.orders-grid').innerHTML = ordersHTML;
  
  const head = Date.now().toString(36);
  const tail = Math.random().toString().substring(2);

  console.log(tail);
  console.log(orders);


  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      
      addSingleItemInCart(button.dataset.productId);

      updateCartQuantity();

      button.innerHTML = `

        <img class="buy-again-icon" src="images/icons/checkmark.png">
        <span class="buy-again-message">Added</span>
    
      `;

      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy Again</span>
        `;
      }, 1000);
  
    });
  
  });

  document.querySelector('.js-search-button').addEventListener('click', () => {

    searchProductName();

  });

  document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
      
      searchProductName();

    }
  
  });
  

}

function updateCartQuantity() {

  const cartQuantity = calculateCartQuantity();

  //Displaying of cart quantity in the cart icon
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

}

function searchProductName() {

  const search = document.querySelector('.js-search-bar').value;  
  window.location.href = `index.html?search=${search}`;

}

loadPage();