const initialCustomer = window.AppStore?.loadCustomer() ?? null;

const state = {
  query: "",
  category: "Tất cả",
  selectedMegaCategoryId: MEGA_CATEGORIES[0]?.id ?? null,
  selectedMedicineId: MEDICINES[0]?.id ?? null,
  selectedDiseaseId: DISEASES[0]?.id ?? null,
  cart: window.AppStore?.loadCart() ?? [],
  cartNotice: null,
  isLoggedIn: Boolean(initialCustomer),
  customer: initialCustomer
};

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

const categoryPills = document.getElementById("category-pills");
const medicineGrid = document.getElementById("medicine-grid");
const medicineDetail = document.getElementById("medicine-detail");
const megaCategoryMenu = document.getElementById("mega-category-menu");
const megaCategoryHead = document.getElementById("mega-category-head");
const megaCategoryTiles = document.getElementById("mega-category-tiles");
const megaCategoryPromo = document.getElementById("mega-category-promo");
const diseaseRail = document.getElementById("disease-rail");
const advisorOverview = document.getElementById("advisor-overview");
const advisorMeds = document.getElementById("advisor-meds");
const scenarioExamples = document.getElementById("scenario-examples");
const scenarioFlags = document.getElementById("scenario-flags");
const scenarioInput = document.getElementById("scenario-input");
const scenarioAnalyze = document.getElementById("scenario-analyze");
const scenarioClear = document.getElementById("scenario-clear");
const scenarioResult = document.getElementById("scenario-result");
const prescriptionImageInput = document.getElementById("prescription-image");
const prescriptionPreview = document.getElementById("prescription-preview");
const prescriptionPreviewImage = document.getElementById("prescription-preview-image");
const prescriptionStatus = document.getElementById("prescription-status");
const prescriptionScan = document.getElementById("prescription-scan");
const prescriptionReset = document.getElementById("prescription-reset");
const cartPanel = document.getElementById("cart-panel");
const cartContext = document.getElementById("cart-context");
const noticeList = document.getElementById("notice-list");
const noticeCount = document.getElementById("notice-count");
const cartCount = document.getElementById("cart-count");
const noticeTrigger = document.getElementById("notice-trigger");
const noticePopover = document.getElementById("notice-popover");
const cartTrigger = document.getElementById("cart-trigger");
const cartPopover = document.getElementById("cart-popover");
const accountTrigger = document.getElementById("account-trigger");
const accountGreeting = document.getElementById("account-greeting");
const customerProfile = document.getElementById("customer-profile");
const customerOrders = document.getElementById("customer-orders");
const loginForm = document.getElementById("login-form");
const loginPhone = document.getElementById("login-phone");
const loginPassword = document.getElementById("login-password");
const loginFill = document.getElementById("login-fill");
const catalogSearch = document.getElementById("catalog-search");
const globalSearch = document.getElementById("global-search");
const globalSearchSuggestions = document.getElementById("global-search-suggestions");
const catalogSearchSuggestions = document.getElementById("catalog-search-suggestions");
const searchChips = document.getElementById("search-chips");
const mobileTrendLinks = document.getElementById("mobile-trend-links");
const mobilePromoGrid = document.getElementById("mobile-promo-grid");
const mobileCategoryRail = document.getElementById("mobile-category-rail");
const heroBannerTrack = document.getElementById("hero-banner-track");
const heroBannerDots = document.getElementById("hero-banner-dots");
const inlineBannerTrack = document.getElementById("inline-banner-track");
const inlineBannerDots = document.getElementById("inline-banner-dots");
const catalogTrigger = document.querySelector(".catalog-trigger");
const catalogDropdown = document.getElementById("catalog-stage");

const sliderState = {};
const prescriptionState = {
  file: null,
  previewUrl: "",
  extractedText: "",
  rawText: "",
  isScanning: false
};
const riskOrder = {
  safe: 0,
  caution: 1,
  danger: 2
};

const SCENARIO_INTENT_PATTERNS = [
  {
    id: "dosage",
    keywords: ["lieu", "lieu dung", "cach dung", "uống mấy", "uong may", "moi ngay", "mấy viên", "may vien"]
  },
  {
    id: "usage",
    keywords: ["cong dung", "de lam gi", "dung de", "tri gi", "thuoc nay la gi", "la thuoc gi"]
  },
  {
    id: "side-effect",
    keywords: ["tac dung phu", "gay buon ngu", "co buong ngu", "buon ngu khong", "co met khong"]
  },
  {
    id: "choose",
    keywords: ["nen dung gi", "nen mua gi", "nen chon gi", "thuoc nao", "thuoc gi phu hop", "goi y thuoc"]
  },
  {
    id: "safety",
    keywords: ["co duoc khong", "an toan khong", "co nen dung khong", "nguy hiem khong", "tu dung duoc khong"]
  },
  {
    id: "combination",
    keywords: ["ket hop", "uong cung", "dung chung", "cung luc", "phoi hop", "co the dung cung"]
  },
  {
    id: "doctor",
    keywords: ["khi nao di kham", "bao gio di kham", "luc nao can di kham", "khi nao can di vien", "khi nao can gap bac si"]
  }
];

const SCENARIO_SYMPTOM_SYNONYMS = {
  "ho": "ho khan",
  "ho dem": "ho đêm",
  "ho co dom": "ho đờm",
  "ho dom": "ho đờm",
  "dau hong": "đau họng",
  "rat hong": "rát họng",
  "khan tieng": "khàn tiếng",
  "nghet mui": "nghẹt mũi",
  "so mui": "sổ mũi",
  "chay mui": "sổ mũi",
  "hat hoi": "hắt hơi",
  "ngua mui": "ngứa mũi",
  "di ung": "dị ứng",
  "me day": "mề đay",
  "ot nong": "ợ nóng",
  "trao nguoc": "trào ngược",
  "day bung": "đầy bụng",
  "chuong bung": "chướng bụng",
  "dau thuong vi": "đau thượng vị",
  "tieu chay": "tiêu chảy",
  "non oi": "nôn ói",
  "mat nuoc": "mất nước",
  "dau bung": "đau bụng",
  "sot": "sốt",
  "dau dau": "đau đầu",
  "dau nhuc": "đau nhức",
  "met moi": "mệt mỏi",
  "kho tho": "Khó thở",
  "dau nguc": "Đau ngực"
};

function persistCart() {
  window.AppStore?.saveCart(state.cart);
}

