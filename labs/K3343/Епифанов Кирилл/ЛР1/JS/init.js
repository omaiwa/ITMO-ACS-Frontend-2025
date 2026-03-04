header.innerHTML = `
    <header>
        <a href="index.html" class="logo">Rentussy</a>
            <div>
            ${localStorage.getItem("loggedIn") ? '<a href="profile.html" class="profile-icon">Profile</a>' : '<a href="login.html">Login</a> <a href="register.html">Register</a>'}
            </div>
    </header>
`

function chat_on() {
    document.getElementById("overlay").style.display = "block";
}

function chat_off() {
    document.getElementById("overlay").style.display = "none";
}

userEmail.textContent = JSON.parse(localStorage.getItem("user"))?.email || "Guest";