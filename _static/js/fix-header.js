document.addEventListener("DOMContentLoaded", function () {
    function removeHomeTitle() {
        const pageTitle = document.querySelector(".md-content__inner h1:first-of-type");

        if (pageTitle && window.location.pathname.endsWith("/Saros-Wiki/")) {
            // ✅ Remove title ONLY on the homepage
            pageTitle.remove();
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

    // ✅ Only remove homepage title, without touching other pages
    if (window.location.pathname.endsWith("/Saros-Wiki/")) {
        removeHomeTitle();
    }

    // ✅ Ensure "Saros" header remains clickable
    makeHeaderClickable();
});
