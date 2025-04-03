import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

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

    <a href="orders-page.html">
      <button class="place-order-button button-primary">Place Order</button>
    </a>

  `;

  //Displaying the generated HTML on the webpage using the DOM
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

}