function persistCustomer() {
  if (state.customer) {
    window.AppStore?.saveCustomer(state.customer);
    return;
  }

  window.AppStore?.clearCustomer();
}

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function lowerFirst(text) {
  if (!text) return "";
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function uniqueByKey(items, keySelector) {
  return [...new Map(items.map((item) => [keySelector(item), item])).values()];
}

function uniqueCategories() {
  return ["Tất cả", ...new Set(MEDICINES.map((medicine) => medicine.category))];
}

function findDiseaseById(id) {
  return DISEASES.find((disease) => disease.id === id);
}

function findMedicineById(id) {
  return MEDICINES.find((medicine) => medicine.id === id);
}

function findMegaCategoryById(id) {
  return MEGA_CATEGORIES.find((category) => category.id === id);
}

function findExternalReferenceById(id) {
  return EXTERNAL_REFERENCE_PRODUCTS.find((item) => item.id === id);
}

function productHref(medicineId) {
  return `product.html?id=${encodeURIComponent(medicineId)}`;
}

const megaCategoryIconMap = {
  thuoc: "medication",
  "disease-lookup": "monitor_heart",
  supplement: "pill",
  "personal-care": "soap",
  "mother-baby": "child_care",
  beauty: "face",
  "medical-device": "device_thermostat",
  "daily-essentials": "inventory_2",
  business: "personal_injury",
  "house-brand": "workspace_premium"
};

const megaCategoryFeaturedIds = {
  thuoc: ["para-500", "ibuprofen-200", "loratadine", "oresol", "acetylcysteine"],
  "disease-lookup": ["para-500", "loratadine", "saline-spray", "benzocaine-lozenge", "oresol"],
  supplement: ["vitamin-d3", "vitamin-c-500", "zinc", "probiotic-caps", "gaviscon"],
  "personal-care": ["saline-spray", "povidone-gargle", "herbal-lozenge", "vitamin-c-500", "zinc"],
  "mother-baby": ["vitamin-d3", "oresol", "saline-spray", "zinc", "herbal-lozenge"],
  beauty: ["vitamin-c-500", "zinc", "vitamin-d3", "loratadine", "saline-spray"],
  "medical-device": ["saline-spray", "oresol", "vitamin-d3", "para-500", "ibuprofen-200"],
  "daily-essentials": ["saline-spray", "oresol", "para-500", "herbal-lozenge", "povidone-gargle"],
  business: ["vitamin-d3", "gaviscon", "zinc", "ibuprofen-200", "saline-spray"],
  "house-brand": ["para-500", "loratadine", "oresol", "vitamin-c-500", "acetylcysteine"]
};

function megaCategoryIcon(id) {
  return megaCategoryIconMap[id] ?? "category";
}

function featuredMedicinesForMegaCategory(category) {
  const mappedIds = megaCategoryFeaturedIds[category.id] ?? [];
  const mappedMedicines = mappedIds.map((id) => findMedicineById(id)).filter(Boolean);

  const inferredMedicines = MEDICINES.filter((medicine) => {
    const categoryText = slugify(`${category.name} ${category.subtitle} ${category.description}`);
    const medicineText = slugify(
      `${medicine.category} ${medicine.ingredient} ${medicine.name} ${medicine.symptomTags.join(" ")}`
    );

    return medicineText.split(" ").some((token) => token && categoryText.includes(token));
  }).sort((left, right) => {
    if (right.rating !== left.rating) {
      return right.rating - left.rating;
    }

    return right.stock - left.stock;
  });

  const fallbackMedicines = [...MEDICINES].sort((left, right) => {
    if (right.rating !== left.rating) {
      return right.rating - left.rating;
    }

    return right.stock - left.stock;
  });

  return uniqueByKey(
    [...mappedMedicines, ...inferredMedicines, ...fallbackMedicines],
    (medicine) => medicine.id
  ).slice(0, 5);
}

function compareRisk(left, right) {
  return riskOrder[right] > riskOrder[left] ? right : left;
}

function cartItemCount() {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
}

function cartItemsDetailed() {
  return state.cart
    .map((item) => {
      const medicine = findMedicineById(item.id);
      if (!medicine) return null;

      return {
        ...medicine,
        quantity: item.quantity,
        lineTotal: medicine.price * item.quantity
      };
    })
    .filter(Boolean);
}

function cartSubtotal() {
  return cartItemsDetailed().reduce((total, item) => total + item.lineTotal, 0);
}

function addToCart(medicineId, quantity = 1) {
  const existingItem = state.cart.find((item) => item.id === medicineId);
  const medicine = findMedicineById(medicineId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    state.cart.push({ id: medicineId, quantity });
  }

  if (medicine) {
    const guidance = medicineGuidance(medicine);

    state.cartNotice =
      guidance.level === "fit"
        ? {
            level: "fit",
            message: `${medicine.name} đã được thêm vào giỏ. Hãy dùng đúng liều tham khảo trên trang chi tiết.`
          }
        : {
            level: guidance.level,
            message: `${medicine.name} đã được thêm vào giỏ nhưng cần xem kỹ lưu ý: ${guidance.avoidWhen[0]}`
          };
  }

  persistCart();
  renderCartSection();
  updateHeaderShortcuts();
  setCatalogDropdownOpen(false);
  setNoticePopoverOpen(false);
  setCartPopoverOpen(true);
}

function updateCartQuantity(medicineId, delta) {
  const item = state.cart.find((cartItem) => cartItem.id === medicineId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    state.cart = state.cart.filter((cartItem) => cartItem.id !== medicineId);
  }

  persistCart();
  renderCartSection();
  updateHeaderShortcuts();
}

function removeFromCart(medicineId) {
  state.cart = state.cart.filter((item) => item.id !== medicineId);
  persistCart();
  renderCartSection();
  updateHeaderShortcuts();
}

function renderCartSection() {
  if (!cartPanel) return;

  const items = cartItemsDetailed();
  const leadItem = items[0] || null;

  if (cartContext) {
    cartContext.textContent = items.length
      ? `${cartItemCount()} sản phẩm trong giỏ hàng`
      : "Giỏ hàng của bạn đang trống";
  }

  cartPanel.innerHTML = items.length
    ? `
        ${
          state.cartNotice
            ? `<div class="cart-inline-notice ${state.cartNotice.level}">${state.cartNotice.message}</div>`
            : ""
        }
        <div class="mini-cart-card">
          <article class="mini-cart-item">
            <a class="mini-cart-thumb" href="${productHref(leadItem.id)}" aria-label="Xem ${leadItem.name}">
              ${medicineMediaMarkup(leadItem, "cart-popover")}
            </a>
            <div class="mini-cart-copy">
              <a class="mini-cart-title" href="${productHref(leadItem.id)}">${leadItem.name}</a>
              <div class="mini-cart-price-row">
                <strong>${currencyFormatter.format(leadItem.price)}</strong>
                <span>x${leadItem.quantity} ${leadItem.pack.split(" ")[0]}</span>
              </div>
              ${
                items.length > 1
                  ? `<small>+ ${items.length - 1} sản phẩm khác trong giỏ hàng</small>`
                  : `<small>${leadItem.pack}</small>`
              }
            </div>
            <button class="mini-cart-remove" type="button" data-cart-remove="${leadItem.id}" aria-label="Xóa sản phẩm">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </article>
          <div class="mini-cart-footer">
            <strong>${cartItemCount()} sản phẩm</strong>
            <a class="cart-checkout-button" href="cart.html">Xem giỏ hàng</a>
          </div>
        </div>
      `
    : `
        <div class="mini-cart-empty">
          <div class="empty-cart-visual">
            <span class="material-symbols-outlined">shopping_cart</span>
          </div>
          <strong>Chưa có sản phẩm nào</strong>
          <p>Hãy khám phá để mua sắm thêm những sản phẩm phù hợp với nhu cầu của bạn.</p>
          <a class="cart-checkout-button" href="#drug-finder">Khám phá ngay</a>
        </div>
      `;

  cartPanel.querySelectorAll("[data-cart-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.dataset.cartRemove);
    });
  });
}

function renderNotifications() {
  if (!noticeList) return;

  noticeList.innerHTML = state.customer
    ? `
        <div class="notice-list">
          ${CUSTOMER_NOTIFICATIONS.map(
            (notice) => `
              <article class="notice-item">
                <strong>${notice.title}</strong>
                <p>${notice.body}</p>
                <small>${notice.time}</small>
              </article>
            `
          ).join("")}
        </div>
      `
    : `
        <div class="notice-empty">
          <div class="notice-empty-icon">
            <span class="material-symbols-outlined">notifications</span>
          </div>
          <strong>Bạn chưa đăng nhập!</strong>
          <p>Hãy đăng nhập để xem thông báo đơn hàng, ưu đãi và các nhắc nhở mua sắm của mình.</p>
          <button class="notice-login-button" type="button" data-notice-login>
            Đăng nhập
          </button>
        </div>
      `;

  noticeList.querySelector("[data-notice-login]")?.addEventListener("click", () => {
    setNoticePopoverOpen(false);
    window.location.href = "profile.html";
  });
}

function renderCustomerProfile() {
  if (!customerProfile || !customerOrders) return;

  const customer = state.customer;

  customerProfile.innerHTML = customer
    ? `
        <div class="account-card-head">
          <span class="eyebrow">Thông tin khách hàng</span>
          <h3>${customer.name}</h3>
        </div>
        <div class="account-stat-grid">
          <article class="account-stat-card">
            <span>Hạng thành viên</span>
            <strong class="account-stat-value">${customer.membership}</strong>
          </article>
          <article class="account-stat-card">
            <span>Điểm thưởng</span>
            <strong class="account-stat-value">${customer.points} điểm</strong>
          </article>
          <article class="account-stat-card">
            <span>Số điện thoại</span>
            <strong class="account-stat-value">${customer.phone}</strong>
          </article>
          <article class="account-stat-card">
            <span>Email</span>
            <strong class="account-stat-value">${customer.email}</strong>
          </article>
        </div>
        <div class="detail-block">
          <span>Địa chỉ giao hàng</span>
          <p class="detail-value">${customer.address}</p>
        </div>
        <div class="detail-block">
          <span>Ngày sinh</span>
          <p class="detail-value">${customer.birthday}</p>
        </div>
      `
    : `
        <div class="account-card-head">
          <span class="eyebrow">Thông tin khách hàng</span>
          <h3>Chưa đăng nhập</h3>
        </div>
        <p>Đăng nhập để lưu địa chỉ giao hàng, xem điểm thưởng và theo dõi các đơn hàng gần đây.</p>
      `;

  customerOrders.innerHTML = `
    <div class="account-card-head">
      <span class="eyebrow">Đơn hàng gần đây</span>
      <h3>${customer ? "Lịch sử mua sắm" : "Mẫu đơn hàng tham khảo"}</h3>
    </div>
    <div class="order-list">
      ${SAMPLE_ORDERS.map(
        (order) => `
          <article class="order-item">
            <div class="order-copy">
              <strong>${order.id}</strong>
              <span>${order.items}</span>
            </div>
            <div class="order-meta">
              <em>${order.status}</em>
              <strong>${currencyFormatter.format(order.total)}</strong>
            </div>
          </article>
        `
      ).join("")}
    </div>
  `;
}

function updateHeaderShortcuts() {
  if (noticeCount) {
    const hasNotices = Boolean(state.customer);
    noticeCount.textContent = hasNotices ? String(CUSTOMER_NOTIFICATIONS.length) : "0";
    noticeCount.classList.toggle("is-hidden", !hasNotices);
  }

  if (cartCount) {
    const totalItems = cartItemCount();
    cartCount.textContent = String(totalItems);
    cartCount.classList.toggle("is-hidden", totalItems === 0);
  }

  if (accountGreeting) {
    accountGreeting.textContent = state.customer ? state.customer.name : "Đăng nhập";
  }
}

function closeSearchSuggestionPanels() {
  [globalSearchSuggestions, catalogSearchSuggestions].forEach((panel) => {
    if (!panel) return;
    panel.hidden = true;
    panel.classList.remove("open");
    panel.innerHTML = "";
  });
}

function medicineSearchSuggestions(query) {
  const normalized = slugify(query.trim());

  return MEDICINES.map((medicine) => {
    const name = slugify(medicine.name);
    const ingredient = slugify(medicine.ingredient);
    const brand = slugify(medicine.brand);
    const haystack = `${name} ${ingredient} ${brand}`;
    let score = medicine.graphWeight * 10 + medicine.rating;

    if (!normalized) {
      score += 1;
    } else if (name.startsWith(normalized)) {
      score += 120;
    } else if (name.includes(normalized)) {
      score += 80;
    } else if (ingredient.includes(normalized)) {
      score += 48;
    } else if (brand.includes(normalized)) {
      score += 28;
    }

    return {
      ...medicine,
      matches: !normalized || haystack.includes(normalized),
      score
    };
  })
    .filter((medicine) => medicine.matches)
    .sort((left, right) => right.score - left.score)
    .slice(0, 6);
}

