// Create DOM selectors
const username = document.getElementById('username');
const password = document.getElementById('password');

// Initialize checks
let checks = {
    checkRequired: false,
    checkLogin: false
}

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

// Check login matchs
function checkLogin(user, pass) {
    if (accounts[`${user.value}`].password === pass.value) {
        showSuccess(password);
        checks.checkLogin = true;
    } else {
        showError(password, `Username or Password is incorrect`);
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check if checks returned true
function checksTrue() {
    if (checks.checkRequired && checks.checkLogin) {
        return true;
    }
}

// Log in, alert user and redirect to home
function login() {
    accounts.loggedIn = `${username.value}`;

    localStorage.setItem('accounts', JSON.stringify(accounts));

    alert("Login successful. Welcome back!");
    window.location.href = '/';
}

// Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, password]);
    checkLogin(username, password);

    if (checksTrue()) { // If all checks passed then log in
        login();
    }

    checks = { // Reset checks
        checkRequired: false,
        checkLogin: false
    }
});