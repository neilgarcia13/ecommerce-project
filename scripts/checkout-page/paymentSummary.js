import { cart, calculateCartQuantity, removeAllItemsInCart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {

  let productPrice = 0;
  let shippingPrice = 0;

  cart.forEach((cartItem) => {

    //Product price calculation
    const product = getProduct(cartItem.productId);
    productPrice += product.price * cartItem.quantity;

    //Shipping price calculation
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPrice += deliveryOption.price;

  });

  //Adding of product and shipping total to calculate order total
  const orderTotal = productPrice + shippingPrice;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Payment Summary</div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">₱${productPrice.toFixed(2)}</div>
    </div>

    <div class="payment-summary-row shipping-cost">
      <div>Shipping & handling:</div> 
      <div class="payment-summary-money">₱${shippingPrice.toFixed(2)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">₱${orderTotal.toFixed(2)}</div>
    </div>

    <a>
      <button class="place-order-button button-primary js-place-order">Place Order</button>
    </a>

  `;

  //Displaying the generated HTML on the webpage using the DOM
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  let placeOrderBtn = document.querySelector('.js-place-order');

  if (orderTotal === 0) {

    placeOrderBtn.classList.add('button-disabled');

  } else {

      placeOrderBtn.addEventListener('click', () => {

      addOrder();
      removeAllItemsInCart();
      window.location.href = 'orders-page.html';
    
    });

  }

}
