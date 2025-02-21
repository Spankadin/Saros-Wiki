document.addEventListener("DOMContentLoaded", function () {
    function removeHomeTitle() {
        if (window.location.pathname === "/Saros-Wiki/" || window.location.pathname === "/Saros-Wiki/index.html") {
            const pageTitle = document.querySelector(".md-content__inner h1:first-of-type");
            if (pageTitle) {
                pageTitle.remove(); // ✅ Completely remove the title from the DOM
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
            homeLink.style.display = "block";

            if (window.innerWidth < 768) {
                homeLink.style.fontSize = "1.2rem";
                homeLink.style.padding = "10px"; // Improve tap target
            }

            headerTitle.innerHTML = "";
            headerTitle.appendChild(homeLink);
        }
    }

    // ✅ Remove the title immediately on page load
    removeHomeTitle();

    // ✅ Run again to check if MkDocs re-renders it
    setTimeout(removeHomeTitle, 500);
    setTimeout(removeHomeTitle, 1000);

    // ✅ Ensure "Saros" remains a clickable header link
    makeHeaderClickable();
    setTimeout(makeHeaderClickable, 500);
});
