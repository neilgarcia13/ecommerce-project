// Generating HTML in the homepage

let productsHTML = '';

products.forEach((product) => {
  productsHTML+= `
    <div class="product-container">
      <div class="product-image-container">
        <img src="${product.image}" class="product-image">
      </div>

      <div class="product-name">${product.name}</div>

      <div class="product-price">₱${product.price}.00</div>

      <div class="product-rating-container">
        <img src="images/icons/star-icon.png" width="24px">
        <div class="product-rating-count">${product.rating}</div>
      </div>

      <div class="product-quantity-container">
        <select>
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

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png" width="24px">
        Added
      </div>

      <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
    </div>
  `;

});


//Displaying the generated HTML on the webpage using the DOM
document.querySelector('.js-products-grid').innerHTML = productsHTML;


//Add to cart button functionality
document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    
    const productId = button.dataset.productId;
    let matchingItem;

    //Checking if the added item is already in the cart
    cart.forEach((item) => {

      if (productId === item.productId) {
        matchingItem = item;
      }

    });

    if (matchingItem) {

      matchingItem.quantity++;

    } else {
      //Adding of items that are not in the cart
      cart.push({
        productId: productId,
        quantity: 1
      });

    }

    //Displaying the cart quantity in the homepage
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
   
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    
  });

});
