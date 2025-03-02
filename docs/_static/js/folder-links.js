document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".md-nav__item").forEach((item) => {
        let link = item.querySelector("a");
        if (!link && item.querySelector("nav")) {
            // Get the first link inside the folder
            let firstLink = item.querySelector("nav a");
            if (firstLink) {
                let folderUrl = firstLink.getAttribute("href");
                item.addEventListener("click", function() {
                    window.location.href = folderUrl;
                });
                item.style.cursor = "pointer";
            }
        }
    });
});
