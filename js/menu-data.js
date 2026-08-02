const createCatalogSection = (items, defaults) => items.map((item) => {
  const [id, name, weight, price, description, image, choiceOptions] = item;

  return {
    ...defaults,
    id,
    name,
    weight,
    price,
    description: description || defaults.description,
    ...(image ? { image } : {}),
    ...(choiceOptions ? { choiceOptions } : {})
  };
});

const wheatPies = createCatalogSection([
  ["wheat-cabbage-egg", "Пирожок с капустой и яйцом", 85, 70, null, "images/products/pies/pie-cabbage-egg.jpg"],
  ["wheat-apple", "Пирожок с яблоком", 80, 70, null, "images/products/pies/pie-apple.jpg"],
  ["wheat-cottage-cheese", "Пирожок с творогом", 80, 70, null, "images/products/pies/pie-cottage-cheese.jpg"],
  ["wheat-condensed-milk", "Пирожок со сгущёнкой", 80, 70, null, "images/products/pies/pie-condensed-milk.jpg"],
  ["wheat-strawberry", "Пирожок с клубникой", 70, 70, null, "images/products/pies/pie-strawberry.jpg"],
  ["wheat-cherry", "Пирожок с вишней", 70, 70, null, "images/products/pies/pie-cherry.jpg"],
  ["wheat-blueberry", "Пирожок с черникой", 70, 70, null, "images/products/pies/pie-blueberry.jpg"],
  ["wheat-raspberry", "Пирожок с малиной", 70, 70, null, "images/products/pies/pie-raspberry.jpg"],
  ["wheat-lingonberry", "Пирожок с брусникой", 70, 70, null, "images/products/pies/pie-lingonberry.jpg"],
  ["wheat-apricot", "Пирожок с абрикосом", 70, 70, null, "images/products/pies/pie-apricot.jpg"],
  ["wheat-poppy-bun", "Булочка с маком", 80, 70, null, "images/products/pies/pie-poppy.jpg"],
  ["wheat-cinnamon-bun", "Булочка с корицей", 80, 65, null, "images/products/pies/pie-cinnamon.jpg"],
  ["wheat-rice-egg", "Пирожок с рисом и яйцом", 90, 70, null, "images/products/pies/pie-rice-egg.jpg"],
  ["wheat-potato", "Пирожок с картошкой", 90, 70, null, "images/products/pies/pie-potato.jpg"],
  ["wheat-sausage", "Сосиска в тесте", 90, 80, null, "images/products/pies/pie-sausage.jpg"],
  ["wheat-beef-onion", "Пирожок с говядиной и жареным луком", 80, 80, null, "images/products/pies/pie-beef-onion.jpg"],
  ["wheat-ham-cheese", "Пирожок с ветчиной и сыром", 80, 80, null, "images/products/pies/pie-ham-cheese.jpg"],
  ["wheat-lemon", "Пирожок с лимоном", 80, 70, null, "images/products/pies/pie-lemon.jpg"],
  ["wheat-green-onion-egg", "Пирожок с зелёным луком и яйцом", 75, 70, null, "images/products/pies/pie-green-onion-egg.jpg"],
  ["wheat-chicken-onion", "Пирожок с курицей и жареным луком", 80, 80, null, "images/products/pies/pie-chicken-onion.jpg"],
  ["wheat-liver-onion", "Пирожок с говяжьей печенью и жареным луком", 80, 80, null, "images/products/pies/pie-liver-onion.jpg"],
  ["wheat-carrot-egg", "Пирожок с морковью и яйцом", 90, 70, null, "images/products/pies/pie-carrot-egg.jpg"],
  ["wheat-beef-cabbage", "Пирожок с мясом и капустой", 90, 70, null, "images/products/pies/pie-beef-cabbage.jpg"]
], {
  category: "pies",
  categoryLabel: "Пшеничная мука",
  description: ""
});

