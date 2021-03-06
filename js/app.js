
//fetch api from FakeStoreAPI 
const loadProducts = () => {

 const url = `https://fakestoreapi.com/products`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayProducts(data));
};

loadProducts();
// show all product in UI 
const displayProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    //get image
    const images = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product shadow-lg mt-5">
      <div>
    <img class="product-image" src=${images}></img>
      </div>
      <h3 class="title-color">${(product.title).slice(0,15)}</h3>
      <p>Category: ${product.category}</p>
      <p><i class="fas fa-user-alt"></i><span class="rating">Total ratings:${product.rating.count} persons</span></p>
       <p class="rating"><i class="fas fa-star icon"></i>Rating:${product.rating.rate}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now  btn-add-cart"><i class="fas fa-cart-plus"></i> add to cart</button>
      <button id="details-btn" class=" btn-details">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total =parseFloat((convertedOldPrice + convertPrice).toFixed(2));
  
  //
  document.getElementById(id).innerText =(total);
};

// set innerText function
const setInnerText = (id, value) => {
  
  document.getElementById(id).innerText =parseFloat(value.toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  //grandTotal update function call
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =parseFloat((
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax")).toFixed(2));
  document.getElementById("total").innerText = grandTotal;
};

