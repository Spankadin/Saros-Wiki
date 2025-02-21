document.addEventListener("DOMContentLoaded", function () {
    // ✅ Hide Homepage Title Immediately (Removes it from DOM)
    if (window.location.pathname === "/Saros-Wiki/" || window.location.pathname === "/Saros-Wiki/index.html") {
        const pageTitle = document.querySelector(".md-content__inner h1:first-of-type");
        if (pageTitle) {
            pageTitle.remove(); // Completely removes the element instead of just hiding it
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

            if (window.innerWidth < 768) {
                homeLink.style.fontSize = "1.2rem";
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
