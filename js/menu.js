
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productsGrid");
  const filters = document.querySelectorAll(".filter-button");
  const cakeNote = document.getElementById("cakeNote");

  if (!grid || !window.MARFA_PRODUCTS) return;

  const formatWeight = (weight) => (
    Number.isFinite(weight) ? `${weight.toLocaleString("ru-RU")} г` : ""
  );

  const renderProducts = (filter = "all") => {
    const products = window.MARFA_PRODUCTS.filter(
      (product) => filter === "all" || product.category === filter
    );

    grid.innerHTML = products.map((product) => `
      <article class="product-card" data-id="${product.id}">
        ${product.image ? `
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" width="900" height="900" loading="lazy">
          </div>
        ` : ""}
        <div class="product-body">
          <div class="product-topline">
            <span class="product-tag product-tag--inline">${product.categoryLabel}</span>
            ${product.weight ? `<span class="product-weight">${formatWeight(product.weight)}</span>` : ""}
          </div>
          <h3>${product.name}</h3>
          ${product.description ? `<p>${product.description}</p>` : ""}
          <div class="product-bottom">
            <span class="product-price">${product.price.toLocaleString("ru-RU")} ₽</span>
            <button class="add-to-cart" type="button" data-product="${product.id}">В корзину</button>
          </div>
        </div>
      </article>
    `).join("");

    if (cakeNote) cakeNote.hidden = filter !== "cakes";
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
