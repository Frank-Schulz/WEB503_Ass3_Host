// Create DOM selectors
const productContent = document.getElementById('product-content');

// If productPage item exists then set productPage to retrieved value
//      Else set productPage to new object
productPage = localStorage.getItem('productPage') !== null ? localStorageProductPage : {};

// Generate product page contents
productContent.innerHTML = `
<!-- START BREADCRUMBS -->
    <div id="breadcrumbs">
        <a class="crumb" href="/">Home</a>

        /
        <a class="crumb" href="/pages/category.html">Category</a>

        /
        <a class="crumb" href="/pages/category/${productPage.tags[0].toLowerCase()}.html">${productPage.tags[0]}</a>

        / ${productPage.name}
    </div>
    <!-- SEARCH BAR -->
    <div id="searchbar">
        <form
            id="form-searchbar"
            class="searchbar-form"
            action="/search"
            method="get"
        >
            <input
                type="text"
                placeholder="I'm shopping for..."
                maxlength="50"
                autocomplete="off"
                value=""
                name="SearchText"
                class="search-key"
                id="search-key"
            /><input
                class="search-submit"
                type="submit"
                value="Search..."
            />
        </form>
    </div>

    <div class="product">
        <div class="product-img">
            <div
                class="image"
                style="
                    background-image: url(${productPage.img});
                "
            ></div>
        </div>

        <div class="product-main">
            <div class="product-main-left">
                <div class="product-name">${productPage.name}</div>
                <div class="product-info">${productPage.info}</div>

                <div id="product-available" class="product-available available">
                    <span>In Stock  ~  ${productPage.available} available</span>
                </div>

                <input
                    id="productAddToCart"
                    class="product-button add"
                    type="button"
                    value="Add to Cart"
                    onclick="addToCart('${productPage.id}')"
                />
            </div>
            <div class="product-main-right">
                <div class="product-price"><span>$${productPage.price}</span></div>

                <div class="product-count">
                    <input id="product-amount" type="text" value="1" />
                </div>

                <input
                    id="product-buy-now"
                    class="product-button buy"
                    type="button"
                    value="BUY NOW!"
                />
            </div>
        </div>
        <div class="product-desc">
            <div>Product Details</div>
            ${productPage.desc}
        </div>
    </div>
</div >
    `

// Post generation DOM selectors
const productAvailable = document.getElementById('product-available');
const addToCartBtn = document.getElementById('productAddToCart');
const productAmount = document.getElementById('product-amount');
const buyNowBtn = document.getElementById('product-buy-now');

// Edit product availability text when screen < 440px
function updateProductInfo() {
    if (window.innerWidth < 440) { // If window width < 440px
        productAvailable.firstElementChild.textContent = `In Stock`; // Set product availability to short version
    } else {
        productAvailable.firstElementChild.textContent = `In Stock  ~  ${productPage.available} available`; // Set product availability to long version
    }
}
window.onresize = updateProductInfo; // Call on window resize
updateProductInfo(); // Call on page load

// If product is out of stock update page to reflect state
if (productPage.available === 0) {
    productAvailable.classList.remove('available'); // Unset available class
    productAvailable.classList.add('unavailable'); // Set unavailable class
    productAvailable.firstElementChild.innerHTML = `Out of Stock`; // Set to display 'Out of Stock'

    addToCartBtn.style.display = 'none'; // Hide add to cart button
    productAmount.style.display = 'none'; // Hide amount input
    buyNowBtn.style.display = 'none'; // Hide buy now button
}

// Add item to cart function
function addToCart(id) {
    if (accounts.loggedIn === '') { // If not logged in
        alert('Please log in to use cart functionality'); // Alert user
        return; // Exit function
    }
    if (accounts[`${accounts.loggedIn}`].cart.length === 0) { // If cart is empty
        accounts[`${accounts.loggedIn}`].cart.push({ // Add item to cart
            productId: `${id}`,
            quantity: 1
        });
        alert('Item added to cart'); // Alert user
        localStorage.setItem('accounts', JSON.stringify(accounts)); // Update local storage
    } else {
        for (let i = 0; i < accounts[`${accounts.loggedIn}`].cart.length; i++) { // For every item in cart
            if (accounts[`${accounts.loggedIn}`].cart[i].productId === id) { // If item in cart matches item being added
                alert('Item already exists in your cart'); // Alert user
                return; // Exit out of function without adding item
            }
        };
        accounts[`${accounts.loggedIn}`].cart.push({ // Add item to cart
            productId: `${id}`,
            quantity: 1
        });
        alert('Item added to cart'); // Alert user
        localStorage.setItem('accounts', JSON.stringify(accounts)); // Update local storage
    }
}

