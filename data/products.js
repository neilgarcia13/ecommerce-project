//Function to get put the product inside the cart
export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {

    //Checking if the added item is already in the cart
    if(product.id === productId) {

      matchingProduct = product;
    }

  });

  return matchingProduct;
  
}

class Product {
  id;
  image;
  name;
  price;
  rating;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.price = productDetails.price;
    this.rating = productDetails.rating;
  }

  extraInfoHTML() {
    return '';
  };

}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `
      <a href="${this.sizeChartLink}" class="size-chart-link" target="_blank">Size Chart</a>
    `;
  }

}

class Footwear extends Product {
  footwearSizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.footwearSizeChartLink = productDetails.footwearSizeChartLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `
      <a href="${this.footwearSizeChartLink}" class="size-chart-link" target="_blank">Size Chart</a>
    `;
  }

}

class Appliance extends Product {
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `
      <a href="${this.warrantyLink}" class="warranty-link" target="_blank">See Warranty</a>
    `;
  }
}

export const products = [{
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  image: 'images/products/gel-ink-pens.jpg',
  name: '8 pcs. High Quality Gel Ink Pens',
  price: 79,
  rating: 4.8
}, {
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  image: 'images/products/navy-shirt.jpg',
  name: 'Navy Cotton Crew Neck Shirt',
  price: 149,
  rating: 4.9,
  type: "clothing",
  sizeChartLink: "images/products/clothing-size-chart.png"
}, {
  id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  image: 'images/products/new-balance-shoes.jpg',
  name: 'New Balance Men’s Shoes',
  price: 3499,
  rating: 5,
  type: "footwear",
  footwearSizeChartLink: "images/products/footwear-size-chart.jpg"
}, {
  id: "54e0eccd-8f36-462b-b68a-8182611d9add",
  image: 'images/products/tactical-shorts.jpg',
  name: 'High Quality Men’s Tactical Shorts',
  price: 399,
  rating: 4.7,
}, {
  id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
  image: 'images/products/cleaning-cloth.jpg',
  name: 'Black Microfiber Cleaning Cloth 13"x13"',
  price: 199,
  rating: 4.8
}, {
  id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
  image: 'images/products/mech-keyboard.jpg',
  name: 'MageGee Portable 60% Mechanical Gaming Keyboard',
  price: 3999,
  rating: 4.9,
  type: "appliance",
  warrantyLink: "images/products/appliance-warranty.png"
}, {
  id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
  image: 'images/products/unisex-crocs.jpg',
  name: 'Crocs Unisex-Adult Classic Realtree Clog',
  price: 4499,
  rating: 5,
  type: "footwear",
  footwearSizeChartLink: "images/products/footwear-size-chart.jpg"
}, {
  id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
  image: 'images/products/yankees-cap.jpg',
  name: '47 Brand MLB New York Yankees Cap',
  price: 2499,
  rating: 5
}, {
  id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
  image: 'images/products/digital-camera.jpg',
  name: 'KODAK PIXPRO FZ55-BK 16MP CMOS Sensor Digital Camera',
  price: 12899,
  rating: 4.9,
  type: "appliance",
  warrantyLink: "images/products/appliance-warranty.png"
}, {
  id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
  image: 'images/products/iron-and-steamer.jpg',
  name: 'BLACK+DECKER Press & Steam 2-in-1 Iron and Steamer',
  price: 4899,
  rating: 4.8,
  type: "appliance",
  warrantyLink: "images/products/appliance-warranty.png"
}, {
  id: "5968897c-4d27-4872-89f6-5bcb052746d7",
  image: 'images/products/travel-backpack.jpg',
  name: 'Travel Backpack, 50L Extra Large Travel Laptop Backpack',
  price: 3799,
  rating: 4.7
}, {
  id: "aad29d11-ea98-41ee-9285-b916638cac4a",
  image: 'images/products/water-bottle.jpg',
  name: 'Owala FreeSip Insulated Stainless Steel Water Bottle',
  price: 1799,
  rating: 5
}, {
  id: "04701903-bc79-49c6-bc11-1af7e3651358",
  image: 'images/products/batman-action-figure.jpg',
  name: 'DC Comics, 12-inch Batman Action Figure',
  price: 1499,
  rating: 4.6
}, {
  id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
  image: 'images/products/headphones.jpg',
  name: 'Soundcore Anker Life Q20 Hybrid Active Noise Cancelling Headphones',
  price: 3499,
  rating: 4.9,
  type: "appliance",
  warrantyLink: "images/products/appliance-warranty.png"
}, {
  id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
  image: 'images/products/rocking-horse.jpg',
  name: 'Red Wooden Rocking Horse Funny for Toddlers',
  price: 899,
  rating: 4.7
}, {
  id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
  image: 'images/products/smart-watch.jpg',
  name: 'Smart Watch for Women Android & iPhone',
  price: 4999,
  rating: 5,
  type: "appliance",
  warrantyLink: "images/products/appliance-warranty.png"
}].map((productDetails) => {

  if (productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  }

  else if (productDetails.type === 'footwear') {
    return new Footwear(productDetails);
  }

  else if (productDetails.type === 'appliance') {
    return new Appliance(productDetails);
  }

  return new Product(productDetails);

});