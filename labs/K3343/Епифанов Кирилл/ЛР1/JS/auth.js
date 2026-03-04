function register(e) {
    e.preventDefault();

    const user = {
        email: email.value,
        password: password.value,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("rented", JSON.stringify([]));
    alert("Registration successful!");
    location.href = "login.html";
}

function login(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email.value && user.password === password.value) {
        alert("Login successful!");

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user.email));

        location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    alert("You have been logged out.");
    location.href = "index.html";
}