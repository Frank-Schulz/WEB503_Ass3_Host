// Create DOM selectors
const content = document.getElementById('content');

// Get the category of current page
let categoryType = content.firstElementChild.innerHTML;
let sectionItems = '';

for (const key in products) { // For every product
    products[`${key}`].tags.forEach(tag => { // For every product tag
        if (tag === categoryType) { // If product tag matches page
            // Generate products within section
            sectionItems += `
                <li class="card">
                    <a
                        class="categories-products-product"
                        href="../../pages/product.html"
                        onclick="productPageType('${key}')"
                        >
                            <div class="image" style="background-image: url(${products[key].img})"></div>
                            <h2>${products[key].name}</h2>
                            <p class="price">$${products[key].price}</p>
                        </a
                    >
                    <p><button onclick="addToCart('${key}')">Add to Cart</button></p>
                </li>
            `
        }
    })
}
// Populate contents with products of its category
content.innerHTML = `
    <h2 class="category-title">${categoryType}</h2>

    <ul class="categories-products">
        ${sectionItems}
    </ul>
`

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