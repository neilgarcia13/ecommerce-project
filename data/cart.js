export const cart = [{
  productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  quantity: 2,
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 2
}];

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