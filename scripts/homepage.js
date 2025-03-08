
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

      <button class="add-to-cart-button">Add to Cart</button>
    </div>
  `;

});

document.querySelector('.js-products-grid').innerHTML = productsHTML;
