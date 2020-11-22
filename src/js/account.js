// Create DOM selectors
const account_user = document.getElementById('user');
const logoutBtn = document.getElementById('logout');
const deleteAccountBtn = document.getElementById('delete-account');

account_user.innerHTML = accounts.loggedIn; // Set account_user to currently logged in user

// Create event listeners
logoutBtn.addEventListener('click', () => {
    accounts.loggedIn = ''; // Remove user from logged in state

    localStorage.setItem('accounts', JSON.stringify(accounts)); // Update local storage

    alert("Logged out. See you soon!"); // Alert user
    window.location.href = '/'; // Redirect to home page
});

deleteAccountBtn.addEventListener('click', () => {
    delete accounts[accounts.loggedIn]; // Delete user from accounts
    accounts.loggedIn = ''; // Remove user from logged in state

    localStorage.setItem('accounts', JSON.stringify(accounts)); // Update local storage

    alert("Account deleted. Sorry to see you go."); // Alert user
    window.location.href = '/'; // Redirect to home page
});