const multigrainPies = createCatalogSection([
  ["multigrain-cabbage", "Пирожок с капустой", 85, 70, null, "images/products/pies/pie-multigrain-cabbage.jpg"],
  ["multigrain-apple", "Пирожок с яблоком", 80, 70, null, "images/products/pies/pie-multigrain-apple.jpg"],
  ["multigrain-blueberry", "Пирожок с черникой", 70, 70, null, "images/products/pies/pie-blueberry.jpg"],
  ["multigrain-green-onion-rice", "Пирожок с зелёным луком и рисом", 70, 70, null, "images/products/pies/pie-multigrain-green-onion-rice.jpg"],
  ["multigrain-potato", "Пирожок с картошкой", 85, 70, null, "images/products/pies/pie-potato.jpg"],
  ["multigrain-buckwheat-onion", "Пирожок с гречей и жареным луком", 85, 70, null, "images/products/pies/pie-multigrain-buckwheat-onion.jpg"],
  ["multigrain-beef-onion", "Пирожок с говядиной и жареным луком", 80, 80, null, "images/products/pies/pie-beef-onion.jpg"],
  ["multigrain-ham-cheese", "Пирожок с ветчиной и сыром", 80, 80, null, "images/products/pies/pie-ham-cheese.jpg"],
  ["multigrain-apple-cherry", "Пирожок с яблоком и вишней", 80, 70, null, "images/products/pies/pie-multigrain-apple-cherry.jpg"],
  ["multigrain-cottage-cheese", "Пирожок с творогом", 80, 70, null, "images/products/pies/pie-cottage-cheese.jpg"],
  ["multigrain-vegetable", "Пирожок с овощами", 80, 70, null, "images/products/pies/pie-multigrain-vegetable.jpg"],
  ["multigrain-carrot-apple", "Пирожок с морковью и яблоком", 85, 70, null, "images/products/pies/pie-multigrain-carrot-apple.jpg"],
  ["multigrain-rice-lentils", "Пирожок с рисом и чечевицей", 85, 70, null, "images/products/pies/pie-multigrain-rice-lentils.jpg"]
], {
  category: "pies",
  categoryLabel: "Многозерновая мука",
  description: ""
});

const breads = createCatalogSection([
  ["bread-wheat-rye-bran", "Хлеб пшенично-ржаной с отрубями", 280, 75, null, "images/products/bread/bread-wheat-rye-bran.jpg"],
  ["bread-gray", "Хлеб серый", 250, 75, null, "images/products/bread/bread-gray.jpg"],
  ["bread-white-loaf", "Хлеб белый, буханка", 230, 75, null, "images/products/bread/bread-white-loaf.jpg"],
  ["bread-white-round", "Хлеб белый круглый", 400, 75, null, "images/products/bread/bread-white-round.jpg"],
  ["bread-white-round-small", "Хлеб белый круглый маленький", 180, 45, null, "images/products/bread/bread-white-round-small.jpg"],
  ["bread-rye-yeast-free", "Хлеб ржаной бездрожжевой", 280, 80, null, "images/products/bread/bread-rye-yeast-free.jpg"],
  ["bread-country-yeast-free", "Хлеб деревенский бездрожжевой", 280, 80, null, "images/products/bread/bread-country-yeast-free.jpg"],
  ["bread-wheat-sesame", "Хлеб пшеничный с кунжутом", 280, 75, null, "images/products/bread/bread-wheat-sesame.jpg"],
  ["bread-vienna-milk", "Хлеб венский молочный", 250, 80, null, "images/products/bread/bread-vienna-milk.jpg"],
  ["bread-darnitsky", "Хлеб Дарницкий", 250, 80, null, "images/products/bread/bread-darnitsky.jpg"],
  ["bread-ciabatta", "Чиабатта пшеничная", 200, 80, null, "images/products/bread/bread-ciabatta.jpg"],
  ["bread-onion-baguette", "Багет луковый", 250, 80, null, "images/products/bread/bread-onion-baguette.jpg"],
  ["bread-carrot-beet-garlic-baguette", "Багет морковно-свекольный с чесноком", 250, 80, null, "images/products/bread/bread-carrot-beet-garlic-baguette.jpg"],
  ["bread-wheat-baton", "Батон пшеничный", 400, 80, null, "images/products/bread/bread-wheat-baton.jpg"]
], {
  category: "bread",
  categoryLabel: "Хлеб",
  description: "Свежий хлеб собственного производства."
});

