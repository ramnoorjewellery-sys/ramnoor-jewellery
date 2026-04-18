function placeOrder(){
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if(!name || !phone || !address){
    alert("Please fill all details");
    return;
  }

  let total = 0;
  let message = `🛍 *New Order*\n\n`;

  message += `👤 Name: ${name}\n`;
  message += `📞 Phone: ${phone}\n`;
  message += `📍 Address: ${address}\n\n`;

  message += `🧾 Order Details:\n`;

  cart.forEach(item => {
    total += item.price * item.qty;
    message += `- ${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
  });

  message += `\n💰 Total: ₹${total}`;

  let number = "917082540526";

  let url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');
}

localStorage.removeItem("cart");