// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}
// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}

// Cart Working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making Function
function ready() {
    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add To Cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Button Works
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);

    // // Get the "Buy Now" button
    // var buyButton = document.querySelector(".btn-buy");

    // // Check if the cart is empty
    // var cartItems = document.querySelectorAll(".cart-item");
    // if (cartItems.length === 0) {
    //     // If there are no items in the cart, hide the button
    //     buyButton.style.display = "none";
    // } else {
    //     // If there are items in the cart, show the button
    //     buyButton.style.display = "block";
    // }
}

// Buy Button
function buyButtonClicked() {
    var confirmationBox = document.createElement("div");
    confirmationBox.classList.add("confirmation-box");
    var confirmationBoxContent = `
                            <h3>Are you sure you want to place this order?</h3>
                            <div class="button-container">
                                <button class="confirm-btn">Yes</button>
                                <button class="cancel-btn">No</button>
                            </div>
                            `;
    confirmationBox.innerHTML = confirmationBoxContent;
    document.body.appendChild(confirmationBox);
    var confirmBtn = document.querySelector(".confirm-btn");
    var cancelBtn = document.querySelector(".cancel-btn");
    confirmBtn.addEventListener("click", function () {
        document.body.removeChild(confirmationBox);
        var successBox = document.createElement("div");
        successBox.classList.add("success-box");
        var successBoxContent = `
                                <p>Your order has been placed.</p>
                                <button class="close-btn">Close</button>
                                `;
        successBox.innerHTML = successBoxContent;
        document.body.appendChild(successBox);
        var closeBtn = document.querySelector(".close-btn");
        closeBtn.addEventListener("click", function () {
            document.body.removeChild(successBox);
            var cartContent = document.getElementsByClassName("cart-content")[0];
            while (cartContent.hasChildNodes()) {
                cartContent.removeChild(cartContent.firstChild);
            }
            updateTotal();
        });
    });
    cancelBtn.addEventListener("click", function () {
        document.body.removeChild(confirmationBox);
    });
}
// Remove Items from Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}
// Add To Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    var outOfStock = shopProducts.querySelector(".out-of-stock");

    if (outOfStock) {
        var outOfStockBox = document.createElement("div");
        outOfStockBox.classList.add("out-of-stock-box");
        var outOfStockContent = `
      <h3>Out of Stock</h3>
      <p>The item you are trying to add is currently out of stock.</p>
      <button class="close-btn">Close</button>
    `;
        outOfStockBox.innerHTML = outOfStockContent;
        document.body.appendChild(outOfStockBox);
        var closeBtn = document.querySelector(".close-btn");
        closeBtn.addEventListener("click", function () {
            document.body.removeChild(outOfStockBox);
        });
    } else {
        addProductToCart(title, price, productImg);
        updateTotal();
    }
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already added this item to cart");
            return;
        }
    }
    var cartBoxContent = `
                            <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!-- Remove Cart -->
                            <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);
}

// Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("Ksh. ", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity
    }
    // if price contains some cents value
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "Ksh. " + total;

    // Get the "Buy Now" button
    var buyButton = document.querySelector(".btn-buy");

    // Check if the cart is empty
    if (total === 0) {
        // If there are no items in the cart, hide the button
        buyButton.style.display = "none";
    } else {
        // If there are items in the cart, show the button
        buyButton.style.display = "block";
    }
}
updateTotal();

// Search Feature
const searchInput = document.querySelector('.search-input');
const productBoxes = document.querySelectorAll('.product-box');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    productBoxes.forEach(productBox => {
        const productTitle = productBox.querySelector('.product-title').textContent.toLowerCase();
        if (productTitle.includes(searchTerm)) {
            productBox.style.display = 'block';
        } else {
            productBox.style.display = 'none';
        }
    });
});