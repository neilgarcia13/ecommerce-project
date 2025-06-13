import { addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

// Generating HTML in the homepage
let productsHTML = '';

const url = new URLSearchParams(location.search)
const search = url.get('search');

let filteredProducts = products;

// If a search exists in the URL parameters,
// filter the products that match the search.
if (search) {

  filteredProducts = products.filter((product) => {

    return product.name.toLowerCase().includes(search.toLowerCase());

  });
}

filteredProducts.forEach((product) => {

  productsHTML+= `
    <div class="product-container">
      <div class="product-image-container">
        <img src="${product.image}" class="product-image">
      </div>

      <div class="product-name">${product.name}</div>

      <div class="product-price">₱${(product.price).toFixed(2)}</div>

      <div class="product-rating-container">
        <img src="images/icons/star-icon.png" width="24px">
        <div class="product-rating-count">${product.rating}</div>
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png" width="24px">
        Added
      </div>

      <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
    </div>
  `;

});


//Displaying the generated HTML on the webpage using the DOM
document.querySelector('.js-products-grid').innerHTML = productsHTML;


export function updateCartQuantity() {

  const cartQuantity = calculateCartQuantity();

  //Displaying of cart quantity in the cart icon
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

}


//Add to cart button functionality
document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    
    const productId = button.dataset.productId;

    //Calling to run addToCart function in cart.js
    addToCart(productId);

    updateCartQuantity(productId);

    //Show added message
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMessage.classList.add('added-to-cart-visible');
    
    setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);

  });

  document.querySelector('.js-search-button').addEventListener('click', () => {

    searchProductName();

  });

  document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
      
      searchProductName();

    }
  
  });


});

function searchProductName() {

  const search = document.querySelector('.js-search-bar').value;  
  window.location.href = `homepage.html?search=${search}`;

}

//Calling of this function to update cart quantity after user click add to cart
updateCartQuantity();

