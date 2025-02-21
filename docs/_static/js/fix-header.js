document.addEventListener("DOMContentLoaded", function () {
    function removeHomeTitle() {
        if (window.location.pathname === "/Saros-Wiki/" || window.location.pathname === "/Saros-Wiki/index.html") {
            const pageTitle = document.querySelector(".md-content__inner h1:first-of-type");
            if (pageTitle && pageTitle.innerText.trim() === "") {
                pageTitle.remove(); // ✅ Completely remove the empty title
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
            homeLink.style.display = "inline";  

            headerTitle.innerHTML = "";
            headerTitle.appendChild(homeLink);
        }
    }

    // ✅ Prevent flickering by checking every 200ms
    removeHomeTitle();
    setInterval(removeHomeTitle, 200);

    // ✅ Ensure "Saros" remains a clickable header link
    makeHeaderClickable();
});
