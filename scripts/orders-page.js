import { getProduct, products } from "../data/products.js";
import { orders } from "../data/orders.js";
import { cart } from "../data/cart.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

function loadPage() {

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

      const productId = productDetails.productId;

      let product = getProduct(productId);

      productsListHTML += `
        
        <div class="product-image-container">
          <img src="${product.image}" class="product-image">
        </div>

        <div class="product-details">

          <div class="product-name">${product.name}</div>

          <div class="product-delivert-date">Arriving on: March 5</div>

          <div class="product-quantity">Quantity: ${productDetails.quantity}</div>

          <button class="buy-again-button">

            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy Again</span>

          </button>

        </div>

        <div class="product-actions">

          <a href="tracking-page.html">
            <button class="track-order-button">Track Order</button>
          </a>

        </div>
      `;
    });

    return productsListHTML;

  }

  document.querySelector('.orders-grid').innerHTML = ordersHTML;
  console.log(orders);

}

loadPage();