function renderSearchSuggestionsFor(input, panel, source) {
  if (!input || !panel) return;

  const suggestions = medicineSearchSuggestions(input.value);
  const shouldOpen =
    document.activeElement === input && suggestions.length > 0 && (input.value.trim() || source === "global");

  if (!shouldOpen) {
    panel.hidden = true;
    panel.classList.remove("open");
    panel.innerHTML = "";
    return;
  }

  panel.innerHTML = suggestions
    .map(
      (medicine) => `
        <button class="search-suggestion" type="button" data-suggestion-id="${medicine.id}" data-source="${source}">
          <strong>${medicine.name}</strong>
          <span>${medicine.ingredient}</span>
          <small>${medicine.category} • ${medicine.brand}</small>
        </button>
      `
    )
    .join("");

  panel.hidden = false;
  panel.classList.add("open");

  panel.querySelectorAll("[data-suggestion-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const medicine = findMedicineById(button.dataset.suggestionId);
      if (!medicine) return;

      state.query = medicine.name;
      state.category = "Tất cả";
      state.selectedMedicineId = medicine.id;
      catalogSearch.value = medicine.name;
      globalSearch.value = medicine.name;
      renderCatalog();
      closeSearchSuggestionPanels();

      if (button.dataset.source === "global") {
        scrollToSection("drug-finder");
      }
    });
  });
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function setCatalogDropdownOpen(isOpen) {
  if (!catalogTrigger || !catalogDropdown) return;

  catalogTrigger.setAttribute("aria-expanded", String(isOpen));
  catalogDropdown.setAttribute("aria-hidden", String(!isOpen));
  catalogDropdown.classList.toggle("open", isOpen);
}

function setNoticePopoverOpen(isOpen) {
  if (!noticeTrigger || !noticePopover) return;

  noticeTrigger.setAttribute("aria-expanded", String(isOpen));
  noticePopover.setAttribute("aria-hidden", String(!isOpen));
  noticePopover.classList.toggle("open", isOpen);
}

function setCartPopoverOpen(isOpen) {
  if (!cartTrigger || !cartPopover) return;

  cartTrigger.setAttribute("aria-expanded", String(isOpen));
  cartPopover.setAttribute("aria-hidden", String(!isOpen));
  cartPopover.classList.toggle("open", isOpen);
}

function closeHeaderPanels() {
  setCatalogDropdownOpen(false);
  setNoticePopoverOpen(false);
  setCartPopoverOpen(false);
  closeSearchSuggestionPanels();
}

function diseaseNamesForMedicine(medicine) {
  return medicine.diseaseIds
    .map((diseaseId) => findDiseaseById(diseaseId))
    .filter(Boolean)
    .map((disease) => disease.name);
}

function cautionLines(text) {
  return text
    .split(".")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (/[.!?]$/.test(line) ? line : `${line}.`));
}

function medicineMatchesCurrentIntent(medicine) {
  const query = slugify(state.query.trim());
  if (!query) return true;

  const diseaseNames = diseaseNamesForMedicine(medicine).join(" ");
  const haystack = slugify(
    [
      medicine.name,
      medicine.brand,
      medicine.category,
      medicine.ingredient,
      medicine.usage,
      medicine.symptomTags.join(" "),
      diseaseNames
    ].join(" ")
  );

  return haystack.includes(query);
}

function medicineGuidance(medicine) {
  const diseaseNames = diseaseNamesForMedicine(medicine);
  const query = state.query.trim();
  const matchesIntent = medicineMatchesCurrentIntent(medicine);
  const cautionText = slugify(medicine.caution);
  const recommendedWhen = [];
  const avoidWhen = cautionLines(medicine.caution);

  if (medicine.symptomTags.length) {
    recommendedWhen.push(`Nên tham khảo khi có triệu chứng như ${medicine.symptomTags.slice(0, 3).join(", ")}.`);
  }

  if (diseaseNames.length) {
    recommendedWhen.push(`Thường được chọn trong nhóm: ${diseaseNames.join(", ")}.`);
  }

  if (query && !matchesIntent) {
    avoidWhen.unshift(`Không khớp rõ với từ khóa "${query}", nên xem lại trước khi chọn.`);
  }

  let level = "fit";
  let label = "Nên tham khảo";
  let summary = "Có thể tham khảo nếu triệu chứng phù hợp với mô tả thuốc.";

  if (
    /khong tu dung|khong phu hop|khong dung|khong nen tu|khong nen dung|ngung dung/.test(cautionText)
  ) {
    level = matchesIntent ? "review" : "avoid";
  } else if (!matchesIntent) {
    level = "review";
  }

  if (level === "review") {
    label = "Cần xem lại";
    summary = "Thuốc này có lưu ý cần đọc kỹ trước khi thêm vào giỏ.";
  }

  if (level === "avoid") {
    label = "Không nên tự chọn";
    summary = "Thuốc này có cảnh báo mạnh hoặc không khớp nhu cầu đang tìm.";
  }

  return {
    level,
    label,
    summary,
    recommendedWhen: recommendedWhen.slice(0, 2),
    avoidWhen: avoidWhen.slice(0, 3)
  };
}

function medicineBoxTone(medicine) {
  const toneMap = {
    "Giảm đau - hạ sốt": {
      accent: "#2e87ff",
      soft: "#eef6ff",
      border: "#b9d4ff"
    },
    "Dị ứng": {
      accent: "#7c63ff",
      soft: "#f1efff",
      border: "#d3cafe"
    },
    "Tai - Mũi - Họng": {
      accent: "#17a7c7",
      soft: "#eefbfd",
      border: "#bbe8f0"
    },
    "Hô hấp": {
      accent: "#1fa36d",
      soft: "#eefbf5",
      border: "#bfe9d5"
    },
    "Tiêu hóa": {
      accent: "#f39a20",
      soft: "#fff7eb",
      border: "#f6d8ad"
    },
    "Dạ dày": {
      accent: "#f06f43",
      soft: "#fff2ed",
      border: "#f5c7b7"
    },
    "Sát khuẩn": {
      accent: "#4e6af7",
      soft: "#eef1ff",
      border: "#c6d0ff"
    },
    "Vitamin - khoáng chất": {
      accent: "#5f8c2f",
      soft: "#f3f9ea",
      border: "#d3e4b9"
    }
  };

  return (
    toneMap[medicine.category] ?? {
      accent: "#1c54d1",
      soft: "#eef3ff",
      border: "#c8d8ff"
    }
  );
}

function medicineMediaMarkup(medicine, variant = "card") {
  const imageClass = `medicine-media ${variant}-media`;
  const tone = medicineBoxTone(medicine);

  if (medicine.image) {
    return `
      <div class="${imageClass}">
        <div class="medicine-box-frame">
          <img
            class="medicine-image"
            src="${medicine.image}"
            alt="${medicine.name}"
            loading="lazy"
          />
        </div>
      </div>
    `;
  }

  return `
    <div class="${imageClass}">
      <div class="medicine-box-frame">
        <div
          class="medicine-box-mock"
          style="--box-accent: ${tone.accent}; --box-soft: ${tone.soft}; --box-border: ${tone.border};"
        >
          <div class="medicine-box-front">
            <span>${medicine.brand}</span>
            <strong>${medicine.name}</strong>
            <small>${medicine.ingredient}</small>
          </div>
          <div class="medicine-box-side"></div>
        </div>
      </div>
    </div>
  `;
}

function filteredMedicines() {
  const query = slugify(state.query.trim());

  return MEDICINES.filter((medicine) => {
    const matchesCategory =
      state.category === "Tất cả" || medicine.category === state.category;

    const haystack = slugify(
      [
        medicine.name,
        medicine.brand,
        medicine.category,
        medicine.ingredient,
        medicine.usage,
        medicine.symptomTags.join(" ")
      ].join(" ")
    );

    return matchesCategory && (!query || haystack.includes(query));
  });
}

function recommendationForDisease(diseaseId) {
  const disease = findDiseaseById(diseaseId);
  if (!disease) return [];

  return MEDICINES.filter((medicine) => medicine.diseaseIds.includes(diseaseId))
    .map((medicine) => {
      let score = medicine.graphWeight * 100;

      if (disease.preferredCategories.includes(medicine.category)) {
        score += 10;
      }

      if (
        disease.graphIngredients.some((ingredient) =>
          medicine.ingredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      ) {
        score += 12;
      }

      return {
        ...medicine,
        score: Math.round(score)
      };
    })
    .sort((left, right) => right.score - left.score);
}

function renderMegaCatalog() {
  const selectedCategory =
    findMegaCategoryById(state.selectedMegaCategoryId) || MEGA_CATEGORIES[0];

  if (!selectedCategory) return;
  const categoryHref =
    selectedCategory.id === "disease-lookup" ? "#advisor" : "#drug-finder";
  const featuredMedicines = featuredMedicinesForMegaCategory(selectedCategory);

  megaCategoryMenu.innerHTML = MEGA_CATEGORIES.map(
    (category) => `
      <button
        class="mega-nav-item ${category.id === selectedCategory.id ? "active" : ""}"
        type="button"
        data-mega-category="${category.id}"
      >
        <span class="mega-nav-icon material-symbols-outlined">${megaCategoryIcon(category.id)}</span>
        <span class="mega-nav-copy">
          <strong>${category.name}</strong>
          <small>${category.subtitle}</small>
        </span>
      </button>
    `
  ).join("");

  megaCategoryHead.innerHTML = `
    <span class="eyebrow">Danh mục nổi bật</span>
    <h2>${selectedCategory.name}</h2>
    <p>${selectedCategory.description}</p>
  `;

  megaCategoryTiles.innerHTML = selectedCategory.tiles
    .map(
      (tile) => `
        <a class="mega-tile" href="${categoryHref}" style="--tile-accent: ${tile.accent}">
          <div class="mega-tile-thumb"><span>${tile.thumb}</span></div>
          <div class="mega-tile-copy">
            <strong>${tile.title}</strong>
            <span>${tile.note}</span>
          </div>
        </a>
      `
    )
    .join("");

  megaCategoryPromo.innerHTML = `
    <div class="mega-featured-shell">
      <div class="mega-featured-head">
        <div>
          <span class="eyebrow">${selectedCategory.promo.kicker}</span>
          <h3>Bán chạy nhất</h3>
        </div>
        <a class="mega-featured-link" href="${categoryHref}">Xem tất cả</a>
      </div>
      <div class="mega-featured-grid">
        ${featuredMedicines
          .map(
            (medicine) => `
              <a class="mega-product-card" href="${productHref(medicine.id)}">
                <div class="mega-product-media">
                  ${medicineMediaMarkup(medicine, "mega")}
                </div>
                <strong class="mega-product-title">${medicine.name}</strong>
                <div class="mega-product-price">
                  <strong>${currencyFormatter.format(medicine.price)}</strong>
                  <span>/ ${medicine.pack.split(" ")[0]}</span>
                </div>
              </a>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  megaCategoryMenu.querySelectorAll("[data-mega-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedMegaCategoryId = button.dataset.megaCategory || null;
      renderMegaCatalog();
    });
  });
}

