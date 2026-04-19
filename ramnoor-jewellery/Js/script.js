let allProducts = [];

fetch('data/products.json')
  .then(res => res.json())
  .then(data => {
    allProducts = data.items;
    displayProducts(allProducts);
  });

function displayProducts(products){
  let container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(product => {
    container.innerHTML += `
      <div class="product" data-category="${product.category}">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>

        <button onclick="addToCart(${product.id})">
          Add to Cart
        </button>

        <button onclick="orderNow('${product.name}', ${product.price})">
          Order Now
        </button>
      </div>
    `;
  });
}

function filterProducts(category){
  if(category === "all"){
    displayProducts(allProducts);
  } else {
    let filtered = allProducts.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

function addToCart(id){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = allProducts.find(p => p.id == id);

  let existing = cart.find(item => item.id == id);

  if(existing){
    existing.qty += 1;
  } else {
    cart.push({...product, qty:1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function orderNow(name, price){
  let number = "917082540526";

  let msg = `Hi, I want to order:
${name} - ₹${price}`;

  window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`);
}