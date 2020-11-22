// Create DOM selectors
const itemList = document.getElementById('item-list');
const checkoutTotals = document.getElementById('checkout-totals');

// Initialize checkoutList for HTML building
let checkoutList = '';

// Initialize counter variables
let totalCheckoutPrice = 0;
let totalCheckoutCount = 0;

// For each item in users cart
accounts[`${accounts.loggedIn}`].cart.forEach(item => {
    if (products[item.productId].available > 0) { // If item is in stock
        // Track total price and item count values
        totalCheckoutPrice += (item.quantity * products[item.productId].price);
        totalCheckoutCount += item.quantity;

        // Generate HTML and add to checkoutList
        checkoutList += `
        <tr>
            <td class="quantity">
                ${item.quantity} <span>×</span>
            </td>
            <td class="product">
                ${products[item.productId].name} ~ ${products[item.productId].info}
        </td>
            <td class="price">$${products[item.productId].price}</td>
        </tr>
    `
    }
});

itemList.innerHTML = checkoutList; // Populate checkout itemList with checkoutList

// Populate checkout totals
checkoutTotals.innerHTML = `
    <tr class="subtotal-items">
        <td style="text-align: left">
            Items (${totalCheckoutCount})
        </td>
            <td>$${totalCheckoutPrice.toFixed(2)}</td>
    </tr>

    <tr class="total">
            <td style="text-align: left">TOTAL</td>
        <td>
            <span> NZ$${(totalCheckoutPrice + 15).toFixed(2)} </span>
        </td>
    </tr>
`