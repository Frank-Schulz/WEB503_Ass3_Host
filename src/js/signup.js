// Create DOM selectors
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Initialize checks
let checks = {
    checkRequired: false,
    checkLength: false,
    checkLength2: false,
    checkEmail: false,
    checkPasswordsMatch: false,
    usernameExists: false
}
let secondLength = false;

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        checks.checkEmail = true;
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
            checks.checkRequired = true;
        }
    });
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
        secondLength ? checks.checkLength2 = true : checks.checkLength = true;
        secondLength = true;
    }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    } else {
        checks.checkPasswordsMatch = true;
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Update local storage
function updateLocalStorage() {

    accounts[`${username.value}`] = {
        fName: `${fName.value}`,
        lName: `${lName.value}`,
        email: `${email.value}`,
        password: `${password.value}`,
        cart: [
            // {
            //     productId: 'KIT1',
            //     quantity: 2,
            //     price: 13.50
            // },
            // {
            //     productId: 'ELE1',
            //     quantity: 2,
            //     price: 13.50
            // }
        ]
    }

    localStorage.setItem('accounts', JSON.stringify(accounts)); // Update local storage
}

// Check if username already exists
function usernameExists(user) {
    accounts[`${user.value}`] ? showError(user, 'Username already exists') : checks.usernameExists = true;
}

// Check if all checks returned true
function checksTrue() {
    if (checks.checkRequired && checks.checkLength && checks.checkLength2 && checks.checkEmail && checks.checkPasswordsMatch && checks.usernameExists) {
        return true;
    }
}

// Login, alert user and redirect to home
function login() {
    accounts.loggedIn = `${username.value}`;

    localStorage.setItem('accounts', JSON.stringify(accounts));

    alert("Signup successful. Welcome!");
    window.location.href = '/';
}

// Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, fName, lName, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    usernameExists(username);

    if (checksTrue()) { // If all checks passed the log in
        updateLocalStorage();
        login();
    }

    checks = { // Reset checks
        checkRequired: false,
        checkLength: false,
        checkLength2: false,
        checkEmail: false,
        checkPasswordsMatch: false,
        usernameExists: false
    }
    secondLength = false; // Reset second length check
});