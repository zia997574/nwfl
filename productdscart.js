const items = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
    { id: 3, name: 'Item 3', price: 30 },
  ];
  
  const cart = [];
  
  function renderCart() {
    const itemsDiv = document.querySelector('.items');
    itemsDiv.innerHTML = '';
  
    cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';
      itemDiv.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
        <button class="remove" data-id="${item.id}">Remove</button>
      `;
      itemsDiv.appendChild(itemDiv);
    });
  
    const totalDiv = document.querySelector('.total');
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    totalDiv.textContent = `Total: $${total.toFixed(2)}`;
  }
  
  function addToCart(itemId) {
    const item = items.find(item => item.id == itemId);
    if (item) {
      cart.push(item);
      renderCart();
    }
  }
  
  function removeFromCart(itemId) {
    const index = cart.findIndex(item => item.id == itemId);
    if (index !== -1) {
      cart.splice(index, 1);
      renderCart();
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderCart();
  
    document.addEventListener('click', event => {
      if (event.target.classList.contains('add')) {
        const itemId = event.target.getAttribute('data-id');
        addToCart(itemId);
      } else if (event.target.classList.contains('remove')) {
        const itemId = event.target.getAttribute('data-id');
        removeFromCart(itemId);
      }
    });
  });
  