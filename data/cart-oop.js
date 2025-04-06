const cart = {

  cartItems: undefined,

  loadFromStorage() {

    this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));

    //Default objects if cart is empty
    if (!this.cartItems) {

      this.cartItems = [{
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2,
        deliveryOptionId: '2'
      }];
      
    }
  },

  //Local storage saving function
  saveToStorage() {
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
  },

  addToCart(productId) {

    let matchingItem;
  
    //Checking if the added item is already in the cart
    this.cartItems.forEach((cartItem) => {
  
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
  
    });
  
    //Quantity Selector functionality
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
  
    if (matchingItem) {
  
      matchingItem.quantity+= quantity;
  
    } else {
      //Adding of items that are not in the cart
      this.cartItems.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
      });
  
    }
  
    //Calling this function to save data in local storage
    this.saveToStorage();
  
  },

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
  
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
  
    });
   
    this.cartItems = newCart;
  
    //Calling this function to save data in local storage
    this.saveToStorage();
  
  },

  calculateCartQuantity() {
  
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  },

  //Function updating the quantity of the same item in the cart
  updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.quantity = newQuantity;

    //Calling this function to save data in local storage
    this.saveToStorage();

  },

  updateDeliveryOption(productId, deliveryOptionId) {

    let matchingItem;
  
    //Checking if the added item is already in the cart
    this.cartItems.forEach((cartItem) => {
  
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
  
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    //Calling this function to save data in local storage
    this.saveToStorage();
  
  }
  
};

cart.loadFromStorage();


