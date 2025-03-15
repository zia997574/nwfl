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
  
  function addToCart(product) {
    cartProducts.push(product); // Add the product to the cart
    document.dispatchEvent(updateCartCountEvent); // Dispatch the custom event
    updateCart(); // Update the cart content
}

  
  // Function to remove a product from the cart
  function removeFromCart(index) {
  cartProducts.splice(index, 1); // Remove the product at the specified index
  document.dispatchEvent(updateCartCountEvent); // Dispatch the custom event
  }
  
  // Event listener to update the cart count when the custom event is dispatched
  document.addEventListener('updateCartCount', updateCartCount);
  
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
  
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
  
    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            // Get the product details
            var productImage = this.parentElement.querySelector("img").src;
            var productName = this.parentElement.querySelector("h5").innerText;
            var productPrice = this.parentElement.querySelector(".price").innerText;
  
            // Add the product to the cartProducts array
            addToCart({
                image: productImage,
                name: productName,
                price: productPrice
            });
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
  

  document.addEventListener('DOMContentLoaded', () => {
    // Select all .color-name elements
    const colorNameDivs = document.querySelectorAll('.color-name');
  
    // Loop through each .color-name element
    colorNameDivs.forEach(colorNameDiv => {
      // Find the corresponding .color-selector element
      const colorSelectorDiv = colorNameDiv.nextElementSibling;
  
      if (colorSelectorDiv && colorSelectorDiv.classList.contains('color-selector')) {
        // Add click event listener to toggle visibility
        colorNameDiv.addEventListener('click', () => {
          colorSelectorDiv.classList.toggle('visible');
        });
      }
    });
  });
  
  
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed'); // Check if the DOM is fully loaded
  
    const phoneSizeSelector = document.getElementById('phoneSizeSelector');
    const priceElement = document.getElementById('price');
  
    if (phoneSizeSelector) {
        console.log('Phone size selector found');
        phoneSizeSelector.addEventListener('change', function() {
            const selectedPrice = phoneSizeSelector.value;
            console.log(`Selected Price: $${selectedPrice}`); // Debug log
            priceElement.textContent = `$${selectedPrice}`;
            console.log(`Price updated to: ${priceElement.textContent}`); // Verify the price update
        });
    } else {
        console.log('Phone size selector not found');
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
  
    const phoneSizeSelectors = document.querySelectorAll('.phoneSizeSelector');
  
    phoneSizeSelectors.forEach(function(phoneSizeSelector, index) {
        phoneSizeSelector.addEventListener('change', function() {
            const selectedPrice = this.value;
            const priceElement = this.parentElement.querySelector('.price');
            console.log(`Selected Price: $${selectedPrice}`);
            priceElement.textContent = `$${selectedPrice}`;
            console.log(`Price updated to: ${priceElement.textContent}`);
        });
    });
  });
  
  document.querySelectorAll('.pro').forEach(product => {
    const sizeSelector = product.querySelector('.phoneSizeSelector');
    const colorOptions = product.querySelectorAll('.color-option');
    const productImage = product.querySelector('.productImage');
    const productTitle = product.querySelector('.productTitle');
    const productPrice = product.querySelector('.price');
    const colorName = product.querySelector('.color-name');

    sizeSelector.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const newPrice = selectedOption.value;
        const newImage = selectedOption.getAttribute('data-img');
        const newTitle = selectedOption.getAttribute('data-title');
        const newColor = selectedOption.getAttribute('data-color');

        productPrice.textContent = `$${newPrice}`;
        productImage.src = newImage;
        productTitle.textContent = newTitle;

        // Update the color selector based on the selected size
        colorOptions.forEach(option => {
            if (option.getAttribute('data-color-name') === newColor) {
                option.classList.add('selected');
                colorName.textContent = newColor;
            } else {
                option.classList.remove('selected');
            }
        });
    });

    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove 'selected' class from all options
            colorOptions.forEach(opt => opt.classList.remove('selected'));

            // Add 'selected' class to the clicked option
            this.classList.add('selected');

            // Update image and color name
            const newImage = this.getAttribute('data-img');
            const colorNameValue = this.getAttribute('data-color-name');

            productImage.src = newImage;
            colorName.textContent = colorNameValue;
        });
    });
});


let slideIndex = 0;
showSlides();

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n - 1);
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "grid";
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 5000); // Change image every 3 seconds
}

window.onload = function() {
  const banner = document.getElementById('banner-notification');
  const closeBtn = document.getElementById('close-btn');
  const subscribeBtn = document.getElementById('subscribe-btn');

  // Show the banner on page load
  banner.classList.remove('hidden');

  // Function to hide the banner
  function hideBanner() {
    banner.classList.add('hidden');
  }

  // Close the banner when the close button is clicked
  closeBtn.addEventListener('click', hideBanner);

  // Close the banner when the subscribe button is clicked
  subscribeBtn.addEventListener('click', hideBanner);
};

// Function to close all dropdowns
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown').forEach(function(dropdown) {
      dropdown.style.display = 'none'; // Hide all dropdowns
  });
}

// Add event listeners to each "Products" link
document.querySelectorAll('.toggle-dropdown').forEach(function(toggle) {
  toggle.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default link behavior

      // Get the associated dropdown for this toggle
      const dropdown = this.nextElementSibling;

      // Check if the clicked dropdown is already open
      const isDropdownOpen = dropdown.style.display === 'block';

      // Close all dropdowns first
      closeAllDropdowns();

      // If the clicked dropdown was not open, open it
      if (!isDropdownOpen) {
          dropdown.style.display = 'block'; // Show the current dropdown
      }
  });
});

