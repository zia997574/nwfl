window.addEventListener('scroll', function() {
  var header = document.getElementById('header');
  if (window.scrollY > 0) {
      header.style.top = '-70px'; /* Adjust based on the height of the header */
  } else {
      header.style.top = '0';
  }
});
// Sample product details
const product = {
  id: 1,
  name: 'Product Name'
};


function toggleDropdown(event) {
  event.preventDefault(); // Prevent the default behavior of the touch event
  var dropdown = document.getElementById("dropdown");
  dropdown.classList.toggle("active");
}
function increment() {
  var input = document.querySelector('.quantity-input');
  var value = parseInt(input.value, 10);
  input.value = value + 1;
}

function decrement() {
  var input = document.querySelector('.quantity-input');
  var value = parseInt(input.value, 10);
  if (value > 1) {
    input.value = value - 1;
  }
}

const cartIcon = document.getElementById('cart-icon');
const cartContent = document.getElementById('dropdown-cart');

// Toggle cart content visibility when cart icon is clicked
cartIcon.addEventListener('click', () => {
  cartContent.classList.toggle('active');
});

// Function to show cart content
function showCartContent() {
  cartContent.classList.add('active');
}
document.getElementById("close-cart").addEventListener("click", function() {
  document.getElementById("dropdown-cart").classList.remove("active");
});

function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("product-price")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    total += price;
  }
  document.getElementsByClassName("total-price")[0].innerText = "$" + total.toFixed(2);
}
// Array to store the products in the cart
var cartProducts = [];

// Get the add to cart buttons
var addToCartButtons = document.querySelectorAll(".add-to-cart-button");



// Function to update the cart content
function updateCart() {
var cartContent = document.querySelector(".cart-content");
cartContent.innerHTML = ""; // Clear the existing cart content

var total = 0;
cartProducts.forEach(function(product) {
  // Create a new cart item element
  var cartItem = document.createElement("div");
  cartItem.classList.add("cart-box");
  cartItem.innerHTML = `
    <img src="${product.image}" alt="" class="cart-img" />
    <div class="detail-box">
      <div class="product-title">${product.name}</div>
      <div class="product-price">${product.price}</div>
      <div>
        <!-- Remove item -->
        <i class="fas fa-trash-alt trash-icon"></i>
      </div>
    </div>
  `;
  cartContent.appendChild(cartItem);

  // Calculate the total price
  var price = parseFloat(product.price.replace("$", ""));
  total += price;
});

// Update the total price
document.querySelector(".total-price").innerText = "$" + total.toFixed(2);
}

// Function to remove a product from the cart
function removeFromCart(index) {
cartProducts.splice(index, 1); // Remove the product at the specified index
updateCart(); // Update the cart content
}

// Add click event listener to the cart content container for event delegation
document.querySelector(".cart-content").addEventListener("click", function(event) {
// Check if the clicked element is a trash icon
if (event.target.classList.contains("trash-icon")) {
  // Find the parent cart box and get its index
  var cartBox = event.target.closest(".cart-box");
  var index = Array.from(cartBox.parentNode.children).indexOf(cartBox);

  // Remove the product from the cart
  removeFromCart(index);
}
});



// Sample array of products in the cart
var cartProducts = [];

// Create a custom event for updating the cart count
var updateCartCountEvent = new Event('updateCartCount');

// Function to update the cart count
function updateCartCount() {
var cartCountElement = document.querySelector('.cart-count');
if (cartCountElement) {
  cartCountElement.textContent = cartProducts.length;
}
}

// Function to add a product to the cart
function addToCart(product) {
cartProducts.push(product); // Add the product to the cart
document.dispatchEvent(updateCartCountEvent); // Dispatch the custom event
}

// Function to remove a product from the cart
function removeFromCart(index) {
cartProducts.splice(index, 1); // Remove the product at the specified index
document.dispatchEvent(updateCartCountEvent); // Dispatch the custom event
}

// Event listener to update the cart count when the custom event is dispatched
document.addEventListener('updateCartCount', updateCartCount);


// Get the add to cart buttons
var addToCartButtons = document.querySelectorAll(".add-to-cart-button");

// Add click event listener to each button
addToCartButtons.forEach(function(button) {
button.addEventListener("click", function() {
  // Get the product details
  var productImage = this.parentElement.querySelector("img").src;
  var productName = this.parentElement.querySelector("span").innerText;
  var productPrice = this.parentElement.querySelector("h4").innerText;
  var productName = this.parentElement.querySelector("h5").innerText;


  // Add the product to the cartProducts array
  addToCart({
    image: productImage,
    name: productName,
    price: productPrice
  });

  // Update the cart content
  updateCart();
});
});

