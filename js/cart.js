document.addEventListener("DOMContentLoaded", () => {
  const cart = new Map();
  const productChoices = new Map();
  const cakeInscriptions = new Map();
  const inscriptionPrice = 300;

  const openButton = document.getElementById("cartOpen");
  const closeButton = document.getElementById("cartClose");
  const overlay = document.getElementById("cartOverlay");
  const panel = document.getElementById("cartPanel");
  const title = document.getElementById("cartTitle");
  const cartView = document.getElementById("cartView");
  const itemsBox = document.getElementById("cartItems");
  const countBox = document.getElementById("cartCount");
  const totalBox = document.getElementById("cartTotal");
  const checkoutButton = document.getElementById("cartCheckout");
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutBack = document.getElementById("checkoutBack");
  const checkoutOptions = document.getElementById("checkoutProductOptions");
  const checkoutTotal = document.getElementById("checkoutTotal");
  const nameField = document.getElementById("customerName");
  const dateField = document.getElementById("orderDate");
  const timeField = document.getElementById("orderTime");
  const addressField = document.getElementById("deliveryAddress");
  const addressFieldWrap = document.getElementById("deliveryAddressField");
  const commentField = document.getElementById("orderComment");

  if (!panel || !checkoutForm) return;

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const getItemName = (item) => (
    Number.isFinite(item.weight)
      ? `${item.name}, ${item.weight.toLocaleString("ru-RU")} г`
      : item.name
  );

  const getRows = () => Array.from(cart, ([productId, quantity]) => {
    const product = window.MARFA_PRODUCTS?.find((item) => item.id === productId);
    return product ? { ...product, quantity } : null;
  }).filter(Boolean);

  const getBaseTotal = () => getRows().reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getInscriptionTotal = () => getRows().reduce((sum, item) => {
    if (item.category !== "cakes") return sum;

    return sum + Array.from({ length: item.quantity }, (_, index) => (
      cakeInscriptions.get(`${item.id}:${index}`)?.trim() ? inscriptionPrice : 0
    )).reduce((itemSum, price) => itemSum + price, 0);
  }, 0);

  const updateCheckoutTotal = () => {
    const total = getBaseTotal() + getInscriptionTotal();
    checkoutTotal.textContent = `${total.toLocaleString("ru-RU")} ₽`;
  };

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

  const showCartStep = () => {
    cartView.hidden = false;
    checkoutForm.hidden = true;
    title.textContent = "Ваш заказ";
    checkoutButton?.focus();
  };

  const renderCheckoutOptions = () => {
    const rowsWithOptions = getRows().filter(
      (item) => item.choiceOptions?.length || item.category === "cakes"
    );

    if (!rowsWithOptions.length) {
      checkoutOptions.innerHTML = "";
      return;
    }

    checkoutOptions.innerHTML = `
      <h4>Детали позиций</h4>
      ${rowsWithOptions.map((item) => `
        <div class="checkout-option-group">
          <strong>${escapeHtml(getItemName(item))}</strong>
          ${Array.from({ length: item.quantity }, (_, index) => {
            const numberSuffix = item.quantity > 1 ? ` №${index + 1}` : "";
            const key = `${item.id}:${index}`;
            const selectedChoice = productChoices.get(key) || "";
            const inscription = cakeInscriptions.get(key) || "";

            return `
              ${item.choiceOptions?.length ? `
                <label class="checkout-field checkout-field--nested">
                  <span>Начинка${numberSuffix}</span>
                  <select required data-product-choice="${escapeHtml(item.id)}" data-choice-index="${index}">
                    <option value="">Выберите начинку</option>
                    ${item.choiceOptions.map((option) => `
                      <option value="${escapeHtml(option)}"${option === selectedChoice ? " selected" : ""}>${escapeHtml(option)}</option>
                    `).join("")}
                  </select>
                </label>
              ` : ""}
              ${item.category === "cakes" ? `
                <label class="checkout-field checkout-field--nested">
                  <span>Надпись на торте${numberSuffix} <small>по желанию, +${inscriptionPrice} ₽</small></span>
                  <input type="text" maxlength="100" value="${escapeHtml(inscription)}" data-cake-inscription="${escapeHtml(item.id)}" data-choice-index="${index}" placeholder="Например, С днём рождения!">
                </label>
              ` : ""}
            `;
          }).join("")}
        </div>
      `).join("")}
    `;
  };

  const showCheckoutStep = () => {
    if (!cart.size) return;
    renderCheckoutOptions();
    updateCheckoutTotal();
    cartView.hidden = true;
    checkoutForm.hidden = false;
    title.textContent = "Оформление заказа";
    nameField?.focus();
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

  const trimItemDetails = (productId, quantity) => {
    for (const key of [...productChoices.keys(), ...cakeInscriptions.keys()]) {
      const [keyProductId, rawIndex] = key.split(":");
      if (keyProductId === productId && Number(rawIndex) >= quantity) {
        productChoices.delete(key);
        cakeInscriptions.delete(key);
      }
    }
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

    trimItemDetails(productId, Math.max(nextQuantity, 0));
    renderCart();
  };

  const renderCart = () => {
    const rows = getRows();
    const itemCount = rows.reduce((sum, item) => sum + item.quantity, 0);
    const total = getBaseTotal();

    countBox.textContent = String(itemCount);
    totalBox.textContent = `${total.toLocaleString("ru-RU")} ₽`;
    renderProductControls();

    if (!rows.length) {
      itemsBox.innerHTML = '<div class="cart-empty">Корзина пока пуста.</div>';
      checkoutButton.classList.add("disabled");
      checkoutButton.disabled = true;
      showCartStep();
      return;
    }

    itemsBox.innerHTML = rows.map((item) => `
      <div class="cart-item">
        <div class="cart-item-copy">
          <strong>${escapeHtml(getItemName(item))}</strong>
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

    checkoutButton.classList.remove("disabled");
    checkoutButton.disabled = false;
  };

  const toggleAddressField = () => {
    const fulfillment = checkoutForm.elements.fulfillment.value;
    const isDelivery = fulfillment === "Доставка";
    addressFieldWrap.hidden = !isDelivery;
    addressField.required = isDelivery;
    if (!isDelivery) addressField.setCustomValidity("");
  };

  const formatDate = (value) => new Date(`${value}T00:00:00`).toLocaleDateString(
    "ru-RU",
    { day: "2-digit", month: "2-digit", year: "numeric" }
  );

  const getItemDetails = (item) => {
    const details = [];

    if (item.choiceOptions?.length) {
      const choices = Array.from(
        { length: item.quantity },
        (_, index) => productChoices.get(`${item.id}:${index}`)
      );
      details.push(item.quantity === 1
        ? `   Начинка: ${choices[0]}`
        : `   Начинки: ${choices.map((choice, index) => `${index + 1} — ${choice}`).join("; ")}`
      );
    }

    if (item.category === "cakes") {
      const inscriptions = Array.from(
        { length: item.quantity },
        (_, index) => {
          const inscription = cakeInscriptions.get(`${item.id}:${index}`)?.trim();
          return inscription ? `${inscription} (+${inscriptionPrice} ₽)` : "не нужна";
        }
      );
      details.push(item.quantity === 1
        ? `   Надпись: ${inscriptions[0]}`
        : `   Надписи: ${inscriptions.map((inscription, index) => `${index + 1} — ${inscription}`).join("; ")}`
      );
    }

    return details;
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

  checkoutOptions.addEventListener("change", (event) => {
    const choice = event.target.closest("[data-product-choice]");
    if (!choice) return;
    productChoices.set(`${choice.dataset.productChoice}:${choice.dataset.choiceIndex}`, choice.value);
  });

  checkoutOptions.addEventListener("input", (event) => {
    const inscription = event.target.closest("[data-cake-inscription]");
    if (!inscription) return;
    cakeInscriptions.set(
      `${inscription.dataset.cakeInscription}:${inscription.dataset.choiceIndex}`,
      inscription.value
    );
    updateCheckoutTotal();
  });

  checkoutForm.addEventListener("change", (event) => {
    if (event.target.name === "fulfillment") toggleAddressField();
  });

  nameField.addEventListener("input", () => nameField.setCustomValidity(""));
  addressField.addEventListener("input", () => addressField.setCustomValidity(""));

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const customerName = nameField.value.trim();
    const deliveryAddress = addressField.value.trim();
    const fulfillment = checkoutForm.elements.fulfillment.value;

    if (!customerName) {
      nameField.setCustomValidity("Укажите имя");
      nameField.reportValidity();
      return;
    }

    if (fulfillment === "Доставка" && !deliveryAddress) {
      addressField.setCustomValidity("Укажите адрес доставки");
      addressField.reportValidity();
      return;
    }

    const rows = getRows();
    const total = getBaseTotal() + getInscriptionTotal();
    const productLines = rows.flatMap((item, index) => [
      `${index + 1}. ${getItemName(item)} — ${item.quantity} шт.`,
      ...getItemDetails(item)
    ]);
    const message = [
      "Здравствуйте! Хочу сделать заказ в пирожковой «Марфа и медведь»:",
      "",
      ...productLines,
      "",
      `Способ получения: ${fulfillment}`,
      `Желаемые дата и время: ${formatDate(dateField.value)}, ${timeField.value}`,
      `Имя: ${customerName}`,
      ...(fulfillment === "Доставка" ? [`Адрес доставки: ${deliveryAddress}`] : []),
      `Комментарий: ${commentField.value.trim() || "нет"}`,
      "",
      `Предварительная сумма: ${total.toLocaleString("ru-RU")} ₽`,
      "",
      "Пожалуйста, подтвердите наличие, время готовности и итоговую стоимость."
    ].join("\n");

    window.location.href = `https://wa.me/79112875453?text=${encodeURIComponent(message)}`;
  });

  document.addEventListener("marfa:products-rendered", renderProductControls);

  openButton?.addEventListener("click", openCart);
  closeButton?.addEventListener("click", closeCart);
  overlay?.addEventListener("click", closeCart);
  checkoutButton?.addEventListener("click", showCheckoutStep);
  checkoutBack?.addEventListener("click", showCartStep);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCart();
  });

  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  dateField.min = localToday;
  toggleAddressField();
  renderCart();
});