function renderScenarioExamples() {
  if (!scenarioExamples) return;

  scenarioExamples.innerHTML = SCENARIO_EXAMPLES.map(
    (example, index) => `
      <button class="scenario-bubble ${index % 2 === 0 ? "patient" : "friend"}" type="button" data-scenario-example="${example}">
        ${example}
      </button>
    `
  ).join("");

  scenarioExamples.querySelectorAll("[data-scenario-example]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.scenarioExample || "";
      if (scenarioInput) {
        scenarioInput.value = value;
      }
      analyzeScenario();
    });
  });
}

function renderScenarioFlags() {
  if (!scenarioFlags) return;

  scenarioFlags.innerHTML = PATIENT_FLAGS.map(
    (flag) => `
      <label class="scenario-flag" data-scenario-flag="${flag.id}">
        <input type="checkbox" value="${flag.id}" />
        <span>
          <strong>${flag.label}</strong>
          <small>${flag.description}</small>
        </span>
      </label>
    `
  ).join("");
}

function selectedScenarioFlags() {
  return Array.from(
    scenarioFlags?.querySelectorAll('input[type="checkbox"]:checked') ?? []
  )
    .map((input) => input.value)
    .map((id) => PATIENT_FLAGS.find((flag) => flag.id === id))
    .filter(Boolean);
}

function lookupCombinationRule(ids) {
  const key = [...ids].sort().join("|");

  return COMBINATION_RULES.find((rule) => [...rule.ids].sort().join("|") === key);
}

function detectScenarioIntents(normalized) {
  const intents = SCENARIO_INTENT_PATTERNS.filter((intent) =>
    intent.keywords.some((keyword) => normalized.includes(slugify(keyword)))
  ).map((intent) => intent.id);

  return intents.length ? intents : ["safety"];
}

function detectMedicineMentions(normalized) {
  const knownMedicineIds = [];
  const externalProductIds = [];

  Object.entries(MEDICINE_ALIASES).forEach(([alias, id]) => {
    if (!normalized.includes(slugify(alias))) return;

    if (id.startsWith("external-")) {
      externalProductIds.push(id);
      return;
    }

    knownMedicineIds.push(id);
  });

  MEDICINES.forEach((medicine) => {
    const searchTerms = [
      medicine.name,
      medicine.brand,
      medicine.ingredient
    ]
      .map((term) => slugify(term))
      .filter((term) => term.length >= 3);

    if (searchTerms.some((term) => normalized.includes(term))) {
      knownMedicineIds.push(medicine.id);
    }
  });

  return {
    medicines: uniqueByKey(
      [...new Set(knownMedicineIds)].map((id) => findMedicineById(id)).filter(Boolean),
      (medicine) => medicine.id
    ),
    externalProducts: uniqueByKey(
      [...new Set(externalProductIds)]
        .map((id) => findExternalReferenceById(id))
        .filter(Boolean),
      (product) => product.id
    )
  };
}

function detectScenarioSymptoms(normalized) {
  const matched = [];

  const knownSymptoms = [
    ...new Set(
      DISEASES.flatMap((disease) => [...disease.symptomFocus, ...disease.redFlags]).concat(
        MEDICINES.flatMap((medicine) => medicine.symptomTags)
      )
    )
  ];

  knownSymptoms.forEach((symptom) => {
    if (normalized.includes(slugify(symptom))) {
      matched.push(symptom);
    }
  });

  Object.entries(SCENARIO_SYMPTOM_SYNONYMS).forEach(([keyword, canonical]) => {
    if (normalized.includes(keyword)) {
      matched.push(canonical);
    }
  });

  return [...new Set(matched)];
}

function inferDiseasesFromMedicines(medicines) {
  const diseaseScore = new Map();

  medicines.forEach((medicine) => {
    medicine.diseaseIds.forEach((diseaseId) => {
      diseaseScore.set(diseaseId, (diseaseScore.get(diseaseId) ?? 0) + 1);
    });
  });

  return [...diseaseScore.entries()]
    .map(([diseaseId, score]) => {
      const disease = findDiseaseById(diseaseId);
      return disease ? { ...disease, score } : null;
    })
    .filter(Boolean)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}

function inferScenarioDiseases(normalized, symptoms) {
  return DISEASES.map((disease) => {
    let score = 0;

    if (normalized.includes(slugify(disease.name))) {
      score += 4;
    }

    symptoms.forEach((symptom) => {
      const symptomKey = slugify(symptom);

      if (disease.symptomFocus.some((focus) => slugify(focus).includes(symptomKey) || symptomKey.includes(slugify(focus)))) {
        score += 2;
      }

      if (disease.redFlags.some((flag) => slugify(flag).includes(symptomKey) || symptomKey.includes(slugify(flag)))) {
        score += 3;
      }
    });

    return {
      ...disease,
      score
    };
  })
    .filter((disease) => disease.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}

function recommendMedicinesFromScenario(context, limit = 4) {
  return MEDICINES.map((medicine) => {
    let score = medicine.graphWeight * 20;

    const diseaseMatches = context.diseases.filter((disease) => medicine.diseaseIds.includes(disease.id)).length;
    const symptomMatches = context.symptoms.filter((symptom) =>
      medicine.symptomTags.some((tag) => {
        const tagKey = slugify(tag);
        const symptomKey = slugify(symptom);
        return tagKey.includes(symptomKey) || symptomKey.includes(tagKey);
      })
    ).length;

    score += diseaseMatches * 28;
    score += symptomMatches * 15;

    if (context.medicines.some((item) => item.id === medicine.id)) {
      score += 200;
    }

    return {
      ...medicine,
      score
    };
  })
    .filter((medicine) => medicine.score >= 22)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);
}

function detectScenarioContext(text, chosenFlags) {
  const normalized = slugify(text);
  const intents = detectScenarioIntents(normalized);
  const { medicines, externalProducts } = detectMedicineMentions(normalized);
  const symptoms = detectScenarioSymptoms(normalized);
  const diseases = inferScenarioDiseases(normalized, symptoms);
  const inferredDiseases = diseases.length ? diseases : inferDiseasesFromMedicines(medicines);

  const inferredFlags = PATIENT_FLAGS.filter((flag) =>
    flag.keywords.some((keyword) => normalized.includes(slugify(keyword)))
  );

  const flags = [...new Map([...chosenFlags, ...inferredFlags].map((flag) => [flag.id, flag])).values()];

  const dangerSignals = [
    ...new Set(
      DISEASES.flatMap((disease) =>
        disease.redFlags.filter((flag) => normalized.includes(slugify(flag)))
      )
    )
  ];

  const mentionsPrescriptionIntent = [
    "ke toa",
    "ke don",
    "toa thuoc",
    "tu len don",
    "tu ke",
    "khang sinh"
  ].some((keyword) => normalized.includes(keyword));

  const mentionsCombination =
    medicines.length + externalProducts.length >= 2 ||
    intents.includes("combination");

  return {
    text,
    medicines,
    externalProducts,
    diseases: inferredDiseases,
    symptoms,
    flags,
    intents,
    dangerSignals,
    mentionsPrescriptionIntent,
    mentionsCombination,
    normalized
  };
}

function setPrescriptionStatus(kind, message) {
  if (!prescriptionStatus) return;

  prescriptionStatus.className = `scenario-upload-status ${kind}`;
  prescriptionStatus.textContent = message;
}

function updatePrescriptionControls() {
  if (prescriptionScan) {
    prescriptionScan.disabled = !prescriptionState.file || prescriptionState.isScanning;
    prescriptionScan.textContent = prescriptionState.isScanning ? "Đang quét..." : "Quét đơn thuốc";
  }

  if (prescriptionReset) {
    prescriptionReset.disabled =
      (!prescriptionState.file && !prescriptionState.extractedText) || prescriptionState.isScanning;
  }
}

function resetPrescriptionState({ keepInput = false, keepStatus = false } = {}) {
  if (prescriptionState.previewUrl) {
    URL.revokeObjectURL(prescriptionState.previewUrl);
  }

  prescriptionState.file = null;
  prescriptionState.previewUrl = "";
  prescriptionState.extractedText = "";
  prescriptionState.rawText = "";
  prescriptionState.isScanning = false;

  if (prescriptionImageInput) {
    prescriptionImageInput.value = "";
  }

  if (prescriptionPreviewImage) {
    prescriptionPreviewImage.removeAttribute("src");
  }

  if (prescriptionPreview) {
    prescriptionPreview.hidden = true;
  }

  if (!keepInput && scenarioInput) {
    scenarioInput.value = "";
  }

  if (!keepStatus) {
    setPrescriptionStatus("info", "Tải ảnh đơn thuốc để quét nội dung và hỗ trợ giải thích an toàn.");
  }

  updatePrescriptionControls();
}

function setPrescriptionFile(file) {
  if (!file) {
    resetPrescriptionState({ keepInput: true });
    return;
  }

  if (!file.type.startsWith("image/")) {
    setPrescriptionStatus("error", "Vui lòng chọn đúng file ảnh đơn thuốc.");
    return;
  }

  if (prescriptionState.previewUrl) {
    URL.revokeObjectURL(prescriptionState.previewUrl);
  }

  prescriptionState.file = file;
  prescriptionState.extractedText = "";
  prescriptionState.rawText = "";
  prescriptionState.previewUrl = URL.createObjectURL(file);

  if (prescriptionPreviewImage) {
    prescriptionPreviewImage.src = prescriptionState.previewUrl;
  }

  if (prescriptionPreview) {
    prescriptionPreview.hidden = false;
  }

  setPrescriptionStatus("info", "Ảnh đã sẵn sàng. Bấm quét để đọc nội dung đơn thuốc.");
  updatePrescriptionControls();
}

