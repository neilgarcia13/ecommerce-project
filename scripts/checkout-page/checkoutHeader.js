import { cart } from "../../data/cart.js";

//Function to display and update the cart quantity in the checkout header
export function renderCheckoutHeader() {

  //Looping to calculate cart quantity
  let cartQuantity = 0;

  cart.forEach((cartItem) => {

    cartQuantity += cartItem.quantity;

  });

  
  const checkoutHeaderHTML = `
    <nav>
      <div class="left-section">
        <a href="index.html" class="header-link">
          <img src="images/icons/shopsmart-logo.jpeg" width="64px">
          <p>ShopSmart</p>
        </a>
      </div>

      <div class="middle-section">

        <p>Checkout <a class="return-to-home-link js-return-to-home-link"
        href="index.html">(${cartQuantity} items)</a> </p>

      </div>

      <div class="right-section">

        <a href="index.html" class="header-link">
          <button class="view-products-button header-link">View Products</button>
        </a>

      </div>
    </nav>
  `;

  //Displaying the generated HTML on the webpage using the DOM
  document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;

}