const allProductsField = document.getElementById('all-products');
const singleProductField = document.getElementById('single-display')

// load all product function
const loadProducts = () =>
{
  singleProductField.textContent = '';
  fetch(`https://fakestoreapi.com/products`)
    .then((res) => res.json())
    .then((data) => showAllProducts(data));
};
loadProducts();

// show all product in UI 
const showAllProducts = (products) =>
{
  allProductsField.textContent = '';
  products.forEach(items =>
  {
    const { category, id, image, price, rating: { rate, count }, title } = items;
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
  <div id="single-product" class="card shadow p-2">
    <img src="${image}" id="product-image" class="card-img-top img-thumbnail" alt="...">
    <div class="card-body text-center">
      <h5 class="card-title">${title}</h5>
      <p class="card-text fw-bold">Category : ${category}</p>
      <p class="card-text">
      <small class="text-muted">Ratings : ${rate} out of 5</small>
      <br>
      <small class="text-muted">Customer review : ${count}</small>
      </p>
      <h2>Price: $ ${price}</h2>
    </div>
    <div class="mx-auto">
      <button onclick="addToCart(${price})" id="addToCart-btn" class="buy-now btn btn-secondary">add to cart</button>
      <button onclick="itemDetails(${id})" id="details-btn" class="btn btn-outline-secondary">Details</button>
    </div>
  </div>
  `;
    allProductsField.appendChild(div);
  });
};
// Loading spinner toggle
const setLoading = (state = false) =>
{
  const spinner = document.getElementById('loading-spinner');
  if (state === true) {
    spinner.style.display = 'block';
  }
  else {
    spinner.style.display = 'none';
  }
}

// OnClick products search implements
const searchData = () =>
{
  showAllProducts([])
  setLoading(true);
  fetch(`https://fakestoreapi.com/products`)
    .then((res) => res.json())
    .then((data) => searchResults(data));
}

const searchResults = (data) =>
{
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  searchField.value = '';
  const output = data.filter(dt => dt.title.toLowerCase().includes(searchText.toLowerCase()));
  showAllProducts(output);
  setLoading(false);
};

// update product count and my-cart price
let count = 0;
const addToCart = (price) =>
{
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// single product details onclick handler
const itemDetails = (id) =>
{
  allProductsField.textContent = '';
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(data => SingleProductDisplay(data));
}

// show single product UI
const SingleProductDisplay = (item) =>
{
  const { category, description, image, price, rating: { rate, count }, title } = item;
  const div = document.createElement('div');
  div.classList.add('col');
  div.innerHTML = `
  <div id="single-product" class="card shadow p-2">
    <img src="${image}" class="card-img-top img-thumbnail" alt="...">
    <div class="card-body text-center">
      <h5 class="card-title">${title}</h5>
      <p class="card-text fw-bold">Category : ${category}</p>
      <p class="card-text fw-light">${description}</p>
      <p class="card-text">
      <small class="text-muted">Ratings : ${rate} out of 5</small>
      <br>
      <small class="text-muted">Customer review : ${count}</small>
      </p>
      <h2>Price: $ ${price}</h2>
      <button onclick="addToCart(${price})" id="addToCart-btn" class="buy-now btn btn-secondary">add to cart</button>
    </div>
  </div>
  `;
  singleProductField.appendChild(div);
}

// get input value function
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
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) =>
{
  document.getElementById(id).innerText = value.toFixed(2);
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

// grandTotal update function
const updateTotal = () =>
{
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};