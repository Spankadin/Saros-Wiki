document.addEventListener("DOMContentLoaded", function () {
    const headerTitle = document.querySelector(".md-header__title");

    if (headerTitle) {
        const homeLink = document.createElement("a");

        // Use the correct GitHub Pages URL
        homeLink.href = "/Saros-Wiki/"; // Adjust for GitHub Pages
        homeLink.innerHTML = headerTitle.innerHTML;
        homeLink.style.textDecoration = "none";
        homeLink.style.color = "inherit";

        headerTitle.innerHTML = "";
        headerTitle.appendChild(homeLink);
    }
});
