let cart = JSON.parse(localStorage.getItem("cart")) || [];
let container = document.getElementById("cart-items");
let total = 0;

function renderCart(){
  container.innerHTML = "";
  total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div style="display:flex;justify-content:space-between;padding:10px 50px">
        <div>
          <h3>${item.name}</h3>
          <p>₹${item.price} x ${item.qty}</p>
        </div>

        <div>
          <button onclick="changeQty(${index}, 1)">+</button>
          <button onclick="changeQty(${index}, -1)">-</button>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function changeQty(index, change){
  cart[index].qty += change;

  if(cart[index].qty <= 0){
    cart.splice(index,1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function orderAll(){
  let number = "917082540526";

  let message = "Hi, I want to order:\n";

  cart.forEach(item => {
    message += `${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
  });

  message += `Total: ₹${total}`;

  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`);
}

renderCart();