const data = {
  dome: {
    name: "Головний Купол", subtitle: "Командний центр бази",
    icon: "🏛️", category: "Командний центр", color: "#4fc3f7",
    image: "Kupol.png",
    description: "Центральна споруда бази на Марсі. Всі важливі рішення приймаються тут. Купол захищений від радіації багатошаровим склом та спеціальним магнітним полем. Усередині розміщені: штаб управління, медичний відсік, конференц-зал та особисті каюти командирів.",
    stats: [
      { label:"Площа", value:"1200 м²" }, { label:"Екіпаж", value:"12 осіб" },
      { label:"Побудовано", value:"2031" }, { label:"Тиск", value:"1.0 атм" }
    ]
  },
  hangar: {
    name: "Ангар & Злітна Площадка", subtitle: "Зона відльоту і посадки",
    icon: "🚀", category: "Транспорт", color: "#ffb74d",
    image: "Raketa.png",
    description: "Восьмикутна злітно-посадкова платформа для шатлів і дронів. Оснащена автоматичною системою заправки воднево-кисневим паливом. Тут базуються три марсоходи і два вантажні шатли для регулярного зв'язку з орбітальною станцією.",
    stats: [
      { label:"Ємність", value:"5 кораблів" }, { label:"Паливо", value:"H₂/O₂" },
      { label:"Злітів", value:"247" }, { label:"Дрони", value:"8 одиниць" }
    ]
  },
  greenhouse: {
    name: "Оранжерея", subtitle: "Виробництво їжі та кисню",
    icon: "🌱", category: "Біосфера", color: "#81c784",
    image: "Green.png",
    description: "Прозорий купол оранжереї — серце харчового забезпечення бази. Використовує гідропонні технології та спектральне LED-освітлення, що імітує земне сонце. Вирощуються: картопля, соя, томати, рис та зелень. Виробляє 40% кисню для бази.",
    stats: [
      { label:"Площа", value:"800 м²" }, { label:"Культури", value:"24 види" },
      { label:"Кисень", value:"40% норми" }, { label:"Урожай", value:"850 кг/міс" }
    ]
  },
  solar: {
    name: "Сонячна Електростанція", subtitle: "Основне джерело енергії",
    icon: "☀️", category: "Енергетика", color: "#fff176",
    image: "Panel.png",
    description: "Масив сонячних панелей нового покоління з ефективністю 42%. Хоча сонячне випромінювання на Марсі слабше, ніж на Землі, великий масив забезпечує достатньо енергії для всієї бази. Панелі автоматично очищаються від пилу кожні 6 годин.",
    stats: [
      { label:"Потужність", value:"850 кВт" }, { label:"Панелей", value:"3200 шт" },
      { label:"ККД", value:"42%" }, { label:"Заряд", value:"72 год" }
    ]
  },
  storage: {
    name: "Склад та Резервуари", subtitle: "Запаси води, газу та їжі",
    icon: "🛢️", category: "Логістика", color: "#b0bec5",
    image: "Rez.png",
    description: "Ряди циліндричних резервуарів зберігають запаси води, рідкого азоту і кисню. Запасів вистачає на 18 місяців автономної роботи без поставок з Землі. Підземні секції захищають продовольство від радіації та екстремальних температур.",
    stats: [
      { label:"Вода", value:"120 000 л" }, { label:"O₂", value:"45 000 л" },
      { label:"Їжа", value:"18 місяців" }, { label:"Паливо", value:"200 000 л" }
    ]
  },
  modules: {
    name: "Житлові Модулі", subtitle: "Будинки колоністів",
    icon: "🏠", category: "Житло", color: "#ce93d8",
    image: "Sleep.png",
    description: "Герметичні циліндричні капсули, з'єднані між собою тунелями-переходами. Кожна капсула розрахована на 4 особи. Усередині — каюти, кімнати відпочинку, їдальня та психологічна кімната з ілюзорним вікном, що проектує земні пейзажі.",
    stats: [
      { label:"Модулів", value:"6 штук" }, { label:"Мешканців", value:"24 особи" },
      { label:"Площа/особу", value:"18 м²" }, { label:"Темп.", value:"+22°C" }
    ]
  },
  rover: {
    name: "Гараж Марсоходів", subtitle: "Наземний транспорт",
    icon: "🚗", category: "Транспорт", color: "#ff8a65",
    image: "Car.png",
    description: "Захищений гараж для марсоходів і легкого всюдихідного транспорту. Марсоходи використовуються для геологічних досліджень, прокладання кабелів та аварійних операцій. Максимальний радіус вилазки — 500 км від бази.",
    stats: [
      { label:"Марсоходів", value:"3 одиниці" }, { label:"Радіус", value:"500 км" },
      { label:"Швидкість", value:"25 км/год" }, { label:"Запас ходу", value:"1200 км" }
    ]
  },
  comms: {
    name: "Антена Зв'язку", subtitle: "Зв'язок із Землею та орбітою",
    icon: "📡", category: "Комунікації", color: "#80cbc4",
    image: "Idk.png",
    description: "Головна антена для зв'язку з Землею та орбітальною станцією. Затримка сигналу від 3 до 22 хвилин залежно від розташування планет. Антена передає наукові дані, відеозв'язок із рідними та отримує оновлення програмного забезпечення.",
    stats: [
      { label:"Затримка", value:"3–22 хв" }, { label:"Швидкість", value:"100 Мбіт/с" },
      { label:"Діаметр", value:"12 м" }, { label:"Частота", value:"X-band" }
    ]
  }
};

const panel   = document.getElementById("infoPanel");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

function openPanel(id) {
  const obj = data[id];
  if (!obj) return;

  document.getElementById("panelImg").src = obj.image;
  document.getElementById("panelImg").alt = obj.name;
  document.getElementById("panelImgIcon").textContent = obj.icon;

  const badge = document.getElementById("panelBadge");
  badge.textContent = obj.category;
  badge.style.color = obj.color;
  badge.style.border = `1px solid ${obj.color}55`;
  badge.style.background = `${obj.color}18`;

  document.getElementById("panelTitle").textContent    = obj.name;
  document.getElementById("panelSubtitle").textContent = obj.subtitle;
  document.getElementById("panelDesc").textContent     = obj.description;

  document.getElementById("panelStats").innerHTML = obj.stats.map(s => `
    <div class="stat-card">
      <div class="stat-label">${s.label}</div>
      <div class="stat-value" style="color:${obj.color}">${s.value}</div>
    </div>
  `).join("");

  panel.classList.add("open");
  overlay.classList.add("visible");
}

function closePanel() {
  panel.classList.remove("open");
  overlay.classList.remove("visible");
  document.querySelectorAll(".hotspot").forEach(h => h.classList.remove("active"));
}

document.querySelectorAll(".hotspot").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    if (btn.classList.contains("active")) {
      closePanel();
    } else {
      document.querySelectorAll(".hotspot").forEach(h => h.classList.remove("active"));
      btn.classList.add("active");
      openPanel(id);
    }
  });
});

closeBtn.addEventListener("click", closePanel);
overlay.addEventListener("click", closePanel);
