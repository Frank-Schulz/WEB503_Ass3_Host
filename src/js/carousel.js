let myIndex = 0; // Initialize index counter
carousel(); // Start carousel function

// Function to rotate carousel
function carousel() {
    let x = document.getElementsByClassName("mySlides"); // Get sliders from the carousel
    for (let i = 0; i < x.length; i++) { // For every slider
        x[i].style.display = "none"; // Hide slider
    }
    myIndex++; // Increment index
    if (myIndex > x.length) { myIndex = 1 } // If index exeeds slider count --> reset to 1
    x[myIndex - 1].style.display = "flex"; // Set slide of currrent index to display as flex
    setTimeout(carousel, 7000); // Change slide every 7 seconds
}