function cleanOcrText(text) {
  return text
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function loggerMessage(message) {
  const progress =
    typeof message.progress === "number" ? ` ${Math.round(message.progress * 100)}%` : "";
  const statusMap = {
    loading: "Đang tải OCR...",
    initializing: "Đang khởi tạo OCR...",
    recognizing: "Đang nhận diện chữ...",
    "recognizing text": "Đang nhận diện chữ...",
    loading_tesseract_core: "Đang tải lõi OCR...",
    loading_language_traineddata: "Đang tải dữ liệu tiếng Việt...",
    initializing_api: "Đang chuẩn bị quét..."
  };

  return `${statusMap[message.status] ?? "Đang xử lý..."}${progress}`;
}

async function scanPrescriptionImage() {
  if (!prescriptionState.file || prescriptionState.isScanning) return;

  if (!window.Tesseract) {
    setPrescriptionStatus("error", "OCR chưa sẵn sàng. Hãy kiểm tra kết nối rồi thử lại.");
    return;
  }

  prescriptionState.isScanning = true;
  updatePrescriptionControls();
  setPrescriptionStatus("working", "Đang chuẩn bị quét đơn thuốc...");

  try {
    const result = await window.Tesseract.recognize(prescriptionState.file, "vie+eng", {
      logger: (message) => {
        setPrescriptionStatus("working", loggerMessage(message));
      }
    });

    const rawText = result?.data?.text ?? "";
    const cleanedText = cleanOcrText(rawText);

    prescriptionState.rawText = rawText;
    prescriptionState.extractedText = cleanedText;

    if (!cleanedText) {
      setPrescriptionStatus("error", "Chưa đọc được nội dung rõ. Hãy thử ảnh rõ hơn hoặc chụp thẳng hơn.");
      return;
    }

    if (scenarioInput) {
      scenarioInput.value = cleanedText;
    }

    setPrescriptionStatus("success", "Đã quét xong. Hệ thống đang phân tích tên thuốc và gợi ý an toàn.");
    analyzeScenario({ textOverride: cleanedText, showPrescription: true });
  } catch (_error) {
    setPrescriptionStatus("error", "Không quét được ảnh đơn thuốc. Hãy thử ảnh sáng hơn và đủ nét.");
  } finally {
    prescriptionState.isScanning = false;
    updatePrescriptionControls();
  }
}

function buildScenarioQuickAnswer(context, result, recommendedProducts) {
  const primaryMedicine = context.medicines[0];
  const primaryDisease = context.diseases[0];
  const questionMedicines = [...context.medicines.map((item) => item.name), ...context.externalProducts.map((item) => item.name)];

  if (primaryMedicine && context.intents.includes("dosage")) {
    return `Liều tham khảo của ${primaryMedicine.name} trong dữ liệu hiện có là: ${primaryMedicine.dosage}`;
  }

  if (primaryMedicine && context.intents.includes("usage")) {
    return `${primaryMedicine.name} thường dùng để ${lowerFirst(primaryMedicine.usage)}`;
  }

  if (primaryMedicine && context.intents.includes("side-effect")) {
    const sleepy = /buon ngu/.test(slugify(`${primaryMedicine.badge} ${primaryMedicine.caution}`));
    return sleepy
      ? `${primaryMedicine.name} có thể gây buồn ngủ hoặc giảm tỉnh táo ở một số người dùng.`
      : `${primaryMedicine.name} chưa có ghi chú nổi bật về buồn ngủ trong dữ liệu hiện có, nhưng vẫn nên theo dõi phản ứng sau dùng.`;
  }

  if (context.mentionsCombination && questionMedicines.length >= 2) {
    if (result.level === "safe") {
      return `Hiện chưa thấy dấu hiệu xung đột rõ trong dữ liệu giữa ${questionMedicines.join(" và ")}, nhưng vẫn cần dùng đúng liều và theo dõi triệu chứng.`;
    }

    if (result.level === "caution") {
      return `Chưa nên khẳng định an toàn khi dùng cùng ${questionMedicines.join(" và ")}. Bạn nên đọc kỹ thành phần hoặc hỏi dược sĩ trước khi phối hợp.`;
    }

    return `Không nên tự phối hợp ${questionMedicines.join(" và ")} trong tình huống này vì đang có yếu tố nguy cơ hoặc cảnh báo mạnh.`;
  }

  if (!context.medicines.length && recommendedProducts.length) {
    return `Với mô tả hiện tại, bạn có thể tham khảo ${recommendedProducts
      .slice(0, 3)
      .map((medicine) => medicine.name)
      .join(", ")}. Tuy nhiên vẫn cần đối chiếu đúng triệu chứng và lưu ý an toàn trước khi tự dùng.`;
  }

  if (primaryMedicine) {
    if (result.level === "safe") {
      return `${primaryMedicine.name} có thể tham khảo nếu triệu chứng của bạn thật sự khớp với công dụng và không có yếu tố nguy cơ đi kèm.`;
    }

    if (result.level === "caution") {
      return `${primaryMedicine.name} chưa phải lựa chọn có thể kết luận an toàn ngay. Bạn nên xem kỹ lưu ý và hỏi thêm nếu còn nghi ngờ.`;
    }

    return `${primaryMedicine.name} không phù hợp để tự dùng trong tình huống này hoặc đang có dấu hiệu cần đi khám sớm.`;
  }

  if (primaryDisease) {
    return `Tình huống này đang gần với nhóm ${primaryDisease.name}. Nên chọn thuốc theo đúng triệu chứng, đồng thời theo dõi các dấu hiệu nặng để đi khám đúng lúc.`;
  }

  return "Mình đã phân tích theo dữ liệu hiện có, nhưng bạn nên mô tả rõ hơn tên thuốc, bệnh hoặc triệu chứng để nhận được câu trả lời sát hơn.";
}

function buildScenarioResult(context) {
  let level = "safe";
  const reasons = [];
  const safetyNotes = [];
  const nextSteps = [];
  const recommendedProducts = recommendMedicinesFromScenario(context);

  if (context.mentionsPrescriptionIntent) {
    level = compareRisk(level, "danger");
    reasons.push("Tình huống có dấu hiệu tự lên đơn hoặc tự dùng thuốc cần kê toa.");
    nextSteps.push("Không tự mua thuốc kê toa khi chưa có chỉ định chuyên môn.");
  }

  if (context.dangerSignals.length) {
    level = compareRisk(level, "danger");
    reasons.push(`Phát hiện dấu hiệu cần lưu ý: ${context.dangerSignals.join(", ")}.`);
    nextSteps.push("Cần đi khám sớm hoặc đến cơ sở y tế nếu triệu chứng đang tăng.");
  }

  context.flags.forEach((flag) => {
    level = compareRisk(level, flag.severity);
    reasons.push(`Có yếu tố nguy cơ: ${flag.label}.`);
  });

  context.externalProducts.forEach((product) => {
    level = compareRisk(level, "caution");
    reasons.push(product.caution);
  });

  if (!context.medicines.length && !context.externalProducts.length && !context.diseases.length && !context.symptoms.length) {
    level = compareRisk(level, "caution");
    reasons.push("Chưa nhận diện được thuốc hoặc bệnh cụ thể trong thông tin bạn nhập.");
    nextSteps.push("Hãy nhập rõ hơn tên thuốc, triệu chứng hoặc bệnh để hệ thống giải thích dễ hiểu hơn.");
  }

  if (context.symptoms.length) {
    safetyNotes.push(`Đã nhận diện triệu chứng hoặc tín hiệu liên quan: ${context.symptoms.slice(0, 5).join(", ")}.`);
  }

  if (!context.medicines.length && context.diseases.length) {
    safetyNotes.push(`Mô tả hiện tại gần với nhóm: ${context.diseases.map((disease) => disease.name).join(", ")}.`);
  }

  if (context.medicines.length === 1) {
    const medicine = context.medicines[0];
    safetyNotes.push(`Đã nhận diện sản phẩm: ${medicine.name}.`);

    if (context.diseases.length) {
      const matchedDisease = context.diseases.find((disease) =>
        medicine.diseaseIds.includes(disease.id)
      );

      if (matchedDisease) {
        safetyNotes.push(
          `Sản phẩm này đang phù hợp với nhóm triệu chứng: ${matchedDisease.name}.`
        );
      } else {
        level = compareRisk(level, "caution");
        reasons.push("Đã nhận diện sản phẩm nhưng chưa thấy liên hệ rõ với tình trạng đang mô tả.");
      }
    }

    if (medicine.id === "para-500" && context.flags.some((flag) => flag.id === "liver")) {
      level = compareRisk(level, "danger");
      reasons.push("Paracetamol có lưu ý thận trọng nếu người dùng đang có bệnh gan.");
      nextSteps.push("Không nên tự tăng liều; hãy hỏi bác sĩ hoặc dược sĩ về liều phù hợp.");
    }

    if (
      medicine.id === "benzocaine-lozenge" &&
      context.flags.some((flag) => flag.id === "child")
    ) {
      level = compareRisk(level, "caution");
      reasons.push("Viên ngậm giảm đau họng không phù hợp cho trẻ còn quá nhỏ.");
      nextSteps.push("Cần chọn dạng dùng phù hợp với độ tuổi.");
    }

    if (
      medicine.id === "povidone-gargle" &&
      context.flags.some((flag) => flag.id === "thyroid")
    ) {
      level = compareRisk(level, "caution");
      reasons.push("Dung dịch Povidone-Iodine có lưu ý với người đang có bệnh tuyến giáp.");
      nextSteps.push("Nên hỏi thêm dược sĩ hoặc bác sĩ trước khi dùng lặp lại hoặc dùng kéo dài.");
    }

    if (
      medicine.id === "loperamide" &&
      context.flags.some((flag) => ["high-fever", "blood-stool"].includes(flag.id))
    ) {
      level = compareRisk(level, "danger");
      reasons.push("Loperamide không được khuyến nghị tự dùng khi đang sốt cao hoặc tiêu chảy ra máu.");
      nextSteps.push("Ưu tiên đi khám và bù nước, không chỉ dùng thuốc cầm tiêu chảy.");
    }

    if (context.intents.includes("usage")) {
      safetyNotes.unshift(`${medicine.name} thường dùng để ${lowerFirst(medicine.usage)}`);
    }

    if (context.intents.includes("dosage")) {
      safetyNotes.unshift(`Liều tham khảo đang có: ${medicine.dosage}`);
      nextSteps.unshift(`Luôn đối chiếu đúng nhãn sản phẩm. ${cautionLines(medicine.caution)[0]}`);
    }

    if (context.intents.includes("side-effect")) {
      const sleepy = /buon ngu/.test(slugify(`${medicine.badge} ${medicine.caution}`));
      safetyNotes.unshift(
        sleepy
          ? `${medicine.name} có thể gây buồn ngủ hoặc giảm tỉnh táo ở một số người dùng.`
          : `${medicine.name} không có ghi chú nổi bật về buồn ngủ trong dữ liệu hiện có, nhưng vẫn nên theo dõi đáp ứng.`
      );
    }
  }

  if (context.medicines.length >= 2 || (context.medicines.length && context.externalProducts.length)) {
    const allIds = [
      ...context.medicines.map((medicine) => medicine.id),
      ...context.externalProducts.map((product) => product.id)
    ];
    const comboRule = lookupCombinationRule(allIds);

    if (comboRule) {
      level = compareRisk(level, comboRule.level);
      reasons.push(comboRule.reason);
      safetyNotes.push(comboRule.advice);
    } else {
      const knownIngredients = context.medicines.map((medicine) => medicine.ingredient);
      const duplicateIngredient = knownIngredients.find(
        (ingredient, index) => knownIngredients.indexOf(ingredient) !== index
      );

      if (duplicateIngredient) {
        level = compareRisk(level, "danger");
        reasons.push(`Phát hiện nguy cơ trùng hoạt chất: ${duplicateIngredient}.`);
        nextSteps.push("Không nên tự phối hợp hai thuốc có cùng hoạt chất.");
      } else if (context.mentionsCombination) {
        level = compareRisk(level, "caution");
        reasons.push("Tình huống có phối hợp nhiều thuốc nên cần thận trọng trước khi dùng cùng lúc.");
        nextSteps.push("Đọc kỹ thành phần trên nhãn thật và hỏi dược sĩ nếu muốn dùng cùng lúc.");
      }
    }
  }

  if (!context.medicines.length && recommendedProducts.length) {
    safetyNotes.push(
      `Từ dữ liệu hiện có, các lựa chọn đang gần nhất với mô tả này là: ${recommendedProducts
        .slice(0, 3)
        .map((medicine) => medicine.name)
        .join(", ")}.`
    );
  }

  if (context.intents.includes("doctor") && context.diseases.length) {
    const redFlags = context.diseases[0].redFlags.slice(0, 3);
    nextSteps.unshift(`Nếu xuất hiện ${redFlags.join(", ").toLowerCase()}, nên đi khám sớm thay vì tiếp tục tự điều trị tại nhà.`);
  }

  if (!context.intents.includes("doctor") && context.diseases.length) {
    nextSteps.unshift(`Theo dõi tại nhà: ${context.diseases[0].homeAdvice}`);
  }

  if (!reasons.length) {
    reasons.push("Chưa thấy dấu hiệu nguy hiểm rõ ràng trong tình huống này.");
    safetyNotes.push("Vẫn cần dùng đúng liều tham khảo và theo dõi triệu chứng.");
  }

  if (!safetyNotes.length) {
    safetyNotes.push("Nên giải thích rõ cho người dùng trước khi tự mua và tự dùng thuốc tại nhà.");
  }

  if (!nextSteps.length) {
    if (level === "safe") {
      nextSteps.push("Có thể tham khảo dùng theo hướng dẫn trên nhãn và theo dõi đáp ứng.");
      nextSteps.push("Nếu triệu chứng nặng lên hoặc kéo dài, cần đi khám.");
    }

    if (level === "caution") {
      nextSteps.push("Cần hỏi dược sĩ hoặc bác sĩ trước khi tiếp tục tự dùng.");
      nextSteps.push("Không nên tự tăng liều hoặc thêm thuốc mới khi chưa rõ thành phần.");
    }

    if (level === "danger") {
      nextSteps.push("Không nên tự dùng tiếp trong tình huống này.");
      nextSteps.push("Ưu tiên liên hệ bác sĩ, dược sĩ hoặc cơ sở y tế.");
    }
  }

  const quickAnswer = buildScenarioQuickAnswer(context, { level }, recommendedProducts);

  return {
    level,
    quickAnswer,
    reasons,
    safetyNotes,
    nextSteps,
    recommendedProducts
  };
}

function renderScenarioResult(context, result, options = {}) {
  if (!scenarioResult) return;

  const levelMeta = {
    safe: {
      label: "An toàn tham khảo",
      description: "Chưa thấy dấu hiệu nguy hiểm rõ ràng, nhưng vẫn phải dùng đúng liều."
    },
    caution: {
      label: "Cần hỏi thêm",
      description: "Có yếu tố chưa đủ để kết luận an toàn hoặc cần thận trọng thêm."
    },
    danger: {
      label: "Nguy hiểm, không nên tự dùng",
      description: "Tình huống có dấu hiệu không nên tiếp tục tự điều trị tại nhà."
    }
  };

  const meta = levelMeta[result.level];
  const showPrescription = options.showPrescription ?? Boolean(prescriptionState.extractedText);
  const matchedItems = [
    ...context.medicines.map((item) => item.name),
    ...context.externalProducts.map((item) => item.name),
    ...context.diseases.map((item) => item.name),
    ...context.symptoms,
    ...context.flags.map((item) => item.label)
  ];

  scenarioResult.innerHTML = `
    <div class="scenario-result-head">
      <div class="scenario-badge ${result.level}">
        ${meta.label}
      </div>
      <p>${meta.description}</p>
    </div>

    <div class="scenario-result-block">
      <span>Trả lời nhanh</span>
      <p class="scenario-answer">${result.quickAnswer}</p>
    </div>

    ${
      showPrescription && prescriptionState.extractedText
        ? `
            <div class="scenario-result-block">
              <span>Nội dung đơn thuốc đã quét</span>
              <p class="scenario-answer scenario-ocr-text">${escapeHtml(prescriptionState.extractedText)}</p>
            </div>
          `
        : ""
    }

    <div class="scenario-result-block">
      <span>Hệ thống đã nhận diện</span>
      <div class="inline-tags">
        ${
          matchedItems.length
            ? matchedItems.map((item) => `<span>${item}</span>`).join("")
            : "<span>Chưa có thông tin nhận diện rõ ràng</span>"
        }
      </div>
    </div>

    ${
      result.recommendedProducts.length
        ? `
            <div class="scenario-result-block">
              <span>Gợi ý gần nhất từ dữ liệu</span>
              <div class="inline-tags">
                ${result.recommendedProducts.map((medicine) => `<span>${medicine.name}</span>`).join("")}
              </div>
            </div>
          `
        : ""
    }

    <div class="scenario-result-grid">
      <article>
        <span>Vì sao có kết luận này</span>
        <ul>
          ${result.reasons.map((reason) => `<li>${reason}</li>`).join("")}
        </ul>
      </article>
      <article>
        <span>Giải thích dễ hiểu</span>
        <ul>
          ${result.safetyNotes.map((note) => `<li>${note}</li>`).join("")}
        </ul>
      </article>
      <article>
        <span>Bước tiếp theo</span>
        <ul>
          ${result.nextSteps.map((step) => `<li>${step}</li>`).join("")}
        </ul>
      </article>
    </div>

    <div class="scenario-disclaimer">
      Kết quả này chỉ nhằm hỗ trợ tham khảo trước khi mua, không thay thế chỉ định chuyên môn của bác sĩ.
    </div>
  `;
}

function analyzeScenario(options = {}) {
  const text =
    typeof options.textOverride === "string"
      ? options.textOverride.trim()
      : scenarioInput?.value.trim() ?? "";
  const chosenFlags = selectedScenarioFlags();
  const context = detectScenarioContext(text, chosenFlags);
  const result = buildScenarioResult(context);
  renderScenarioResult(context, result, {
    showPrescription: options.showPrescription
  });
}

function renderQuickSearches() {
  searchChips.innerHTML = QUICK_SEARCHES.map(
    (term) => `
      <button class="chip" type="button" data-term="${term}">
        ${term}
      </button>
    `
  ).join("");

  searchChips.querySelectorAll("[data-term]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const term = chip.dataset.term || "";
      state.query = term;
      catalogSearch.value = term;
      globalSearch.value = term;
      renderCatalog();
    });
  });
}

