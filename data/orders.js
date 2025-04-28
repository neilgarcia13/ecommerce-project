import { cart } from "./cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export let orders = JSON.parse(localStorage.getItem('orders'));

if (!orders) {

  orders = [{

    orderId: "75725d25-c60b-6e35-cc1d-5ce4c786931b",
    orderTotal: 3548,
    products: 
    [
      {
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 1,
      }
    ]
  
  }];

}
 

export function addOrder() {

  let productPrice = 0;
  let shippingPrice = 0;

    cart.forEach((cartItem) => {

      const productId = cartItem.productId;

      //Product price calculation
      const product = getProduct(productId);
      productPrice += product.price * cartItem.quantity;

      //Shipping price calculation
      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = getDeliveryOption(deliveryOptionId);
      shippingPrice += deliveryOption.price;

    });

    //Adding of product and shipping total to calculate order total
    const orderTotal = productPrice + shippingPrice;
  
  orders.unshift({
    orderId: "75725d25-c60b-6e35-cc1d-5ce4c786931b",
    orderTotal: orderTotal,
    products: cart
    
  });

  saveToStorage();
  
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

