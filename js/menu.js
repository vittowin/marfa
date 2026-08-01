
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productsGrid");
  const filters = document.querySelectorAll(".filter-button");
  const cakeNote = document.getElementById("cakeNote");

  if (!grid) return;

  const renderProducts = (filter = "pies") => {
    grid.querySelectorAll(".product-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });

    if (cakeNote) cakeNote.hidden = filter !== "cakes";
    document.dispatchEvent(new CustomEvent("marfa:products-rendered"));
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("active"));
      filters.forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      renderProducts(button.dataset.filter);
    });
  });

  renderProducts();
});