function mobileCategoryTarget(category) {
  return category.id === "disease-lookup" ? "#advisor" : "#drug-finder";
}

function renderMobileHome() {
  if (mobileTrendLinks) {
    mobileTrendLinks.innerHTML = QUICK_SEARCHES.slice(0, 6)
      .map(
        (term) => `
          <button class="mobile-trend-chip" type="button" data-mobile-term="${term}">
            ${term}
          </button>
        `
      )
      .join("");

    mobileTrendLinks.querySelectorAll("[data-mobile-term]").forEach((button) => {
      button.addEventListener("click", () => {
        const term = button.dataset.mobileTerm || "";
        state.query = term;
        catalogSearch.value = term;
        globalSearch.value = term;
        renderCatalog();
        scrollToSection("drug-finder");
      });
    });
  }

  if (mobilePromoGrid) {
    mobilePromoGrid.innerHTML = INLINE_BANNERS.slice(0, 2)
      .map(
        (slide, index) => `
          <a class="mobile-promo-card" href="${index === 0 ? "#drug-finder" : "#advisor"}">
            <img src="${slide.image}" alt="${slide.title}" loading="lazy" />
          </a>
        `
      )
      .join("");
  }

  if (mobileCategoryRail) {
    mobileCategoryRail.innerHTML = MEGA_CATEGORIES.slice(0, 9)
      .map(
        (category) => `
          <button class="mobile-category-card" type="button" data-mobile-category="${category.id}">
            <span class="mobile-category-icon material-symbols-outlined">${megaCategoryIcon(category.id)}</span>
            <strong>${category.name}</strong>
          </button>
        `
      )
      .join("");

    mobileCategoryRail.querySelectorAll("[data-mobile-category]").forEach((button) => {
      button.addEventListener("click", () => {
        const categoryId = button.dataset.mobileCategory || null;
        if (!categoryId) return;

        state.selectedMegaCategoryId = categoryId;
        renderMegaCatalog();

        const category = findMegaCategoryById(categoryId);
        const targetId = category?.id === "disease-lookup" ? "advisor" : "drug-finder";
        scrollToSection(targetId);
      });
    });
  }
}

