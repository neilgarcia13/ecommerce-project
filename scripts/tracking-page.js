import { getOrder } from '../data/orders.js';
import { calculateCartQuantity } from "../data/cart.js";
import { getProduct } from '../data/products.js';
import { getDeliveryOption } from "../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function loadPage() {

  updateCartQuantity();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  let productDetails;

  order.products.forEach((details) => {

    if (details.productId === product.id) {

      productDetails = details;

    }

  });

  const today = dayjs();

  const deliveryOptionId = productDetails.deliveryOptionId;
  const deliveryOption = getDeliveryOption(deliveryOptionId);

  const orderTime = dayjs(order.orderTime);
  const deliveryDate = orderTime.add(deliveryOption.deliveryDays, 'days');
  
  console.log(today);
  
  const dateString = deliveryDate.format('dddd, MMMM D');
  
  const percentProgress = ((today - orderTime) / (deliveryDate - orderTime)) * 100;

  console.log(percentProgress);

  const trackingHTML = `

    <div class="delivery-date">
      ${percentProgress >= 100 ? 'Delivered' : 'Arriving'} on ${dateString}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">

      <div class="progress-label ${
        percentProgress < 50 ? 'current status' : ''
      }">
        Preparing
      </div>

      <div class="progress-label ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
      }">
        Shipped
      </div>

      <div class="progress-label ${
        (percentProgress >= 50 && percentProgress >= 100) ? 'current-status' : ''
      }">
        Delivered
      </div>

    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%"></div>
    </div>
  
  `;

  document.querySelector('.order-tracking').innerHTML = trackingHTML;

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