
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productsGrid");
  const filters = document.querySelectorAll(".filter-button");
  const cakeNote = document.getElementById("cakeNote");
  const searchInput = document.getElementById("menuSearch");
  const noResults = document.getElementById("menuNoResults");

  if (!grid) return;

  let activeFilter = "pies";

  const normalizeText = (value) =>
    value.trim().toLocaleLowerCase("ru-RU").replace(/ё/g, "е");

  const setActiveFilter = (filter) => {
    activeFilter = filter;
    filters.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const renderProducts = () => {
    const query = normalizeText(searchInput?.value || "");
    let visibleCount = 0;

    grid.querySelectorAll(".product-card").forEach((card) => {
      const matchesFilter =
        activeFilter === "all" || card.dataset.category === activeFilter;
      const matchesSearch =
        !query || normalizeText(card.textContent || "").includes(query);

      card.hidden = !matchesFilter || !matchesSearch;
      if (!card.hidden) visibleCount += 1;
    });

    if (cakeNote) cakeNote.hidden = activeFilter !== "cakes" || visibleCount === 0;
    if (noResults) noResults.hidden = visibleCount !== 0;
    document.dispatchEvent(new CustomEvent("marfa:products-rendered"));
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveFilter(button.dataset.filter);
      renderProducts();
    });
  });

  searchInput?.addEventListener("input", () => {
    if (normalizeText(searchInput.value) && activeFilter !== "all") {
      setActiveFilter("all");
    }
    renderProducts();
  });

  const requestedFilter = new URLSearchParams(window.location.search).get("filter");
  const hasRequestedFilter = Array.from(filters).some(
    (button) => button.dataset.filter === requestedFilter
  );
  setActiveFilter(hasRequestedFilter ? requestedFilter : "pies");
  renderProducts();
});
