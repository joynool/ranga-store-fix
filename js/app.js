const loadProducts = () =>
{
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) =>
{
  products.forEach(items =>
  {
    const { category, description, id, image, price, rating: { rate, count }, title } = items;
    console.log(image)
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div id="single-product" class="card shadow p-2">
      <img src="${image}" id="product-image" class="card-img-top img-thumbnail" alt="...">
      <div class="card-body text-center">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">Category: ${category}</p>
        <p class="card-text">
        <small class="text-muted">Ratings : ${rate} out of 5</small>
        <br>
        <small class="text-muted">Customer review : ${count}</small>
        </p>
        <h2>Price: $ ${price}</h2>
      </div>
      <div class="mx-auto">
        <button onclick="addToCart(${id},${price})" id="addToCart-btn" class="buy-now btn btn-secondary">add to cart</button>
        <button id="details-btn" class="btn btn-outline-secondary">Details</button>
      </div>
    </div>
    `;
    document.getElementById("all-products").appendChild(div);
  })
};
let count = 0;
const addToCart = (id, price) =>
{
  count = count + 1;
  updatePrice(id, price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) =>
{
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) =>
{
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.round(total);
};

// set innerText function
const setInnerText = (id, value) =>
{
  let sum = value.toFixed(2);
  sum = parseFloat(sum);
  document.getElementById(id).innerText = sum;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () =>
{
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
};

//grandTotal update function
const updateTotal = () =>
{
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
