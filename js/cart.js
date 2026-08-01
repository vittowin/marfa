
document.addEventListener("DOMContentLoaded", () => {
  const cart = new Map();
  const openButton = document.getElementById("cartOpen");
  const closeButton = document.getElementById("cartClose");
  const overlay = document.getElementById("cartOverlay");
  const panel = document.getElementById("cartPanel");
  const itemsBox = document.getElementById("cartItems");
  const countBox = document.getElementById("cartCount");
  const totalBox = document.getElementById("cartTotal");
  const orderLink = document.getElementById("cartOrder");

  if (!panel) return;

  const getItemName = (item) => (
    Number.isFinite(item.weight)
      ? `${item.name}, ${item.weight.toLocaleString("ru-RU")} г`
      : item.name
  );

  const openCart = () => {
    panel.classList.add("open");
    overlay.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    openButton?.setAttribute("aria-expanded", "true");
    document.body.classList.add("lock");
    closeButton?.focus();
  };

  const closeCart = () => {
    panel.classList.remove("open");
    overlay.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    openButton?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("lock");
    openButton?.focus();
  };

  const getQuantity = (productId) => cart.get(productId) || 0;

  const renderProductControls = () => {
    document.querySelectorAll("[data-cart-control]").forEach((control) => {
      const productId = control.dataset.cartControl;
      const quantity = getQuantity(productId);

      control.innerHTML = quantity > 0
        ? `
          <div class="quantity-control" aria-label="Количество товара">
            <button type="button" data-cart-change="-1" data-product-id="${productId}" aria-label="Уменьшить количество">−</button>
            <span aria-live="polite">${quantity}</span>
            <button type="button" data-cart-change="1" data-product-id="${productId}" aria-label="Увеличить количество">+</button>
          </div>
        `
        : `<button class="add-to-cart" type="button" data-cart-add="${productId}">В корзину</button>`;
    });
  };

  const changeQuantity = (productId, change) => {
    const product = window.MARFA_PRODUCTS?.find((item) => item.id === productId);
    if (!product) return;

    const nextQuantity = getQuantity(productId) + change;

    if (nextQuantity > 0) {
      cart.set(productId, nextQuantity);
    } else {
      cart.delete(productId);
    }

    renderCart();
  };

  const renderCart = () => {
    const rows = Array.from(cart, ([productId, quantity]) => {
      const product = window.MARFA_PRODUCTS?.find((item) => item.id === productId);
      return product ? { ...product, quantity } : null;
    }).filter(Boolean);
    const itemCount = rows.reduce((sum, item) => sum + item.quantity, 0);
    const total = rows.reduce((sum, item) => sum + item.price * item.quantity, 0);

    countBox.textContent = String(itemCount);
    totalBox.textContent = `${total.toLocaleString("ru-RU")} ₽`;
    renderProductControls();

    if (!rows.length) {
      itemsBox.innerHTML = '<div class="cart-empty">Корзина пока пуста.</div>';
      orderLink.classList.add("disabled");
      orderLink.href = "#";
      return;
    }

    itemsBox.innerHTML = rows.map((item) => `
      <div class="cart-item">
        <div class="cart-item-copy">
          <strong>${getItemName(item)}</strong>
          <span>${item.price.toLocaleString("ru-RU")} ₽ за штуку</span>
          <b>${(item.price * item.quantity).toLocaleString("ru-RU")} ₽</b>
        </div>
        <div class="quantity-control quantity-control--cart" aria-label="Количество товара">
          <button type="button" data-cart-change="-1" data-product-id="${item.id}" aria-label="Уменьшить количество">−</button>
          <span aria-live="polite">${item.quantity}</span>
          <button type="button" data-cart-change="1" data-product-id="${item.id}" aria-label="Увеличить количество">+</button>
        </div>
      </div>
    `).join("");

    const message = [
      "Здравствуйте! Хочу сделать заказ в пирожковой «Марфа и медведь»:",
      "",
      ...rows.map((item, index) => `${index + 1}. ${getItemName(item)} — ${item.quantity} шт.`),
      "",
      `Предварительная сумма: ${total.toLocaleString("ru-RU")} ₽`,
      "",
      "Пожалуйста, подтвердите наличие и время готовности."
    ].join("\n");

    orderLink.href = `https://wa.me/79112875453?text=${encodeURIComponent(message)}`;
    orderLink.classList.remove("disabled");

  };

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-cart-add]");
    if (addButton) {
      changeQuantity(addButton.dataset.cartAdd, 1);
      return;
    }

    const quantityButton = event.target.closest("[data-cart-change]");
    if (quantityButton) {
      changeQuantity(
        quantityButton.dataset.productId,
        Number(quantityButton.dataset.cartChange)
      );
    }
  });

  document.addEventListener("marfa:products-rendered", renderProductControls);

  openButton?.addEventListener("click", openCart);
  closeButton?.addEventListener("click", closeCart);
  overlay?.addEventListener("click", closeCart);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCart();
  });

  renderCart();
});
