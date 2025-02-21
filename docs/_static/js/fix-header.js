document.addEventListener("DOMContentLoaded", function () {
    function removeHomeTitle() {
        if (window.location.pathname.includes("/Saros-Wiki/") || window.location.pathname.includes("/Saros-Wiki/index.html")) {
            const pageTitle = document.querySelector(".md-content__inner h1:first-of-type");
            if (pageTitle) {
                pageTitle.remove(); // ✅ Completely removes the title
            }
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
            homeLink.style.display = "inline";  // Ensure it doesn't shift down

            headerTitle.innerHTML = "";
            headerTitle.appendChild(homeLink);
        }
    }

    // ✅ Remove the title immediately & continuously
    removeHomeTitle();
    setInterval(removeHomeTitle, 300);  // Keeps checking & removing if it reappears

    // ✅ Ensure "Saros" remains a clickable header link
    makeHeaderClickable();
});
