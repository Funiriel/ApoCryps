const data = {
  greenhouse_big: {
    name: "Велика Оранжерея", subtitle: "Масштабне вирощування культур",
    icon: "🌾", category: "Агровиробництво", color: "#66bb6a",
    image: "farm.png",
    description: "Найбільша споруда бази — оранжерея площею 2400 м². Використовує гідропонні та аеропонні технології. Тут вирощують пшеницю, сою, картоплю, рис і десятки видів овочів. Спеціальні лампи імітують земний сонячний спектр. Забезпечує 80% харчових потреб усіх баз.",
    stats: [
      { label:"Площа", value:"2400 м²" }, { label:"Культури", value:"38 видів" },
      { label:"Урожай", value:"2100 кг/міс" }, { label:"Кисень", value:"65% норми" }
    ]
  },
  algae: {
    name: "Водоростева Ферма", subtitle: "Мікроводорості та білкове виробництво",
    icon: "🧫", category: "Біотехнології", color: "#26c6da",
    image: "water.png",
    description: "Циліндричні біореактори вирощують спіруліну, хлорелу та інші мікроводорості. Вони є джерелом білка, жирних кислот омега-3 та додаткового кисню. Один літр культури виробляє більше кисню, ніж 10 земних дерев. Також слугує резервним харчовим запасом.",
    stats: [
      { label:"Реакторів", value:"48 штук" }, { label:"Об'єм", value:"9600 л" },
      { label:"Білок", value:"320 кг/міс" }, { label:"Кисень", value:"25% норми" }
    ]
  },
  water_drill: {
    name: "Водяна Свердловина", subtitle: "Видобуток підземного льоду",
    icon: "💧", category: "Водозабезпечення", color: "#42a5f5",
    image: "ice.png",
    description: "Глибинна свердловина досягає шару вічної мерзлоти на глибині 40 метрів. Лід нагрівається мікрохвильовим випромінювачем і викачується як вода. Потужна система фільтрації забезпечує питну якість. Щодня видобувається до 5000 літрів чистої води.",
    stats: [
      { label:"Глибина", value:"40 м" }, { label:"Вода/добу", value:"5000 л" },
      { label:"Чистота", value:"99.98%" }, { label:"Темп. льоду", value:"-80°C" }
    ]
  },
  mine: {
    name: "Шахта", subtitle: "Видобуток руди та мінералів",
    icon: "⛏️", category: "Гірнича справа", color: "#ff7043",
    image: "mine.png",
    description: "Підземна шахта глибиною 120 метрів для видобутку марсіанської руди. Роботизовані бурові машини цілодобово видобувають залізо, магній, алюміній та рідкісні елементи. Марсіанський ґрунт переробляється для будівництва нових модулів прямо на місці.",
    stats: [
      { label:"Глибина", value:"120 м" }, { label:"Руда/добу", value:"8 тонн" },
      { label:"Роботів", value:"12 одиниць" }, { label:"Елементів", value:"Fe, Mg, Al, Ti" }
    ]
  },
  refinery: {
    name: "Переробний Завод", subtitle: "Плавка та переробка матеріалів",
    icon: "🏭", category: "Металургія", color: "#ffa726",
    image: "ref.png",
    description: "Електродугові плавильні печі переплавляють видобуту руду в чисті метали. Завод виробляє сталь, алюмінієві сплави та титанові листи для будівництва і ремонту. Побічне тепло від виплавки використовується для обігріву теплиць.",
    stats: [
      { label:"Потужність", value:"1.2 МВт" }, { label:"Сталь/міс", value:"4.5 т" },
      { label:"Алюміній/міс", value:"1.8 т" }, { label:"Температура", value:"1650°C" }
    ]
  },
  lab: {
    name: "Науково-аналітична Лабораторія", subtitle: "Аналіз ґрунту та матеріалів",
    icon: "🔬", category: "Наука", color: "#ab47bc",
    image: "lab.png",
    description: "Найсучасніша лабораторія для аналізу марсіанських порід, ґрунту та атмосферних проб. Вчені досліджують хімічний склад реголіту, шукають сліди колишнього життя і розробляють нові матеріали зі місцевої сировини.",
    stats: [
      { label:"Науковців", value:"8 осіб" }, { label:"Проб/рік", value:"12 000" },
      { label:"Аналізаторів", value:"24 прилади" }, { label:"Точність", value:"0.001 мг" }
    ]
  },
  robots: {
    name: "Роботизований Склад", subtitle: "Автоматизоване зберігання та логістика",
    icon: "🤖", category: "Автоматизація", color: "#78909c",
    image: "robots.png",
    description: "Повністю автоматизований склад з роботами-маніпуляторами та автономними вантажними платформами. Система ШІ відстежує кожен елемент і автоматично подає матеріали до потрібних відсіків без участі людини.",
    stats: [
      { label:"Ємність", value:"850 м³" }, { label:"Роботів", value:"16 одиниць" },
      { label:"Позицій", value:"4200 комірок" }, { label:"Точність", value:"99.7%" }
    ]
  },
  geo: {
    name: "Геотермальна Станція", subtitle: "Видобуток внутрішнього тепла Марсу",
    icon: "🌋", category: "Енергетика", color: "#ef5350",
    image: "geo.png",
    description: "Глибинні зонди опускаються на 3 км у марсіанські надра, де температура сягає +180°C. Теплообмінники перетворюють геотермальну енергію на електрику та тепло. Станція є стабільним джерелом енергії незалежно від пилових бур.",
    stats: [
      { label:"Глибина зондів", value:"3000 м" }, { label:"Потужність", value:"600 кВт" },
      { label:"Темп. надр", value:"+180°C" }, { label:"Стабільність", value:"24/7" }
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