const savoryPies = createCatalogSection([
  ["savory-pie-cabbage-egg", "Пирог с капустой и яйцом", 1250, 900, null, "images/products/savory-pies/savory-pie-cabbage-egg.jpg"],
  ["savory-pie-cabbage", "Пирог с капустой", 1250, 900, null, "images/products/savory-pies/savory-pie-cabbage.jpg"],
  ["savory-pie-potato", "Пирог с картошкой", 1250, 900, null, "images/products/savory-pies/savory-pie-potato.jpg"],
  ["savory-pie-rice-egg", "Пирог с рисом и яйцом", 1250, 900, null, "images/products/savory-pies/savory-pie-rice-egg.jpg"],
  ["savory-pie-green-onion-egg", "Пирог с зелёным луком и яйцом", 1150, 940, null, "images/products/savory-pies/savory-pie-green-onion-egg.jpg"],
  ["savory-pie-green-onion-rice", "Пирог с зелёным луком и рисом", 1150, 940, null, "images/products/savory-pies/savory-pie-green-onion-rice.jpg"],
  ["savory-pie-vegetable", "Пирог с овощами", 1200, 940, null, "images/products/savory-pies/savory-pie-vegetable.jpg"],
  ["savory-pie-beef-cabbage", "Пирог с мясом и капустой", 1250, 990, null, "images/products/savory-pies/savory-pie-beef-cabbage.jpg"],
  ["savory-pie-ham-cheese", "Пирог с ветчиной и сыром", 1150, 990, null, "images/products/savory-pies/savory-pie-ham-cheese.jpg"],
  ["savory-pie-liver", "Пирог с говяжьей печенью", 1150, 990, null, "images/products/savory-pies/savory-pie-liver.jpg"],
  ["savory-pie-chicken", "Пирог с курицей", 1150, 1100, null, "images/products/savory-pies/savory-pie-chicken.jpg"],
  ["savory-pie-beef", "Пирог с говядиной", 1150, 1200, null, "images/products/savory-pies/savory-pie-beef.jpg"]
], {
  category: "savory-pies",
  categoryLabel: "Сытный пирог",
  description: "Выпекается на заказ. Круглая форма, диаметр 30 см."
});

const sweetPies = createCatalogSection([
  ["sweet-pie-apple", "Пирог с яблоком", 1300, 950, null, "images/products/sweet-pies/sweet-pie-apple.jpg"],
  ["sweet-pie-apple-lingonberry", "Пирог с яблоком и брусникой", 1300, 950, null, "images/products/sweet-pies/sweet-pie-apple-lingonberry.jpg"],
  ["sweet-pie-apple-lemon", "Пирог с яблоком и лимоном", 1300, 970, null, "images/products/sweet-pies/sweet-pie-apple-lemon.jpg"],
  ["sweet-pie-lemon", "Пирог с лимоном", 1100, 990, null, "images/products/sweet-pies/sweet-pie-lemon.jpg"],
  ["sweet-pie-apricot", "Пирог с абрикосом", 1100, 990, null, "images/products/sweet-pies/sweet-pie-apricot.jpg"],
  ["sweet-pie-raspberry", "Пирог с малиной", 1100, 990, null, "images/products/sweet-pies/sweet-pie-raspberry.jpg"],
  ["sweet-pie-curd-jam-large", "Пирог творожный с вареньем", 1300, 950, "Начинка на выбор: черника, малина, вишня, брусника, абрикос, клубника, киви, персик, чёрная смородина, мак или изюм.", "images/products/sweet-pies/sweet-pie-curd-jam.jpg", ["Черника", "Малина", "Вишня", "Брусника", "Абрикос", "Клубника", "Киви", "Персик", "Чёрная смородина", "Мак", "Изюм"]],
  ["sweet-pie-curd-jam-small", "Пирог творожный с вареньем", 600, 650, "Начинка на выбор: черника, малина, вишня, брусника, абрикос, клубника, киви, персик, чёрная смородина, мак или изюм.", "images/products/sweet-pies/sweet-pie-curd-jam.jpg", ["Черника", "Малина", "Вишня", "Брусника", "Абрикос", "Клубника", "Киви", "Персик", "Чёрная смородина", "Мак", "Изюм"]],
  ["sweet-pie-curd-banana-pineapple", "Пирог творожный с бананом или ананасом", 800, 700, "Песочное тесто; начинка с бананом или ананасом на выбор.", "images/products/sweet-pies/sweet-pie-curd-banana-pineapple.jpg", ["Банан", "Ананас"]]
], {
  category: "sweet-pies",
  categoryLabel: "Сладкий пирог",
  description: "Выпекается на заказ. Круглая форма, диаметр 28 или 16 см."
});

