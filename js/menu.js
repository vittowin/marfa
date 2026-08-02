
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

  const requestedFilter = new URLSearchParams(window.location.search).get("filter");
  const hasRequestedFilter = Array.from(filters).some(
    (button) => button.dataset.filter === requestedFilter
  );
  const initialFilter = hasRequestedFilter ? requestedFilter : "pies";

  filters.forEach((button) => {
    const isActive = button.dataset.filter === initialFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderProducts(initialFilter);
});
