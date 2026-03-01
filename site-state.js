const APP_STORAGE_KEYS = {
  cart: "nhathuocantam-cart-v1",
  customer: "nhathuocantam-customer-v1"
};

function safeParseJSON(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (_error) {
    return fallback;
  }
}

function normalizeCartItems(cart) {
  if (!Array.isArray(cart)) return [];

  return cart
    .map((item) => ({
      id: String(item?.id ?? ""),
      quantity: Number(item?.quantity ?? 0)
    }))
    .filter((item) => item.id && Number.isFinite(item.quantity) && item.quantity > 0);
}

function safeGetItem(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (_error) {
    return null;
  }
}

function safeSetItem(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (_error) {
    return;
  }
}

function safeRemoveItem(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (_error) {
    return;
  }
}

function renderSharedChrome() {
  const cart = normalizeCartItems(safeParseJSON(safeGetItem(APP_STORAGE_KEYS.cart), []));
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll("[data-cart-badge]").forEach((badge) => {
    badge.textContent = String(totalItems);
    badge.classList.toggle("is-hidden", totalItems === 0);
  });
}

window.AppStore = {
  loadCart() {
    return normalizeCartItems(safeParseJSON(safeGetItem(APP_STORAGE_KEYS.cart), []));
  },
  saveCart(cart) {
    safeSetItem(APP_STORAGE_KEYS.cart, JSON.stringify(normalizeCartItems(cart)));
    renderSharedChrome();
  },
  loadCustomer() {
    const customer = safeParseJSON(safeGetItem(APP_STORAGE_KEYS.customer), null);
    return customer && typeof customer === "object" ? customer : null;
  },
  saveCustomer(customer) {
    if (!customer || typeof customer !== "object") {
      safeRemoveItem(APP_STORAGE_KEYS.customer);
      return;
    }

    safeSetItem(APP_STORAGE_KEYS.customer, JSON.stringify(customer));
  },
  clearCustomer() {
    safeRemoveItem(APP_STORAGE_KEYS.customer);
  }
};

function markPageReady() {
  const loader = document.getElementById("page-loader");

  document.body?.classList.add("page-ready");
  renderSharedChrome();

  if (!loader) return;

  window.setTimeout(() => {
    loader.remove();
  }, 320);
}

if (document.readyState === "complete") {
  markPageReady();
} else {
  window.addEventListener("load", markPageReady, { once: true });
}

function initFloatingWidget() {
  const chatTrigger = document.getElementById("floating-chat-trigger");
  const topTrigger = document.getElementById("floating-top-trigger");

  chatTrigger?.addEventListener("click", () => {
    const scenarioSection = document.getElementById("scenario-checker");
    const scenarioInput = document.getElementById("scenario-input");
    const advisorSection = document.getElementById("advisor");

    if (scenarioSection) {
      scenarioSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      window.setTimeout(() => {
        scenarioInput?.focus();
      }, 420);
      return;
    }

    if (advisorSection) {
      advisorSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }

    window.location.href = "index.html#scenario-checker";
  });

  topTrigger?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

initFloatingWidget();
