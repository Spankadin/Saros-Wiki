document.addEventListener("DOMContentLoaded", function () {
    // ✅ Fix Homepage Title Issue
    if (window.location.pathname === "/Saros-Wiki/" || window.location.pathname === "/Saros-Wiki/index.html") {
        const pageTitle = document.querySelector(".md-content__inner h1:first-of-type");
        if (pageTitle) {
            pageTitle.style.display = "none"; // Hide homepage title
        }
    }

    // ✅ Ensure "Saros" in Header is Clickable
    const headerTitle = document.querySelector(".md-header__title");
    if (headerTitle) {
        const homeLink = document.createElement("a");
        homeLink.href = "/Saros-Wiki/"; // Corrected homepage link for GitHub Pages
        homeLink.innerHTML = headerTitle.innerHTML;
        homeLink.style.textDecoration = "none";
        homeLink.style.color = "inherit";

        headerTitle.innerHTML = "";
        headerTitle.appendChild(homeLink);
    }
});
