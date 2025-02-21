document.addEventListener("DOMContentLoaded", function () {
    const headerTitle = document.querySelector(".md-header__title");

    if (headerTitle) {
        const homeLink = document.createElement("a");
        homeLink.href = "/";
        homeLink.innerHTML = headerTitle.innerHTML;
        homeLink.style.textDecoration = "none";
        homeLink.style.color = "inherit";

        headerTitle.innerHTML = "";
        headerTitle.appendChild(homeLink);
    }
});