// Function to update the cart content
function updateCart() {
var cartContent = document.querySelector(".cart-content");
cartContent.innerHTML = ""; // Clear the existing cart content

var total = 0;
cartProducts.forEach(function(product) {
  // Create a new cart item element
  var cartItem = document.createElement("div");
  cartItem.classList.add("cart-box");
  cartItem.innerHTML = `
    <img src="${product.image}" alt="" class="cart-img" />
    <div class="detail-box">
      <div class="product-title">${product.name}</div>
      <div class="product-price">${product.price}</div>
      <div>
        <!-- Remove item -->
        <i class="fas fa-trash-alt trash-icon"></i>
      </div>
    </div>
  `;
  cartContent.appendChild(cartItem);

  // Calculate the total price
  var price = parseFloat(product.price.replace("$", ""));
  total += price;
});

// Update the total price
document.querySelector(".total-price").innerText = "$" + total.toFixed(2);
}

// Function to remove a product from the cart
function removeFromCart(index) {
cartProducts.splice(index, 1); // Remove the product at the specified index
updateCart(); // Update the cart content
}

// Add click event listener to the cart content container for event delegation
document.querySelector(".cart-content").addEventListener("click", function(event) {
// Check if the clicked element is a trash icon
if (event.target.classList.contains("trash-icon")) {
  // Find the parent cart box and get its index
  var cartBox = event.target.closest(".cart-box");
  var index = Array.from(cartBox.parentNode.children).indexOf(cartBox);

  // Remove the product from the cart
  removeFromCart(index);
}
});
// Function to remove a product from the cart
function removeFromCart(index) {
cartProducts.splice(index, 1); // Remove the product at the specified index
updateCart(); // Update the cart content
updateCartCount(); // Update the cart count
}

// Function to add a product to the cart and show the cart content
function addToCart(product) {
  cartProducts.push(product); // Add the product to the cart
  document.dispatchEvent(updateCartCountEvent); // Dispatch the custom event
  updateCart(); // Update the cart content
  showCartContent(); // Show the cart content
}





// Load cart data from local storage on page load
document.addEventListener('DOMContentLoaded', function() {
  var savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cartProducts = JSON.parse(savedCart);
    updateCart();
  }
});

// Function to add a product to the cart and save to local storage
function addToCart(product) {
  var quantity = 1; // Default quantity
  // Check if the product already exists in the cart
  var existingProduct = cartProducts.find(p => p.name === product.name);
  if (existingProduct) {
    // If the product exists, increase the quantity
    existingProduct.quantity++;
    quantity = existingProduct.quantity;
  } else {
    // If the product is new, add it to the cart with quantity 1
    product.quantity = 1;
    cartProducts.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cartProducts)); // Save cart to local storage
  document.dispatchEvent(updateCartCountEvent); // Dispatch the custom event
  updateCart(); // Update the cart content
  showCartContent(); // Show the cart content
}

// Function to remove a product from the cart and save to local storage
function removeFromCart(index) {
  cartProducts.splice(index, 1); // Remove the product at the specified index
  localStorage.setItem('cart', JSON.stringify(cartProducts)); // Save cart to local storage
  document.dispatchEvent(updateCartCountEvent); // Dispatch the custom event
  updateCart(); // Update the cart content
}
function incrementQuantity(index) {
  cartProducts[index].quantity++; // Increment the quantity of the product at the specified index
  updateCart(); // Update the cart content
}

function decrementQuantity(index) {
  if (cartProducts[index].quantity > 1) {
    cartProducts[index].quantity--; // Decrement the quantity of the product at the specified index
    updateCart(); // Update the cart content
  }
}

// Function to update the cart content
function updateCart() {
  var cartContent = document.querySelector(".cart-content");
  cartContent.innerHTML = ""; // Clear the existing cart content

  var total = 0;
  cartProducts.forEach(function(product, index) {
    // Create a new cart item element
    var cartItem = document.createElement("div");
    cartItem.classList.add("cart-box");
    cartItem.innerHTML = `
      <img src="${product.image}" alt="" class="cart-img" />
      <div class="detail-box">
        <div class="product-title">${product.name}</div>
        <div class="quantity-controls">
          <button class="quantity-decrement" onclick="decrementQuantity(${index})">-</button>
          <span class="quantity">${product.quantity}</span>
          <button class="quantity-increment" onclick="incrementQuantity(${index})">+</button>
        </div>
        <div class="product-price">${product.price}</div>
        <div>
          <!-- Remove item -->
          <i class="fas fa-trash-alt trash-icon" onclick="removeFromCart(${index})"></i>
        </div>
      </div>
    `;
    cartContent.appendChild(cartItem);

    // Calculate the total price
    var price = parseFloat(product.price.replace("$", ""));
    total += price * product.quantity;
  });

  // Update the total price
  document.querySelector(".total-price").innerText = "$" + total.toFixed(2);
}


