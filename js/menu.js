
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productsGrid");
  const filters = document.querySelectorAll(".filter-button");

  if (!grid || !window.MARFA_PRODUCTS) return;

  const renderProducts = (filter = "all") => {
    const products = window.MARFA_PRODUCTS.filter(
      (product) => filter === "all" || product.category === filter
    );

    grid.innerHTML = products.map((product) => `
      <article class="product-card" data-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy"
               onerror="this.style.display='none'">
          <span class="product-tag">${product.categoryLabel}</span>
        </div>
        <div class="product-body">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-bottom">
            <span class="product-price">${product.price.toLocaleString("ru-RU")} ₽</span>
            <button class="add-to-cart" type="button" data-product="${product.id}">В корзину</button>
          </div>
        </div>
      </article>
    `).join("");
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderProducts(button.dataset.filter);
    });
  });

  renderProducts();
});
