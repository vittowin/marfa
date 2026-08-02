
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

  const getWords = (value) => normalizeText(value).match(/[a-zа-я0-9]+/g) || [];

  const getWordStem = (word) => {
    if (word.length <= 4) return word;

    const endings = [
      "иями", "ями", "ами", "ого", "его", "ому", "ему",
      "ией", "ая", "яя", "ое", "ее", "ий", "ый",
      "ой", "ах", "ях", "ам", "ям", "ом", "ем", "ов", "ев",
      "ей", "ью", "ия", "ья", "ы", "и", "а", "я", "у", "ю",
      "е", "о", "ь"
    ];
    const ending = endings.find(
      (candidate) => word.endsWith(candidate) && word.length - candidate.length >= 4
    );

    return ending ? word.slice(0, -ending.length) : word;
  };

  const wordsMatch = (queryWord, productWord) => {
    if (queryWord === productWord) return true;

    const queryStem = getWordStem(queryWord);
    const productStem = getWordStem(productWord);
    if (queryStem === productStem) return true;

    if (queryStem.length < 4 || productStem.length < 4) return false;

    let commonLength = 0;
    const limit = Math.min(queryStem.length, productStem.length);
    while (
      commonLength < limit &&
      queryStem[commonLength] === productStem[commonLength]
    ) {
      commonLength += 1;
    }

    return commonLength >= 5;
  };

  const matchesQuery = (text, query) => {
    if (!query) return true;

    const normalizedText = normalizeText(text);
    if (normalizedText.includes(query)) return true;

    const queryWords = getWords(query);
    const productWords = getWords(normalizedText);
    return queryWords.every((queryWord) =>
      productWords.some((productWord) => wordsMatch(queryWord, productWord))
    );
  };

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
      const matchesSearch = matchesQuery(card.textContent || "", query);

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
