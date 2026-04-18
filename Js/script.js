fetch('/data/products')
  .then(res => res.json())
  .then(data => {
    let container = document.getElementById("products");

    data.forEach(product => {
      container.innerHTML += `
        <div class="product">
          <img src="${product.image}">
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <button onclick="orderWhatsApp('${product.name}', ${product.price})">
            Order on WhatsApp
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