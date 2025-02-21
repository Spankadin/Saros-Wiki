document.addEventListener("DOMContentLoaded", function () {
    function removeHomeTitle() {
        const pageTitle = document.querySelector(".md-content__inner h1:first-of-type");

        // ✅ Ensure ONLY the homepage title is hidden
        if (pageTitle && document.body.getAttribute("data-md-page") === "home") {
            pageTitle.style.display = "none";  // Hide instead of removing to prevent flicker
        }
    }

    function makeHeaderClickable() {
        let headerTitle = document.querySelector(".md-header__title");

        if (headerTitle && !headerTitle.querySelector("a")) {
            const homeLink = document.createElement("a");
            homeLink.href = "/Saros-Wiki/"; // Adjusted for GitHub Pages
            homeLink.innerHTML = headerTitle.innerHTML;
            homeLink.style.textDecoration = "none";
            homeLink.style.color = "inherit";
            homeLink.style.display = "inline";  

            headerTitle.innerHTML = "";
            headerTitle.appendChild(homeLink);
        }
    }

    // ✅ Remove title ONLY on the homepage (home.md), without affecting other pages
    removeHomeTitle();

    // ✅ Ensure "Saros" remains clickable in the header
    makeHeaderClickable();
});
