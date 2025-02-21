document.addEventListener("DOMContentLoaded", function () {
    // ✅ Fix Homepage Title Issue (Hide Title on Homepage)
    if (window.location.pathname === "/Saros-Wiki/" || window.location.pathname === "/Saros-Wiki/index.html") {
        const pageTitle = document.querySelector(".md-content__inner h1:first-of-type");
        if (pageTitle) {
            pageTitle.style.display = "none"; // Hide homepage title
        }
    }

    // ✅ Ensure "Saros" in Header is Clickable (Desktop + Mobile)
    function makeHeaderClickable() {
        let headerTitle = document.querySelector(".md-header__title");

        if (headerTitle && !headerTitle.querySelector("a")) {
            const homeLink = document.createElement("a");
            homeLink.href = "/Saros-Wiki/"; // Adjusted for GitHub Pages
            homeLink.innerHTML = headerTitle.innerHTML;
            homeLink.style.textDecoration = "none";
            homeLink.style.color = "inherit";
            homeLink.style.display = "block"; // Full clickable area

            // ✅ Special handling for mobile header
            if (window.innerWidth < 768) {
                homeLink.style.fontSize = "1.2rem"; // Ensure visibility on mobile
                homeLink.style.padding = "10px"; // Increase tap target size
            }

            headerTitle.innerHTML = "";
            headerTitle.appendChild(homeLink);
        }
    }

    // ✅ Run on page load
    makeHeaderClickable();

    // ✅ Run again after MkDocs finishes loading (for dynamic changes)
    setTimeout(makeHeaderClickable, 500);
});