function renderSliderSlides(trackElement, slides, ctaHref) {
  trackElement.innerHTML = slides
    .map(
      (slide) => `
        ${
          slide.image
            ? `
              <article class="banner-slide image-only">
                <a class="banner-slide-link" href="${ctaHref}">
                  <img class="banner-slide-photo" src="${slide.image}" alt="${slide.title}" loading="lazy" />
                </a>
              </article>
            `
            : `
              <article class="banner-slide" style="--banner-tone: ${slide.tone}">
                <div class="banner-slide-copy">
                  <span>${slide.kicker}</span>
                  <h3>${slide.title}</h3>
                  <p>${slide.copy}</p>
                  <a class="primary-action" href="${ctaHref}">${slide.cta}</a>
                </div>
                <div class="banner-slide-aside">
                  <div class="banner-badge">${slide.badge}</div>
                  <div class="banner-orb banner-orb-a"></div>
                  <div class="banner-orb banner-orb-b"></div>
                </div>
              </article>
            `
        }
      `
    )
    .join("");
}

function paintSliderDots(name) {
  const slider = sliderState[name];
  if (!slider) return;

  slider.dotsElement.innerHTML = slider.slides
    .map(
      (_, index) => `
        <button
          class="banner-dot ${index === slider.index ? "active" : ""}"
          type="button"
          data-slider-dot="${name}"
          data-index="${index}"
          aria-label="Chuyển đến banner ${index + 1}"
        ></button>
      `
    )
    .join("");

  slider.dotsElement.querySelectorAll("[data-slider-dot]").forEach((dot) => {
    dot.addEventListener("click", () => {
      slider.index = Number(dot.dataset.index);
      updateSlider(name);
      restartSlider(name);
    });
  });
}

function updateSlider(name) {
  const slider = sliderState[name];
  if (!slider) return;

  slider.trackElement.style.transform = `translateX(-${slider.index * 100}%)`;
  paintSliderDots(name);
}

function restartSlider(name) {
  const slider = sliderState[name];
  if (!slider) return;

  if (slider.timer) {
    window.clearInterval(slider.timer);
  }

  slider.timer = window.setInterval(() => {
    slider.index = (slider.index + 1) % slider.slides.length;
    updateSlider(name);
  }, slider.delay);
}

function mountSlider({ name, slides, trackElement, dotsElement, ctaHref, delay }) {
  if (!trackElement || !dotsElement || !slides.length) return;

  renderSliderSlides(trackElement, slides, ctaHref);

  sliderState[name] = {
    index: 0,
    slides,
    trackElement,
    dotsElement,
    delay,
    timer: null
  };

  updateSlider(name);
  restartSlider(name);
}

function wireSliderControls() {
  document.querySelectorAll("[data-slider-prev]").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.sliderPrev;
      const slider = sliderState[name];
      if (!slider) return;

      slider.index = (slider.index - 1 + slider.slides.length) % slider.slides.length;
      updateSlider(name);
      restartSlider(name);
    });
  });

  document.querySelectorAll("[data-slider-next]").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.sliderNext;
      const slider = sliderState[name];
      if (!slider) return;

      slider.index = (slider.index + 1) % slider.slides.length;
      updateSlider(name);
      restartSlider(name);
    });
  });

  Object.entries(sliderState).forEach(([name, slider]) => {
    const root = document.querySelector(`[data-slider-root="${name}"]`);
    if (!root) return;

    root.addEventListener("mouseenter", () => {
      if (slider.timer) {
        window.clearInterval(slider.timer);
      }
    });

    root.addEventListener("mouseleave", () => {
      restartSlider(name);
    });
  });
}

function renderCategoryPills() {
  categoryPills.innerHTML = uniqueCategories()
    .map(
      (category) => `
        <button
          class="pill ${state.category === category ? "active" : ""}"
          type="button"
          data-category="${category}"
        >
          ${category}
        </button>
      `
    )
    .join("");

  categoryPills.querySelectorAll("[data-category]").forEach((pill) => {
    pill.addEventListener("click", () => {
      state.category = pill.dataset.category || "Tất cả";
      renderCatalog();
    });
  });
}

function renderCatalog() {
  renderCategoryPills();

  const medicines = filteredMedicines();

  if (!medicines.some((medicine) => medicine.id === state.selectedMedicineId)) {
    state.selectedMedicineId = medicines[0]?.id ?? null;
  }

  medicineGrid.innerHTML = medicines.length
    ? medicines
        .map((medicine) => {
          const activeClass =
            medicine.id === state.selectedMedicineId
              ? "medicine-card glass-card active"
              : "medicine-card glass-card";
          const guidance = medicineGuidance(medicine);

          return `
            <article class="${activeClass}" data-medicine-id="${medicine.id}">
              <div class="medicine-badge-row">
                <div class="medicine-badge">${medicine.badge}</div>
                <div class="medicine-safety-chip ${guidance.level}">${guidance.label}</div>
              </div>
              <a class="medicine-media-link" href="${productHref(medicine.id)}" data-detail-link="${medicine.id}">
                ${medicineMediaMarkup(medicine, "card")}
              </a>
              <div class="medicine-meta">
                <span>${medicine.category}</span>
              </div>
              <div class="medicine-card-copy">
                <h3>
                  <a class="medicine-title-link" href="${productHref(medicine.id)}" data-detail-link="${medicine.id}">
                    ${medicine.name}
                  </a>
                </h3>
                <p class="medicine-subtext">${medicine.ingredient}</p>
              </div>
              <div class="medicine-price-row">
                <strong>${currencyFormatter.format(medicine.price)}</strong>
                <span>/ ${medicine.pack.split(" ")[0]}</span>
              </div>
              <div class="medicine-pack-chip">${medicine.pack}</div>
              <div class="medicine-stock-line">Còn ${medicine.stock} đơn vị</div>
              <div class="medicine-tags">
                ${medicine.symptomTags
                  .slice(0, 2)
                  .map((tag) => `<span>${tag}</span>`)
                  .join("")}
              </div>
              <div class="medicine-actions">
                <button class="primary-action small-action" type="button" data-add-cart="${medicine.id}">
                  Chọn mua
                </button>
              </div>
            </article>
          `;
        })
        .join("")
    : `
        <article class="empty-state glass-card">
          <strong>Không có kết quả phù hợp</strong>
          <p>Thử tìm theo hoạt chất hoặc bỏ bớt bộ lọc danh mục.</p>
        </article>
      `;

  medicineGrid.querySelectorAll("[data-medicine-id]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedMedicineId = card.dataset.medicineId || null;
      renderCatalog();
    });
  });

  medicineGrid.querySelectorAll("[data-detail-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  medicineGrid.querySelectorAll("[data-add-cart]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      addToCart(button.dataset.addCart);
    });
  });

  renderMedicineDetail();
}

function renderMedicineDetail() {
  const medicine = state.selectedMedicineId
    ? findMedicineById(state.selectedMedicineId)
    : null;

  if (!medicine) {
    medicineDetail.innerHTML = `
      <div class="detail-head">
        <span class="eyebrow">Xem nhanh</span>
        <h3>Chưa có thuốc phù hợp bộ lọc</h3>
        <p>Hãy đổi từ khóa tìm kiếm hoặc chọn lại danh mục để xem dữ liệu.</p>
      </div>
    `;
    return;
  }

  const relatedDiseases = medicine.diseaseIds
    .map((diseaseId) => findDiseaseById(diseaseId))
    .filter(Boolean)
    .map((disease) => `<span>${disease.name}</span>`)
    .join("");
  const guidance = medicineGuidance(medicine);
  const guidanceLead =
    guidance.recommendedWhen[0] ??
    "Đọc kỹ mô tả thuốc và đối chiếu triệu chứng trước khi tự dùng.";

  medicineDetail.innerHTML = `
    ${medicineMediaMarkup(medicine, "detail")}

    <div class="detail-card-summary">
      <div class="detail-topline">
        <span class="detail-category">${medicine.category}</span>
      </div>
      <div class="detail-head">
        <h3>${medicine.name}</h3>
        <p>${medicine.usage}</p>
      </div>

      <div class="detail-meta-row">
        <div class="detail-meta-pill">
          <span>Thương hiệu</span>
          <strong>${medicine.brand}</strong>
        </div>
        <div class="detail-meta-pill">
          <span>Quy cách</span>
          <strong>${medicine.pack}</strong>
        </div>
      </div>

      <div class="detail-price">
        <strong>${currencyFormatter.format(medicine.price)}</strong>
        <span>${medicine.rating.toFixed(1)} / 5 lượt đánh giá</span>
      </div>

      <div class="selection-guidance ${guidance.level}">
        <div class="selection-guidance-head">
          <span>Đánh giá chọn thuốc</span>
          <strong>${guidance.label}</strong>
          <p>${guidanceLead}</p>
        </div>
      </div>

      <div class="detail-detail-grid">
        <div class="detail-block">
          <span>Hoạt chất</span>
          <strong>${medicine.ingredient}</strong>
        </div>
        <div class="detail-block">
          <span>Liều tham khảo</span>
          <p>${medicine.dosage}</p>
        </div>
        <div class="detail-block caution">
          <span>Cảnh báo</span>
          <p>${medicine.caution}</p>
        </div>
        <div class="detail-block">
          <span>Bệnh liên quan</span>
          <div class="inline-tags">${relatedDiseases}</div>
        </div>
      </div>
    </div>

    <div class="detail-actions">
      <button class="primary-action" type="button" data-add-cart="${medicine.id}">
        Thêm vào giỏ hàng
      </button>
      <a class="secondary-action" href="${productHref(medicine.id)}">Mở trang chi tiết</a>
      <button class="ghost-action" type="button" data-buy-now="${medicine.id}">
        Mua ngay
      </button>
    </div>
  `;

  medicineDetail.querySelector('[data-add-cart]')?.addEventListener("click", () => {
    addToCart(medicine.id);
  });

  medicineDetail.querySelector('[data-buy-now]')?.addEventListener("click", () => {
    addToCart(medicine.id);
    window.location.href = "cart.html";
  });
}

