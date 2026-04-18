fetch('data/products.json')
  .then(res => res.json())
  .then(data => {
    let container = document.getElementById("products");

    data.items.forEach(product => {
  container.innerHTML += `
    <div class="product" onclick="openProduct(${product.id})">
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>

      <button onclick="event.stopPropagation(); addToCart(${product.id})">
        Add to Cart
      </button>

      <button onclick="event.stopPropagation(); orderWhatsApp('${product.name}', ${product.price})">
        Order Now
      </button>
    </div>
  `;
});
  });

function orderWhatsApp(name, price) {
  let number = "917082540526";

  let message = `Hi, I want to order:
Product: ${name}
Price: ₹${price}`;

  let url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("active");
}

container.innerHTML += `
  <div class="product" onclick="goToProduct('${product.name}', ${product.price}, '${product.image}')">
    <img src="${product.image}">
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <button onclick="event.stopPropagation(); orderWhatsApp('${product.name}', ${product.price})">
      Order Now
    </button>
  </div>
`;
function goToProduct(name, price, image){
  window.location.href = `product.html?name=${name}&price=${price}&image=${image}`;
}

function searchProduct() {
  let input = document.getElementById("search").value.toLowerCase();
  let products = document.querySelectorAll(".product");

  products.forEach(p => {
    let name = p.innerText.toLowerCase();
    p.style.display = name.includes(input) ? "block" : "none";
  });
}

function filterProducts(category){
  let products = document.querySelectorAll(".product");

  products.forEach(p => {
    if(category === "all"){
      p.style.display = "block";
    } else {
      if(p.getAttribute("data-category") === category){
        p.style.display = "block";
      } else {
        p.style.display = "none";
      }
    }
  });
}

function openProduct(id){
  console.log("Opening product:", id); // DEBUG
  window.location.href = `product.html?id=${id}`;
}

document.addEventListener("mouseover", function(e){
  if(e.target.id === "main-img"){
    e.target.style.transform = "scale(1.1)";
    e.target.style.transition = "0.3s";
  }
});

document.addEventListener("mouseout", function(e){
  if(e.target.id === "main-img"){
    e.target.style.transform = "scale(1)";
  }
});

function addToCart(id){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  fetch('data/products.json')
    .then(res => res.json())
    .then(data => {
      let product = data.items.find(p => p.id == id);

      let existing = cart.find(item => item.id == id);

      if(existing){
        existing.qty += 1;
      } else {
        cart.push({...product, qty:1});
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Added to cart ✅");
    });
}

window.onload = () => {
  document.getElementById("loader").style.display = "none";
};

window.addEventListener("scroll", () => {
  document.querySelectorAll(".product").forEach(el => {
    let top = el.getBoundingClientRect().top;

    if(top < window.innerHeight - 50){
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});