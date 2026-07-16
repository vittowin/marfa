
document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const openButton = document.getElementById("cartOpen");
  const closeButton = document.getElementById("cartClose");
  const overlay = document.getElementById("cartOverlay");
  const panel = document.getElementById("cartPanel");
  const itemsBox = document.getElementById("cartItems");
  const countBox = document.getElementById("cartCount");
  const totalBox = document.getElementById("cartTotal");
  const orderLink = document.getElementById("cartOrder");

  if (!panel) return;

  const openCart = () => {
    panel.classList.add("open");
    overlay.classList.add("open");
    document.body.classList.add("lock");
  };

  const closeCart = () => {
    panel.classList.remove("open");
    overlay.classList.remove("open");
    document.body.classList.remove("lock");
  };

  const renderCart = () => {
    const grouped = {};

    cart.forEach((item) => {
      if (!grouped[item.id]) {
        grouped[item.id] = { ...item, quantity: 0 };
      }
      grouped[item.id].quantity += 1;
    });

    const rows = Object.values(grouped);
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    countBox.textContent = String(cart.length);
    totalBox.textContent = `${total.toLocaleString("ru-RU")} ₽`;

    if (!rows.length) {
      itemsBox.innerHTML = '<div class="cart-empty">Корзина пока пуста.</div>';
      orderLink.classList.add("disabled");
      orderLink.href = "#";
      return;
    }

    itemsBox.innerHTML = rows.map((item) => `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <span>${item.quantity} шт. × ${item.price.toLocaleString("ru-RU")} ₽</span>
        </div>
        <button class="cart-remove" type="button" data-remove="${item.id}" aria-label="Удалить позицию">×</button>
      </div>
    `).join("");

    const message = [
      "Здравствуйте! Хочу сделать заказ в пирожковой «Марфа и медведь»:",
      "",
      ...rows.map((item, index) => `${index + 1}. ${item.name} — ${item.quantity} шт.`),
      "",
      `Предварительная сумма: ${total.toLocaleString("ru-RU")} ₽`,
      "",
      "Пожалуйста, подтвердите наличие и время готовности."
    ].join("\n");

    orderLink.href = `https://wa.me/79112875453?text=${encodeURIComponent(message)}`;
    orderLink.classList.remove("disabled");

    document.querySelectorAll("[data-remove]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = cart.findIndex((item) => item.id === button.dataset.remove);
        if (index !== -1) cart.splice(index, 1);
        renderCart();
      });
    });
  };

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-product]");
    if (!addButton || !window.MARFA_PRODUCTS) return;

    const product = window.MARFA_PRODUCTS.find(
      (item) => item.id === addButton.dataset.product
    );

    if (!product) return;

    cart.push(product);
    addButton.textContent = "Добавлено";
    addButton.style.background = "var(--orange)";

    setTimeout(() => {
      addButton.textContent = "В корзину";
      addButton.style.background = "";
    }, 800);

    renderCart();
  });

  openButton?.addEventListener("click", openCart);
  closeButton?.addEventListener("click", closeCart);
  overlay?.addEventListener("click", closeCart);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCart();
  });

  renderCart();
});
