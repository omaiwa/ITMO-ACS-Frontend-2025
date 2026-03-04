header.innerHTML = `
        <a href="index.html" class="logo">Rentussy</a>
            <div>
            ${localStorage.getItem("accessToken") ? '<a href="profile.html" class="profile-icon">Profile</a>' : '<a href="server_auth.html">Login</a> <a href="server_register.html">Register</a>'}
            </div>
`

function chat_on() {
    document.getElementById("overlay").style.display = "block";
}

function chat_off() {
    document.getElementById("overlay").style.display = "none";
}

