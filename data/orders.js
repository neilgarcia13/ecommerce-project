import { cart } from "./cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder() {

  let productPrice = 0;
  let shippingPrice = 0;

  let productId;
  let quantity;

  let today;
  let deliveryDate;
  let dateString;

  cart.forEach((cartItem) => {

    productId = cartItem.productId;
    quantity = cartItem.quantity;

    //Product price calculation
    const product = getProduct(productId);
    productPrice += product.price * quantity;

    //Shipping price calculation
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    shippingPrice += deliveryOption.price;

    //Days formatting using external library DayJS
    today = dayjs();
    deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    dateString = deliveryDate.format('MMMM D');
    
  });

  //Adding of product and shipping total to calculate order total
  const orderTotal = productPrice + shippingPrice;

  const orderId = Math.random().toString().substring(2);

  orders.unshift({
    orderId: orderId,
    orderTime: today,
    orderTotal: orderTotal,
    products: cart
  });

  saveToStorage();
  
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {

  let matchingOrder;

  orders.forEach((order) => {

    if(order.orderId === orderId) {

      matchingOrder = order;

    }

  });

  return matchingOrder;

}


