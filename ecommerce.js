
//cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classlist.add("active");
};

cartIcon.onclick = () => {
    cart.classlist.remove("active");
};

//cart Working JS

if (document.readState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}

else {
    (ready);
}

//Making function

function ready () {
    //Remove from items cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons)

    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem)
    }

    //Add to cart

    var addCart = document.getElementsByClassName("add-cart");

    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }


    //quantity changes
    var quantityInput = document.getElementsByClassName("cart-quantity")

    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener("change", quantityChanged);
    }

    //Buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

//Buy button
function buyButtonClicked () {
    alert("Your order is placed")
    var cartContent =  document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}


//Remove items from cart

function removeCartItem (event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//quantity changed

function quantityChanged (event) {
    var input = event.target;
    
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }

    updateTotal();
}

//Add to cart

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;

    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart (title, price, productImg) {
    var cartShopBox =  document.createElement("div");
    cartShopBox.classList.add("cart-box");

    var cartItems =  document.getElementsByClassName("cart-content");
    var cartItemsName = cartItems.getElementsByClassName("cart-product-title");

    for (var i = 0; i < cartItemsName.length; i++) {
        alert("You have already added this item to cart")
        return;
    }
}

var cartBoxContent = `
                    <img src="${productImg}" class = "cart-img">
                    <!--cart content-->
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class = "cart-quantity">
                    </div>
                    <!--remove cart-->
                    <i class='bx bxs-trash-alt cart-remove' ></i>`; 

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

//Update total

function updateTotal  () {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement =  cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("KSH", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        //if price contains some cents value

        total = math.round(total * 100)/100;

        document.getElementsByClassName("total-price")[0].innerText = "KSH" +total;
    
}