function renderDiseases() {
  diseaseRail.innerHTML = DISEASES.map(
    (disease) => `
      <button
        class="disease-card ${state.selectedDiseaseId === disease.id ? "active" : ""}"
        type="button"
        data-disease-id="${disease.id}"
      >
        <span>${disease.severity}</span>
        <strong>${disease.name}</strong>
        <small>${disease.summary}</small>
      </button>
    `
  ).join("");

  diseaseRail.querySelectorAll("[data-disease-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDiseaseId = button.dataset.diseaseId || null;
      renderAdvisor();
    });
  });
}

function renderAdvisor() {
  renderDiseases();

  const disease = findDiseaseById(state.selectedDiseaseId) || DISEASES[0];
  const recommendations = recommendationForDisease(disease.id);

  advisorOverview.innerHTML = `
    <div class="advisor-header">
      <span class="eyebrow">Bệnh được chọn</span>
      <h3>${disease.name}</h3>
      <p>${disease.summary}</p>
    </div>
    <div class="advisor-grid">
      <article>
        <span>Mức độ</span>
        <strong>${disease.severity}</strong>
      </article>
      <article>
        <span>Triệu chứng chính</span>
        <strong>${disease.symptomFocus.join(", ")}</strong>
      </article>
      <article>
        <span>Lời khuyên tại nhà</span>
        <strong>${disease.homeAdvice}</strong>
      </article>
    </div>
    <div class="red-flags">
      <span>Dấu hiệu cần đi khám:</span>
      ${disease.redFlags.map((flag) => `<strong>${flag}</strong>`).join("")}
    </div>
  `;

  advisorMeds.innerHTML = recommendations
    .map((medicine) => {
      const guidance = medicineGuidance(medicine);

      return `
        <article class="advisor-card glass-card">
          ${medicineMediaMarkup(medicine, "advisor")}
          <div class="advisor-card-head">
            <div>
              <span>${medicine.category}</span>
              <h4>
                <a class="medicine-title-link" href="${productHref(medicine.id)}">${medicine.name}</a>
              </h4>
            </div>
            <strong>${medicine.score}%</strong>
          </div>
          <p>${medicine.usage}</p>
          <div class="medicine-guidance-snippet ${guidance.level}">
            <strong>${guidance.label}</strong>
            <span>${guidance.level === "fit" ? guidance.recommendedWhen[0] : guidance.avoidWhen[0]}</span>
          </div>
          <div class="advisor-line">
            <span>Hoạt chất</span>
            <strong>${medicine.ingredient}</strong>
          </div>
          <div class="advisor-line">
            <span>Cảnh báo</span>
            <strong>${medicine.caution}</strong>
          </div>
          <div class="medicine-actions">
            <button class="primary-action small-action" type="button" data-add-cart="${medicine.id}">
              Thêm vào giỏ
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  advisorMeds.querySelectorAll("[data-add-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.addCart);
    });
  });
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = Number(entry.target.dataset.counter);
        let current = 0;

        const timer = window.setInterval(() => {
          current += Math.max(1, Math.ceil(target / 16));
          if (current >= target) {
            entry.target.textContent = String(target);
            window.clearInterval(timer);
            return;
          }
          entry.target.textContent = String(current);
        }, 70);

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function wireSearchInputs() {
  const syncSearch = (value) => {
    state.query = value;
    catalogSearch.value = value;
    globalSearch.value = value;
    renderCatalog();
  };

  [
    { input: globalSearch, panel: globalSearchSuggestions, source: "global" },
    { input: catalogSearch, panel: catalogSearchSuggestions, source: "catalog" }
  ].forEach(({ input, panel, source }) => {
    if (!input) return;

    input.closest(".hero-search, .search-stack")?.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    input.addEventListener("input", (event) => {
      syncSearch(event.target.value);
      renderSearchSuggestionsFor(input, panel, source);
    });

    input.addEventListener("focus", () => {
      renderSearchSuggestionsFor(input, panel, source);
    });

    input.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeSearchSuggestionPanels();
        return;
      }

      if (event.key === "Enter") {
        const firstSuggestion = panel?.querySelector("[data-suggestion-id]");
        if (firstSuggestion) {
          event.preventDefault();
          firstSuggestion.click();
        }
      }
    });

    panel?.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
}

function wireCatalogTrigger() {
  if (!catalogTrigger || !catalogDropdown) return;

  catalogTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = catalogTrigger.getAttribute("aria-expanded") === "true";
    setNoticePopoverOpen(false);
    setCatalogDropdownOpen(!isOpen);
  });

  catalogDropdown.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    closeHeaderPanels();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeHeaderPanels();
    }
  });
}

function wireCustomerShortcuts() {
  noticeTrigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = noticeTrigger.getAttribute("aria-expanded") === "true";
    setCatalogDropdownOpen(false);
    setCartPopoverOpen(false);
    setNoticePopoverOpen(!isOpen);
  });

  noticePopover?.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  cartTrigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = cartTrigger.getAttribute("aria-expanded") === "true";
    setCatalogDropdownOpen(false);
    setNoticePopoverOpen(false);
    setCartPopoverOpen(!isOpen);
  });

  cartPopover?.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  accountTrigger?.addEventListener("click", () => {
    closeHeaderPanels();
    window.location.href = "profile.html";
  });
}

function wireLoginForm() {
  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    state.isLoggedIn = true;
    state.customer = {
      ...SAMPLE_CUSTOMER,
      phone: loginPhone?.value.trim() || SAMPLE_CUSTOMER.phone
    };
    persistCustomer();
    renderCustomerProfile();
    renderNotifications();
    updateHeaderShortcuts();
    setNoticePopoverOpen(false);
    window.location.href = "profile.html";
  });

  loginFill?.addEventListener("click", () => {
    if (loginPhone) loginPhone.value = SAMPLE_CUSTOMER.phone;
    if (loginPassword) loginPassword.value = "matkhau123";
  });
}

function wireScenarioChecker() {
  if (scenarioAnalyze) {
    scenarioAnalyze.addEventListener("click", () => {
      analyzeScenario();
    });
  }

  if (scenarioClear) {
    scenarioClear.addEventListener("click", () => {
      resetPrescriptionState();

      (scenarioFlags?.querySelectorAll('input[type="checkbox"]') ?? []).forEach((input) => {
        input.checked = false;
      });

      renderScenarioResult(
        {
          medicines: [],
          externalProducts: [],
          diseases: [],
          symptoms: [],
          flags: [],
          intents: []
        },
        {
          level: "caution",
          quickAnswer: "Hãy nhập tên thuốc, bệnh hoặc triệu chứng. Mình sẽ trả lời theo dữ liệu đang có trên trang này.",
          reasons: ["Nhập một tình huống hoặc tải ảnh đơn thuốc để hệ thống giải thích theo dữ liệu hiện có."],
          safetyNotes: ["Bạn có thể bắt đầu bằng ví dụ như Panadol kết hợp Alexan hoặc chụp rõ ảnh đơn thuốc để quét."],
          nextSteps: ["Điền tên thuốc, bệnh, triệu chứng hoặc tải ảnh đơn thuốc rồi bấm phân tích."],
          recommendedProducts: []
        },
        {
          showPrescription: false
        }
      );
    });
  }

  scenarioInput?.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      analyzeScenario();
    }
  });
}

function wirePrescriptionUploader() {
  prescriptionImageInput?.addEventListener("change", (event) => {
    const [file] = event.target.files ?? [];
    setPrescriptionFile(file ?? null);
  });

  prescriptionScan?.addEventListener("click", () => {
    scanPrescriptionImage();
  });

  prescriptionReset?.addEventListener("click", () => {
    resetPrescriptionState();
    renderScenarioResult(
      {
        medicines: [],
        externalProducts: [],
        diseases: [],
        symptoms: [],
        flags: [],
        intents: []
      },
      {
        level: "caution",
        quickAnswer: "Hãy nhập tên thuốc, bệnh hoặc triệu chứng. Mình sẽ trả lời theo dữ liệu đang có trên trang này.",
        reasons: ["Nhập một tình huống hoặc tải ảnh đơn thuốc để hệ thống giải thích theo dữ liệu hiện có."],
        safetyNotes: ["Bạn có thể bắt đầu bằng ví dụ như Panadol kết hợp Alexan hoặc chụp rõ ảnh đơn thuốc để quét."],
        nextSteps: ["Điền tên thuốc, bệnh, triệu chứng hoặc tải ảnh đơn thuốc rồi bấm phân tích."],
        recommendedProducts: []
      },
      {
        showPrescription: false
      }
    );
  });

  updatePrescriptionControls();
}

function revealOnScroll() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function init() {
  renderMegaCatalog();
  renderQuickSearches();
  renderMobileHome();
  renderScenarioExamples();
  renderScenarioFlags();
  renderCartSection();
  renderNotifications();
  renderCustomerProfile();
  updateHeaderShortcuts();
  mountSlider({
    name: "hero",
    slides: HERO_BANNERS,
    trackElement: heroBannerTrack,
    dotsElement: heroBannerDots,
    ctaHref: "#drug-finder",
    delay: 4800
  });
  mountSlider({
    name: "inline",
    slides: INLINE_BANNERS,
    trackElement: inlineBannerTrack,
    dotsElement: inlineBannerDots,
    ctaHref: "#advisor",
    delay: 4200
  });
  renderCatalog();
  renderAdvisor();
  analyzeScenario();
  wireSearchInputs();
  wireSliderControls();
  wireCatalogTrigger();
  wireCustomerShortcuts();
  wireLoginForm();
  wirePrescriptionUploader();
  wireScenarioChecker();
  animateCounters();
  revealOnScroll();
}

init();
