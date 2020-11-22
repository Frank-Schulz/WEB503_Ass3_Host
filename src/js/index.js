// Create DOM selectors
const linkList = document.getElementsByClassName('link-list');
const headerUserBtn = document.getElementById('header-btn-user');
const header = document.getElementById('header');

/* ----------------------------- ANCHOR GENERAL ----------------------------- */

const localStorageAccounts = JSON.parse(localStorage.getItem('accounts')); // Retrieve local storage item 'accounts'

// If accounts item exists then set accounts to retrieved value
//      Else set accounts to new object
let accounts = localStorage.getItem('accounts') !== null ? localStorageAccounts : {
    loggedIn: ''
};

if (accounts.loggedIn !== '') { // If a user is logged in
    headerUserBtn.innerHTML = `${accounts.loggedIn}`; // Set user btn to users username
    headerUserBtn.href = "../pages/account.html"; // Change user btn's href to point to the user page
} else {
    header.firstElementChild.lastElementChild.outerHTML = '';
}

// Edit nav bar title when screen < 400px
function navTitle() {
    if (window.innerWidth < 400) { // If screen width is < 400px
        // Edit nav bar title
        header.firstElementChild.firstElementChild.firstElementChild.innerHTML = `
            Shopping <br> At Random 2
        `
    }
}
window.onresize = navTitle; // On window resize call navTitle
navTitle(); // Call on page load

const categories = [ // Set the categories included on the site
    'Electronics',
    'Household',
    'Kitchen'
];

let links = ''; // Initialize links variable

categories.forEach(category => { // For each category
    // Add a link to category in the link list
    links += `
    <li class="footer-link">
        <a class="link-text" href="../../../../pages/category/${category}.html">${category}</a>
    </li>`;
});

linkList[0].innerHTML = `${links}`; // Add links to list

/* --------------------------- ANCHOR PRODUCT LIST -------------------------- */

// Retrieve products from local storage
const localStorageProducts = JSON.parse(localStorage.getItem('products'));

// If products item exists then set products to retrieved value
//      Else set products to new object
let products = localStorage.getItem('products') !== null ? localStorageAccounts : {
    KIT1: {
        name: 'Blender',
        img: '../../assets/img/blender.jpg',
        info: 'This is a blender',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Scelerisque purus semper eget duis at.Risus commodo viverra maecenas accumsan lacus.Amet commodo nulla facilisi nullam vehicula ipsum a arcu.Quis blandit turpis cursus in hac.Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus.Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.',
        url: '/pages/category/kitchen/blender.html',
        price: '13.40',
        tags: ['Kitchen'],
        available: 10
    },
    KIT2: {
        name: 'Pot',
        img: '../../assets/img/pot.jpg',
        info: 'This is a pot',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Scelerisque purus semper eget duis at.Risus commodo viverra maecenas accumsan lacus.Amet commodo nulla facilisi nullam vehicula ipsum a arcu.Quis blandit turpis cursus in hac.Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus.Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.',
        url: '/pages/category/kitchen/pot.html',
        price: '18.10',
        tags: ['Kitchen'],
        available: 10
    },
    KIT3: {
        name: 'Mug',
        img: '../../assets/img/mug.jpg',
        info: 'This is a mug',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Scelerisque purus semper eget duis at.Risus commodo viverra maecenas accumsan lacus.Amet commodo nulla facilisi nullam vehicula ipsum a arcu.Quis blandit turpis cursus in hac.Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus.Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.',
        url: '/pages/category/kitchen/mug.html',
        price: '10.70',
        tags: ['Kitchen'],
        available: 10
    },
    HOU1: {
        name: 'Chair',
        img: '../../assets/img/chair.jpg',
        info: 'This is a chair',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Scelerisque purus semper eget duis at.Risus commodo viverra maecenas accumsan lacus.Amet commodo nulla facilisi nullam vehicula ipsum a arcu.Quis blandit turpis cursus in hac.Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus.Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.',
        url: '/pages/category/household/chair.html',
        price: '35.60',
        tags: ['Household'],
        available: 10
    },
    HOU2: {
        name: 'Sofa',
        img: '../../assets/img/sofa.jpg',
        info: 'This is a sofa',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Scelerisque purus semper eget duis at.Risus commodo viverra maecenas accumsan lacus.Amet commodo nulla facilisi nullam vehicula ipsum a arcu.Quis blandit turpis cursus in hac.Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus.Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.',
        url: '/pages/category/household/sofa.html',
        price: '80.60',
        tags: ['Household'],
        available: 10
    },
    ELE1: {
        name: 'USB Cable',
        img: '../../assets/img/cable.jpg',
        info: 'This is a USB cable',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Scelerisque purus semper eget duis at.Risus commodo viverra maecenas accumsan lacus.Amet commodo nulla facilisi nullam vehicula ipsum a arcu.Quis blandit turpis cursus in hac.Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus.Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.',
        url: '/pages/category/electronics/cable.html',
        price: '15.50',
        tags: ['Electronics'],
        available: 2
    },
    ELE2: {
        name: 'USB Stick',
        img: '../../assets/img/usb.jpg',
        info: 'This is a USB stick',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Scelerisque purus semper eget duis at.Risus commodo viverra maecenas accumsan lacus.Amet commodo nulla facilisi nullam vehicula ipsum a arcu.Quis blandit turpis cursus in hac.Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus.Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.',
        url: '/pages/category/electronics/usbStick.html',
        price: '7.50',
        tags: ['Electronics'],
        available: 0
    }

};

/* --------------------------- ANCHOR PRODUCT PAGE -------------------------- */

const localStorageProductPage = JSON.parse(localStorage.getItem('productPage')); // Retrieve local storage item 'productPage'

// If productPage item exists then set productPage to retrieved value
//      Else set productPage to new object
let productPage = localStorage.getItem('productPage') !== null ? localStorageProductPage : {};

function productPageType(id) {
    productPage = products[id]; // Set productPage to clicked 
    productPage.id = id;

    localStorage.setItem('productPage', JSON.stringify(productPage)); // Update local storage
}
