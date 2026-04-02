document$.subscribe(() => {
  console.log("connections.js loaded");

  const test = document.createElement("div");
  test.textContent = "Connections test box";
  test.style.position = "fixed";
  test.style.top = "120px";
  test.style.right = "20px";
  test.style.zIndex = "9999";
  test.style.background = "red";
  test.style.color = "white";
  test.style.padding = "12px";
  test.style.borderRadius = "8px";

  document.body.appendChild(test);
});