// Get base URL of site
var getUrl = window.location;
var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];

buyNowBtn.addEventListener('click', () => { // When buy now button is clicked
    if (productAmount.value > productPage.available) { // If selected product amount exceeds available products
        alert('Selected amount exeeds available product count'); // Alert user
        return; // Exit function
    }

    let opened = window.open(`${baseUrl}pages/checkout.html`); // Set opened to open new window/tab with URL
    // Open new window/tab and use the following page
    opened.document.write(`
    <!DOCTYPE html>
    <html xml:lang="en" lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title>Shopping At Random 2</title>
            <meta
                name="description"
                content="The perfect place for your random shopping needs."
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="../src/css/style.css" />
            <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
                integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
                crossorigin="anonymous"
            />
        </head>
    
        <body>
            <!-- START HEADER -->
            <div id="header">
                <ul class="nav-list">
                    <li class="header-left">
                        <a class="header-btn header-logo" href="/"
                            >Shopping At Random 2</a
                        >
                    </li>
                    <li class="header-right">
                        <a id="header-btn-user" class="header-btn" href="../pages/login.html"
                            ><i class="fas fa-user-alt" style="font-size: 24px"></i
                        ></a>
                    </li>
                    <li class="header-right">
                        <a class="header-btn" href="../pages/cart.html"
                            ><i
                                class="fas fa-shopping-cart"
                                style="font-size: 24px"
                            ></i
                        ></a>
                    </li>
                </ul>
            </div>
    
            <!-- START PAGE CONTENTS -->
            <div class="wrapper">
    
                <div class="content">
                    <section class="shipments">
                        <div id="itemsSummary">
                            <h4 class="order-details">Your order</h4>
    
                            <button
                                name="ContinueButton"
                                type="submit"
                                class="continue"
                                onclick="
                                alert('Thank you for your purchase!')
                                window.close()
                                "
                            >
                                Place Order
                            </button>
    
                            <div class="shipment pickup">
                                <div class="details">
                                    <div class="status">
                                        <strong class="pickup"
                                            >{Destination} + $15</strong
                                        >
                                    </div>
                                </div>
    
                                <table>
                                    <tbody id="item-list">
                                        <tr>
                                            <td class="quantity">
                                            ${productAmount.value} <span>×</span>
                                            </td>
                                            <td class="product">
                                                ${productPage.name} ~ ${productPage.info}
                                            </td>
                                            <td class="price">$${productPage.price}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                    <div id="checkout-summary">
                        <div class="sidebar-details">
                            <div id="trolleyTotals">
                                <table class="table trolleySubtotal">
                                    <tbody id="checkout-totals">
                                        <tr class="subtotal-items">
                                            <td style="text-align: left">
                                                Items (${productAmount.value})
                                            </td>
                                            <td>$${productPage.price}</td>
                                        </tr>
    
                                        <tr class="total">
                                            <td style="text-align: left">TOTAL</td>
                                            <td>
                                                <span> NZ$${((productPage.price * productAmount.value) + 15).toFixed(2)} </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="keep-shopping fas">
                            <a href="../pages/cart.html"
                                ><span class="icon-trolley-left"></span> Return to
                                cart</a
                            >
                        </div>
                    </div>
                </div>
            </div>
    
            <!-- START FOOTER -->
            <div id="footer">
                <h2><a href="/">Shopping At Random 2</a></h2>
                <div class="footer-list">
                    <ul class="link-list"></ul>
                </div>
            </div>
    
            <script src="../src/js/index.js" async defer></script>
            <script src="../src/js/product.js" async defer></script>
        </body>
    </html>
    `);
});