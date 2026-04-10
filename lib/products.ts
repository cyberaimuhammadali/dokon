import { Product, Category } from './types';

export const categories: Category[] = [
  { id: 'meat',       name: { uz: "Go'sht",      ru: 'Мясо'        }, emoji: '🥩' },
  { id: 'dairy',      name: { uz: 'Sut',          ru: 'Молочные'    }, emoji: '🥛' },
  { id: 'bread',      name: { uz: 'Non',          ru: 'Хлеб'        }, emoji: '🥖' },
  { id: 'vegetables', name: { uz: 'Sabzavot',     ru: 'Овощи'       }, emoji: '🥦' },
  { id: 'fruits',     name: { uz: 'Mevalar',      ru: 'Фрукты'      }, emoji: '🍎' },
  { id: 'drinks',     name: { uz: 'Ichimlik',     ru: 'Напитки'     }, emoji: '🧃' },
  { id: 'grocery',    name: { uz: 'Oziq-ovqat',   ru: 'Бакалея'     }, emoji: '🛒' },
  { id: 'sweets',     name: { uz: 'Shirinlik',    ru: 'Сладости'    }, emoji: '🍬' },
];

export const products: Product[] = [
  // GO'SHT
  { id: 1,  name: { uz: "Mol go'shti (1 kg)",    ru: 'Говядина (1 кг)'     }, price: 68000, categoryId: 'meat',       unit: '1 kg',   emoji: '🥩' },
  { id: 2,  name: { uz: "Tovuq go'shti (1 kg)",  ru: 'Курица (1 кг)'       }, price: 34000, categoryId: 'meat',       unit: '1 kg',   emoji: '🍗' },
  { id: 3,  name: { uz: "Qiyma go'sht (1 kg)",   ru: 'Фарш (1 кг)'         }, price: 65000, categoryId: 'meat',       unit: '1 kg',   emoji: '🥩' },
  { id: 4,  name: { uz: 'Baliq (1 kg)',           ru: 'Рыба (1 кг)'         }, price: 45000, categoryId: 'meat',       unit: '1 kg',   emoji: '🐟' },
  { id: 5,  name: { uz: 'Kolbasa (500g)',         ru: 'Колбаса (500г)'      }, price: 32000, categoryId: 'meat',       unit: '500g',   emoji: '🌭' },
  { id: 6,  name: { uz: 'Jigar (1 kg)',           ru: 'Печень (1 кг)'       }, price: 28000, categoryId: 'meat',       unit: '1 kg',   emoji: '🥩' },
  { id: 7,  name: { uz: 'Tovuq dumi (1 kg)',      ru: 'Окорочка (1 кг)'     }, price: 29000, categoryId: 'meat',       unit: '1 kg',   emoji: '🍗' },
  { id: 8,  name: { uz: 'Sosiska (500g)',         ru: 'Сосиски (500г)'      }, price: 30000, categoryId: 'meat',       unit: '500g',   emoji: '🌭' },

  // SUT
  { id: 16, name: { uz: 'Sut (1 litr)',           ru: 'Молоко (1 л)'        }, price: 8500,  categoryId: 'dairy',      unit: '1 L',    emoji: '🥛' },
  { id: 17, name: { uz: 'Kefir (1 litr)',         ru: 'Кефир (1 л)'         }, price: 9500,  categoryId: 'dairy',      unit: '1 L',    emoji: '🥛' },
  { id: 18, name: { uz: 'Qatiq (1 litr)',         ru: 'Катык (1 л)'         }, price: 10000, categoryId: 'dairy',      unit: '1 L',    emoji: '🥛' },
  { id: 19, name: { uz: "Pishloq (200g)",         ru: 'Сыр (200г)'          }, price: 28000, categoryId: 'dairy',      unit: '200g',   emoji: '🧀' },
  { id: 20, name: { uz: "Sariyog' (200g)",        ru: 'Масло (200г)'        }, price: 20000, categoryId: 'dairy',      unit: '200g',   emoji: '🧈' },
  { id: 21, name: { uz: 'Qaymoq (500g)',          ru: 'Сметана (500г)'      }, price: 15000, categoryId: 'dairy',      unit: '500g',   emoji: '🥛' },
  { id: 22, name: { uz: 'Tvorog (500g)',          ru: 'Творог (500г)'       }, price: 18000, categoryId: 'dairy',      unit: '500g',   emoji: '🥛' },
  { id: 26, name: { uz: 'Tuxum (10 dona)',        ru: 'Яйца (10 шт)'        }, price: 22000, categoryId: 'dairy',      unit: '10 dona',emoji: '🥚' },

  // NON
  { id: 31, name: { uz: 'Oq non (baton)',         ru: 'Белый хлеб'          }, price: 7000,  categoryId: 'bread',      unit: 'dona',   emoji: '🥖' },
  { id: 32, name: { uz: 'Lepyoshka (1 dona)',     ru: 'Лепёшка'             }, price: 6000,  categoryId: 'bread',      unit: 'dona',   emoji: '🫓' },
  { id: 33, name: { uz: "Bug'doy non",            ru: 'Хлеб пшеничный'      }, price: 8000,  categoryId: 'bread',      unit: 'dona',   emoji: '🥖' },
  { id: 34, name: { uz: 'Somsa (3 dona)',         ru: 'Самса (3 шт)'        }, price: 12000, categoryId: 'bread',      unit: '3 dona', emoji: '🥟' },
  { id: 35, name: { uz: 'Pirozhki (3 dona)',      ru: 'Пирожки (3 шт)'      }, price: 9000,  categoryId: 'bread',      unit: '3 dona', emoji: '🥐' },
  { id: 36, name: { uz: 'Bulochka (5 dona)',      ru: 'Булочки (5 шт)'      }, price: 10000, categoryId: 'bread',      unit: '5 dona', emoji: '🍞' },

  // SABZAVOT
  { id: 43, name: { uz: 'Pomidor (1 kg)',         ru: 'Помидоры'            }, price: 8000,  categoryId: 'vegetables', unit: '1 kg',   emoji: '🍅' },
  { id: 44, name: { uz: 'Bodring (1 kg)',         ru: 'Огурцы'              }, price: 7000,  categoryId: 'vegetables', unit: '1 kg',   emoji: '🥒' },
  { id: 45, name: { uz: 'Kartoshka (1 kg)',       ru: 'Картофель'           }, price: 5000,  categoryId: 'vegetables', unit: '1 kg',   emoji: '🥔' },
  { id: 46, name: { uz: 'Piyoz (1 kg)',           ru: 'Лук'                 }, price: 4000,  categoryId: 'vegetables', unit: '1 kg',   emoji: '🧅' },
  { id: 47, name: { uz: 'Sabzi (1 kg)',           ru: 'Морковь'             }, price: 5000,  categoryId: 'vegetables', unit: '1 kg',   emoji: '🥕' },
  { id: 48, name: { uz: 'Karam (1 bosh)',         ru: 'Капуста'             }, price: 8000,  categoryId: 'vegetables', unit: '1 bosh', emoji: '🥬' },
  { id: 49, name: { uz: "Ko'k piyoz (1 bog')",   ru: 'Зелёный лук'         }, price: 3000,  categoryId: 'vegetables', unit: "1 bog'", emoji: '🌿' },
  { id: 50, name: { uz: 'Limon (1 kg)',           ru: 'Лимон (1 кг)'        }, price: 18000, categoryId: 'vegetables', unit: '1 kg',   emoji: '🍋' },
  { id: 51, name: { uz: 'Sarimsoq (1 bosh)',      ru: 'Чеснок'              }, price: 5000,  categoryId: 'vegetables', unit: '1 bosh', emoji: '🧄' },
  { id: 52, name: { uz: "Qalampir (1 kg)",        ru: 'Перец (1 кг)'        }, price: 12000, categoryId: 'vegetables', unit: '1 kg',   emoji: '🌶️' },

  // MEVALAR
  { id: 63, name: { uz: 'Olma (1 kg)',            ru: 'Яблоки'              }, price: 13000, categoryId: 'fruits',     unit: '1 kg',   emoji: '🍎' },
  { id: 64, name: { uz: 'Banan (1 kg)',           ru: 'Бананы'              }, price: 16000, categoryId: 'fruits',     unit: '1 kg',   emoji: '🍌' },
  { id: 65, name: { uz: 'Uzum (1 kg)',            ru: 'Виноград'            }, price: 20000, categoryId: 'fruits',     unit: '1 kg',   emoji: '🍇' },
  { id: 66, name: { uz: 'Apelsin (1 kg)',         ru: 'Апельсины'           }, price: 15000, categoryId: 'fruits',     unit: '1 kg',   emoji: '🍊' },
  { id: 67, name: { uz: "Nok (1 kg)",             ru: 'Груша (1 кг)'        }, price: 18000, categoryId: 'fruits',     unit: '1 kg',   emoji: '🍐' },
  { id: 68, name: { uz: "Gilos (1 kg)",           ru: 'Черешня (1 кг)'      }, price: 25000, categoryId: 'fruits',     unit: '1 kg',   emoji: '🍒' },
  { id: 69, name: { uz: "Qovun (1 dona)",         ru: 'Дыня (1 шт)'         }, price: 30000, categoryId: 'fruits',     unit: '1 dona', emoji: '🍈' },
  { id: 70, name: { uz: "Tarvuz (1 kg)",          ru: 'Арбуз (1 кг)'        }, price: 8000,  categoryId: 'fruits',     unit: '1 kg',   emoji: '🍉' },

  // ICHIMLIK
  { id: 78, name: { uz: 'Coca-Cola (1.5L)',       ru: 'Coca-Cola (1.5L)'    }, price: 14000, categoryId: 'drinks',     unit: '1.5L',   emoji: '🥤' },
  { id: 79, name: { uz: 'Pepsi (1.5L)',           ru: 'Pepsi (1.5L)'        }, price: 13000, categoryId: 'drinks',     unit: '1.5L',   emoji: '🥤' },
  { id: 80, name: { uz: 'Fanta (1L)',             ru: 'Fanta (1L)'          }, price: 10000, categoryId: 'drinks',     unit: '1L',     emoji: '🥤' },
  { id: 81, name: { uz: 'Sharbat (1L)',           ru: 'Сок (1л)'            }, price: 12000, categoryId: 'drinks',     unit: '1L',     emoji: '🧃' },
  { id: 82, name: { uz: 'Suv (1.5L)',             ru: 'Вода (1.5L)'         }, price: 4000,  categoryId: 'drinks',     unit: '1.5L',   emoji: '💧' },
  { id: 83, name: { uz: "Choy (100g)",            ru: 'Чай (100г)'          }, price: 18000, categoryId: 'drinks',     unit: '100g',   emoji: '🍵' },
  { id: 84, name: { uz: "Qahva (200g)",           ru: 'Кофе (200г)'         }, price: 45000, categoryId: 'drinks',     unit: '200g',   emoji: '☕' },
  { id: 85, name: { uz: "Kompot (1L)",            ru: 'Компот (1л)'         }, price: 8000,  categoryId: 'drinks',     unit: '1L',     emoji: '🍶' },

  // OZIQ-OVQAT
  { id: 93, name: { uz: 'Guruch (1 kg)',          ru: 'Рис'                 }, price: 18000, categoryId: 'grocery',    unit: '1 kg',   emoji: '🍚' },
  { id: 94, name: { uz: "Makaron (500g)",         ru: 'Макароны'            }, price: 8000,  categoryId: 'grocery',    unit: '500g',   emoji: '🍝' },
  { id: 95, name: { uz: "Un (2 kg)",              ru: 'Мука (2 кг)'         }, price: 16000, categoryId: 'grocery',    unit: '2 kg',   emoji: '🌾' },
  { id: 96, name: { uz: "Tuz (1 kg)",             ru: 'Соль (1 кг)'         }, price: 4000,  categoryId: 'grocery',    unit: '1 kg',   emoji: '🧂' },
  { id: 97, name: { uz: 'Shakar (1 kg)',          ru: 'Сахар'               }, price: 9500,  categoryId: 'grocery',    unit: '1 kg',   emoji: '🍬' },
  { id: 98, name: { uz: "Yog' (1L)",              ru: 'Масло раст.'         }, price: 24000, categoryId: 'grocery',    unit: '1L',     emoji: '🫙' },
  { id: 99, name: { uz: "Tomat pasta (500g)",     ru: 'Томатная паста'      }, price: 12000, categoryId: 'grocery',    unit: '500g',   emoji: '🥫' },
  { id: 100, name: { uz: "Qora qalampir (100g)", ru: 'Перец чёрный'        }, price: 6000,  categoryId: 'grocery',    unit: '100g',   emoji: '🫙' },

  // SHIRINLIK
  { id: 132, name: { uz: 'Shokolad (100g)',       ru: 'Шоколад'             }, price: 16000, categoryId: 'sweets',     unit: '100g',   emoji: '🍫' },
  { id: 133, name: { uz: "Pechenye (300g)",       ru: 'Печенье (300г)'      }, price: 14000, categoryId: 'sweets',     unit: '300g',   emoji: '🍪' },
  { id: 134, name: { uz: "Konfet (300g)",         ru: 'Конфеты (300г)'      }, price: 22000, categoryId: 'sweets',     unit: '300g',   emoji: '🍬' },
  { id: 135, name: { uz: "Vafel (200g)",          ru: 'Вафли (200г)'        }, price: 12000, categoryId: 'sweets',     unit: '200g',   emoji: '🧇' },
  { id: 136, name: { uz: "Zefir (300g)",          ru: 'Зефир (300г)'        }, price: 18000, categoryId: 'sweets',     unit: '300g',   emoji: '☁️' },
  { id: 137, name: { uz: "Tort (1 kg)",           ru: 'Торт (1 кг)'         }, price: 80000, categoryId: 'sweets',     unit: '1 kg',   emoji: '🎂' },
  { id: 140, name: { uz: 'Asal (500g)',           ru: 'Мёд'                 }, price: 55000, categoryId: 'sweets',     unit: '500g',   emoji: '🍯' },
  { id: 141, name: { uz: "Murabbo (500g)",        ru: 'Варенье (500г)'      }, price: 24000, categoryId: 'sweets',     unit: '500g',   emoji: '🫙' },
];

export const getProductById = (id: number) => products.find((p) => p.id === id);
export const getProductsByCategory = (catId: string) => products.filter((p) => p.categoryId === catId);
