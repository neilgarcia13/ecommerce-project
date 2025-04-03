//Delivery options object
export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  price: 0 
}, {
  id: '2',
  deliveryDays: 3,
  price: 49
}, {
  id: '3',
  deliveryDays: 1,
  price: 99
}];

//Function to save delivery option selected
export function getDeliveryOption(deliveryOptionId) {

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    } 
    
  });

  // Returning the value of deliveryOption selected
  // if not selected, give the first element value in
  // the array as default
  return deliveryOption || deliveryOptions[0];

}