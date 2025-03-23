export const cart = [];

export function addToCart(productId) {
  let matchingItem;

  //Checking if the added item is already in the cart
  cart.forEach((cartItem) => {

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
    cart.push({
      productId: productId,
      quantity: quantity,
    });

  }
}