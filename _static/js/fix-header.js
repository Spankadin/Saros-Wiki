document.addEventListener("DOMContentLoaded", function () {
    // Check if we're on the homepage
    if (window.location.pathname === "/Saros-Wiki/" || window.location.pathname === "/Saros-Wiki/index.html") {
        const pageTitle = document.querySelector(".md-content__inner h1:first-of-type");
        if (pageTitle) {
            pageTitle.style.display = "none"; // Hide homepage title
        }
    }
});