const cakes = createCatalogSection([
  ["cake-kids", "Торт «Детский»", 500, 1100, "Ванильный бисквит, сливки, сахарная пудра.", "images/products/cakes/cake-kids.jpg"],
  ["cake-tenderness", "Торт «Нежность»", 500, 990, "Ванильный бисквит, клубничное варенье, сливки.", "images/products/cakes/cake-tenderness.jpg"],
  ["cake-creme-brulee", "Торт «Крем-брюле»", 600, 1100, "Ванильный бисквит, крем-брюле, шоколад и какао.", "images/products/cakes/cake-creme-brulee.jpg"],
  ["cake-prague", "Торт «Прага» по ГОСТу", 800, 1100, "Шоколадный бисквит, крем «Прага» по ГОСТу, коньячная пропитка и абрикосовая прослойка.", "images/products/cakes/cake-prague.jpg"],
  ["cake-tiramisu", "Торт «Тирамису»", 600, 1250, "Шоколадный бисквит, мокка-ром, сливки, маскарпоне, какао и шоколад.", "images/products/cakes/cake-tiramisu.jpg"],
  ["cake-yogurt", "Торт «Йогуртовый»", 800, 1250, "Ванильный бисквит, йогуртовый крем «клубника-земляника» и сливки.", "images/products/cakes/cake-yogurt.jpg"],
  ["cake-napoleon", "Торт «Наполеон»", 800, 1250, "Слоёное тесто и заварной крем.", "images/products/cakes/cake-napoleon.jpg"],
  ["cake-blackcurrant", "Торт «Смородиновый»", 600, 1200, "Ванильный бисквит, смородиновое компоте, сливочно-творожный крем; декор из смородинового геля, марципана и сливочного крема.", "images/products/cakes/cake-blackcurrant.jpg"],
  ["cake-birds-milk", "Торт «Птичье молоко»", 600, 1450, "Шоколадный бисквит, суфле и шоколадная глазурь.", "images/products/cakes/cake-birds-milk.jpg"],
  ["cake-tulips", "Торт «Тюльпаны»", 500, 1050, "Ванильный бисквит, сливочный крем, сгущённое молоко и меренга.", "images/products/cakes/cake-tulips.jpg"],
  ["cake-bento", "Торт «Бенто»", 250, 750, "Ванильно-шоколадные бисквиты; банановый, клубничный или фисташковый крем на выбор.", "images/products/cakes/cake-bento.jpg", ["Банановый крем", "Клубничный крем", "Фисташковый крем"]],
  ["cake-berry-basket", "Торт «Ягодное лукошко»", 1100, 1550, "Ванильный бисквит, заварной крем «Дипломат», малина, красная и чёрная смородина, желе.", "images/products/cakes/cake-berry-basket.jpg"],
  ["cake-esterhazy", "Торт «Эстерхази»", 600, 1450, "Миндальные коржи, заварной крем «Эстерхази», миндальные лепестки, белый и тёмный гляссаж.", "images/products/cakes/cake-esterhazy.jpg"],
  ["cake-three-chocolates", "Торт «Три шоколада»", 800, 1900, "Шоколадно-шифоновый бисквит и суфле из белого, молочного и тёмного шоколада.", "images/products/cakes/cake-three-chocolates.jpg"],
  ["cake-red-velvet", "Торт «Красный бархат»", 600, 1800, "Коржи «Красный бархат», творожный крем и ягодное желе в ассортименте.", "images/products/cakes/cake-red-velvet.jpg"],
  ["cake-lemon", "Торт «Лимонный»", 500, 990, "Ванильный бисквит, сливочно-лимонный крем и лимонная пропитка.", "images/products/cakes/cake-lemon.jpg"]
], {
  category: "cakes",
  categoryLabel: "Торт",
  description: ""
});

window.MARFA_PRODUCTS = [
  ...wheatPies,
  ...multigrainPies,
  ...breads,
  ...savoryPies,
  ...sweetPies,
  ...cakes
];
