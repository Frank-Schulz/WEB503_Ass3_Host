// Createe DOM selectors
const cartTotal = document.getElementById('cart-total');
const cartItems = document.getElementById('cart-items');
const cart = document.getElementById('cart');

let userCart; // Init userCart variable

let totalPrice = 0; // Init totalPrice variable and set to 0
let totalItems = 0; // Init totalItems variable and set to 0

if (accounts.loggedIn !== '') { // If a user is logged in
    userCart = accounts[`${accounts.loggedIn}`].cart; // set userCart variable to cart of logged in user
    calcCartTotals(); // Calculate cart totals
}

// Calculate cart totals function
function calcCartTotals() {
    totalPrice = 0; // Reset totalPrice variable to 0
    totalItems = 0; // Reset totalItems variable to 0

    for (let i = 0; i < userCart.length; i++) { // For each item in the user's cart
        if (products[userCart[i].productId].available > 0) { // Only if item is in stock
            totalPrice += userCart[i].quantity * products[userCart[i].productId].price; // Add (item quantity x item price) to total price counter
            totalItems += userCart[i].quantity; // Add item quantity to total item counter
        }
    }
    cartTotal.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`; // Set the cart totals element
}

// Initialize variable for cart HTML building
let cartContents = '';

for (let i = 0; i < userCart.length; i++) { // Build contents of cart
    cartContents += `
    <li class="cart-item">
        <div class="cart-item-img">
            <div
                class="image"
                style="background-image: url(${products[userCart[i].productId].img});"
            ></div>
        </div>

        <div class="cart-item-main">
            <div class="cart-item-name">
                <a
                    href="../../pages/product.html"
                    onclick="productPageType('${userCart[i].productId}')">
                    ${products[userCart[i].productId].name}
                </a>
            </div>
            <div class="cart-item-info">
                ${products[userCart[i].productId].info}
            </div>

            <div id="${userCart[i].productId}-available" class="cart-item-available available">
                <span>In Stock</span>
            </div>
        </div>
        <div class="cart-item-count">
            <input id="${userCart[i].productId}-count" type="text" onchange="updateQuantity('${userCart[i].productId}')" value="${userCart[i].quantity}" />
        </div>
        <div class="cart-item-price">$${products[userCart[i].productId].price}</div>
        <div id="${userCart[i].productId}-remove" class="cart-item-remove">
            <button type="button" onclick="removeItem('${userCart[i].productId}')">
                Delete
            </button>
        </div>
    </li>
    `;
}

cartItems.innerHTML = cartContents; // Insert cart contents to cart

for (let i = 0; i < userCart.length; i++) { // For every item in cart
    if (products[userCart[i].productId].available === 0) { // If product has 0 items available
        document.getElementById(`${userCart[i].productId}-available`).classList.remove('available'); // Remove available class tag
        document.getElementById(`${userCart[i].productId}-available`).classList.add('unavailable'); // Add unavailable class tag
        document.getElementById(`${userCart[i].productId}-available`).firstElementChild.innerHTML = 'Out of Stock'; // Set product to display 'Out of Stock'

        document.getElementById(`${userCart[i].productId}-count`).setAttribute('style', 'display: none'); // Hide product count
    }
}

let itemCount; // Initialize variable

// Update cart item quantity function
function updateQuantity(id) {
    userCart.forEach(item => { // For each item in users cart
        if (item.productId === id) { // If productId matches passed id
            itemCount = (document.getElementById(`${item.productId}-count`).value.trim()); // Set itemCount to trimed value of edited input element
            if (/^\d+$/g.test(itemCount)) { // If itemCount is an INTERGER
                item.quantity = parseInt(document.getElementById(`${item.productId}-count`).value); // Update item in users cart
                if (item.quantity > products[id].available) { // If input amount exceeds available number of products
                    alert('Selected amount exceeds available product count'); // Alert user
                    return; // Exit function
                }
                    localStorage.setItem('accounts', JSON.stringify(accounts)); // Update local storage
                calcCartTotals(); // Recalculate cart totals
            } else {
                alert('Please input a whole number'); // Alert user
                document.getElementById(`${item.productId}-count`).value = item.quantity; // Reset input edited input to stored value
            }
        }
    });
}

// Remove item from cart function
function removeItem(id) {
    document.getElementById(`${id}-remove`).parentElement.remove(); // Remove item element from cart

    for (let i = 0; i < userCart.length; i++) { // For every item in user cart
        if (userCart[i].productId === id) { // If saved item's id matches passed id
            userCart.splice(i, 1); // Remove item from storage
        }
    }

    localStorage.setItem('accounts', JSON.stringify(accounts)); // Update local storage
    cartEmpty(); // Check if cart is empty
}

// Function to check if cart is empty
function cartEmpty() {
    if (accounts[accounts.loggedIn].cart.length === 0) { // If user's cart is empty
        // Set cart contents to:
        cart.innerHTML = `
            <br>
            <h2>Your cart is empty</h2>
            <div id="startSearch">
                <button><a class="link-text" href="/pages/category.html">Begin Your Shopping Adventure!</a></button>
            </div>
        `
    }
}
cartEmpty(); // Call emptyCart function on page load
