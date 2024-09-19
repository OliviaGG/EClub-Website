window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');

    // Check the current scroll position
    let scrollPosition = window.scrollY;

    // Check if the user scrolled past the header
    if (scrollPosition > header.offsetHeight - 50) {
        navbar.classList.add('sticky');  // Move to the top
    } else {
        navbar.classList.remove('sticky');  // Keep at the bottom
    }

    // Gradually increase opacity as the user scrolls down
    if (scrollPosition > 100) {  // Adjust this number to control when opacity begins
        navbar.classList.add('visible');  // Add the 'visible' class to increase opacity
    } else {
        navbar.classList.remove('visible');  // Remove 'visible' to hide it when scrolling back up
    }
});

function validateForm() {
    // Basic validation checks
    if (document.getElementById("username").value === "") {
        alert("Please enter your username.");
        return false;
    }

    if (document.getElementById("password").value === "") {
        alert("Please enter your password.");
        return false;
    }

    // Add more validation rules as needed
    return true;
}

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Basic validation
    if (username === "" || password === "") {
        document.getElementById("errorMessage").textContent = "Please fill in all fields.";
        return;
    }

    // Replace with actual authentication logic (e.g., fetch data from a server)
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            // Successful login
            window.location.href = '/dashboard'; // Redirect to the dashboard
        } else {
            // Login failed
            response.json().then(data => {
                document.getElementById("errorMessage").textContent = data.message || "Login failed.";
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("errorMessage").textContent = "An error occurred.";
    });
});