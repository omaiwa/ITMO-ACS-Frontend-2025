function chat_on() {
    document.getElementById("overlay").style.display = "block";
}

function chat_off() {
    document.getElementById("overlay").style.display = "none";
}

function updateThemeIcon() {
    const themeToggle = document.getElementById("darkThemeToggle");
    if (!themeToggle) return;

    if (document.body.classList.contains("dark-theme")) {
        themeToggle.innerHTML = '<use xlink:href="sprite.svg#sun"></use>';
    } else {
        themeToggle.innerHTML = '<use xlink:href="sprite.svg#moon"></use>';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    header.innerHTML = `
    <a href="index.html" class="logo">Rentussy</a>
        <div class="navbar">
        <svg class=icon id="darkThemeToggle">
        </svg>
        ${localStorage.getItem("accessToken") ? '<a href="profile.html" class="profile-icon">Profile</a>' : '<a href="server_auth.html">Login</a> <a href="server_register.html">Register</a>'}
        </div>
`

    if (localStorage.getItem("darkTheme") === "true") {
        document.body.classList.add("dark-theme");
    }

    updateThemeIcon();

    const themeToggle = document.getElementById("darkThemeToggle");

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem("darkTheme", document.body.classList.contains("dark-theme"));
        updateThemeIcon();
    });
});

