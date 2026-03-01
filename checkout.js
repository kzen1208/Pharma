const checkoutState = {
  cart: window.AppStore?.loadCart() ?? [],
  customer: window.AppStore?.loadCustomer() ?? SAMPLE_CUSTOMER,
  deliveryMethod: "delivery",
  paymentMethod: "cod",
  shippingMethod: "standard",
  concealItems: false,
  saveInfo: true,
  placedOrder: null
};

const checkoutRoot = document.getElementById("checkout-root");
const checkoutMain = document.getElementById("checkout-main");
const checkoutSummary = document.getElementById("checkout-summary");
const checkoutAccountName = document.getElementById("checkout-account-name");

const checkoutCurrencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

const SHIPPING_METHODS = [
  {
    id: "standard",
    title: "Giao tiêu chuẩn",
    note: "Nhận hàng trong ngày hoặc ngày hôm sau",
    fee: 0
  },
  {
    id: "fast",
    title: "Giao nhanh ưu tiên",
    note: "Ưu tiên xử lý và giao sớm hơn",
    fee: 18000
  }
];

const PAYMENT_METHODS = [
  { id: "cod", badge: "COD", title: "Tiền mặt", note: "Thanh toán khi nhận hàng" },
  { id: "momo", badge: "MoMo", title: "MoMo", note: "Ví điện tử" },
  { id: "zalopay", badge: "ZaloPay", title: "ZaloPay", note: "Ví điện tử" },
  { id: "atm", badge: "ATM", title: "Thẻ ATM", note: "Nội địa" },
  { id: "card", badge: "CARD", title: "Thẻ quốc tế", note: "Visa, Mastercard" }
];

const CITY_OPTIONS = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ"];

function findMedicineById(id) {
  return MEDICINES.find((medicine) => medicine.id === id);
}

function checkoutItemCount() {
  return checkoutState.cart.reduce((total, item) => total + item.quantity, 0);
}

function checkoutItemsDetailed() {
  return checkoutState.cart
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

function subtotalValue() {
  return checkoutItemsDetailed().reduce((total, item) => total + item.lineTotal, 0);
}

function activeShipping() {
  return SHIPPING_METHODS.find((method) => method.id === checkoutState.shippingMethod) ?? SHIPPING_METHODS[0];
}

function totalValue() {
  return subtotalValue() + activeShipping().fee;
}

function renderCheckoutMedia(medicine) {
  if (medicine.image) {
    return `
      <div class="checkout-item-media-frame">
        <img class="checkout-item-image" src="${medicine.image}" alt="${medicine.name}" loading="lazy" />
      </div>
    `;
  }

  return `
    <div class="checkout-item-media-frame">
      <div class="medicine-box-mock checkout-item-box">
        <div class="medicine-box-front">
          <span>${medicine.brand}</span>
          <strong>${medicine.name}</strong>
          <small>${medicine.ingredient}</small>
        </div>
        <div class="medicine-box-side"></div>
      </div>
    </div>
  `;
}

function shippingFeeLabel(fee) {
  return fee === 0 ? "Miễn phí" : checkoutCurrencyFormatter.format(fee);
}

function deriveAddressParts(address) {
  const [line = "", district = "", city = ""] = (address ?? "").split(",").map((part) => part.trim());

  return {
    line,
    district: district || "Quận 5",
    ward: "Phường 2",
    city: CITY_OPTIONS.includes(city) ? city : "TP. Hồ Chí Minh"
  };
}

function renderEmptyCheckout() {
  if (!checkoutMain || !checkoutSummary) return;

  checkoutMain.innerHTML = `
    <article class="checkout-card glass-card empty-cart">
      <div class="empty-cart-visual">
        <span class="material-symbols-outlined">shopping_cart</span>
      </div>
      <strong>Chưa có sản phẩm để thanh toán</strong>
      <p>Hãy quay lại giỏ hàng hoặc trang chủ để thêm sản phẩm trước khi tiếp tục.</p>
      <a class="cart-checkout-button" href="cart.html">Quay lại giỏ hàng</a>
    </article>
  `;

  checkoutSummary.innerHTML = "";
}

function renderPlacedOrder(order) {
  if (!checkoutMain || !checkoutSummary) return;

  checkoutMain.innerHTML = `
    <article class="checkout-card glass-card checkout-success-card">
      <span class="eyebrow">Đặt hàng thành công</span>
      <h1>${order.code}</h1>
      <p>Đơn hàng của bạn đã được ghi nhận. Nhà thuốc sẽ liên hệ để xác nhận và chuẩn bị giao hàng.</p>
      <div class="checkout-success-actions">
        <a class="cart-checkout-button" href="index.html#drug-finder">Tiếp tục mua sắm</a>
        <a class="secondary-action" href="profile.html">Xem tài khoản</a>
      </div>
    </article>
  `;

  checkoutSummary.innerHTML = `
    <article class="checkout-card glass-card checkout-summary-card">
      <div class="account-card-head">
        <span class="eyebrow">Trạng thái</span>
        <h3>Đã xác nhận đơn</h3>
      </div>
      <div class="checkout-summary-list">
        <div><span>Mã đơn</span><strong>${order.code}</strong></div>
        <div><span>Tổng tiền</span><strong>${checkoutCurrencyFormatter.format(order.total)}</strong></div>
        <div><span>Thanh toán</span><strong>${order.paymentTitle}</strong></div>
        <div><span>Số sản phẩm</span><strong>${order.itemCount}</strong></div>
      </div>
    </article>
  `;
}

function renderCheckoutPage() {
  if (!checkoutMain || !checkoutSummary) return;

  if (checkoutAccountName) {
    checkoutAccountName.textContent = checkoutState.customer?.name ?? "Khách hàng";
  }

  if (checkoutState.placedOrder) {
    renderPlacedOrder(checkoutState.placedOrder);
    return;
  }

  const items = checkoutItemsDetailed();
  if (!items.length) {
    renderEmptyCheckout();
    return;
  }

  const subtotal = subtotalValue();
  const shipping = activeShipping();
  const total = subtotal + shipping.fee;
  const address = deriveAddressParts(checkoutState.customer?.address);

  checkoutMain.innerHTML = `
    <article class="checkout-card glass-card checkout-section-card">
      <div class="account-card-head">
        <span class="eyebrow">Thanh toán</span>
        <h1>Hoàn tất đơn hàng</h1>
      </div>

      <div class="checkout-inline-note">
        <strong>Đơn hàng của bạn</strong>
        <span>Kiểm tra thông tin nhận hàng, phương thức giao và hình thức thanh toán trước khi xác nhận.</span>
      </div>

      <div class="checkout-item-list">
        ${items
          .map(
            (item) => `
              <article class="checkout-item">
                <div class="checkout-item-media">
                  ${renderCheckoutMedia(item)}
                </div>
                <div class="checkout-item-copy">
                  <strong>${item.name}</strong>
                  <span>${item.pack}</span>
                  <small>${item.brand}</small>
                </div>
                <div class="checkout-item-meta">
                  <span>x${item.quantity}</span>
                  <strong>${checkoutCurrencyFormatter.format(item.lineTotal)}</strong>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </article>

    <article class="checkout-card glass-card checkout-section-card">
      <div class="checkout-section-head">
        <h2>Hình thức nhận hàng</h2>
      </div>
      <div class="checkout-chip-row">
        <button class="checkout-chip ${checkoutState.deliveryMethod === "delivery" ? "active" : ""}" type="button" data-delivery-method="delivery">
          Giao hàng tận nơi
        </button>
        <button class="checkout-chip ${checkoutState.deliveryMethod === "pickup" ? "active" : ""}" type="button" data-delivery-method="pickup">
          Nhận tại nhà thuốc
        </button>
      </div>

      <form class="checkout-form" id="checkout-form">
        <div class="checkout-form-block">
          <div class="checkout-form-title">Thông tin người đặt hàng</div>
          <div class="checkout-form-grid">
            <label class="checkout-field">
              <span>Họ và tên</span>
              <input type="text" name="name" value="${checkoutState.customer?.name ?? SAMPLE_CUSTOMER.name}" placeholder="Nhập họ và tên" required />
            </label>
            <label class="checkout-field">
              <span>Số điện thoại</span>
              <input type="tel" name="phone" value="${checkoutState.customer?.phone ?? SAMPLE_CUSTOMER.phone}" placeholder="Nhập số điện thoại" required />
            </label>
          </div>
        </div>

        <div class="checkout-form-block">
          <div class="checkout-form-title">Địa chỉ nhận hàng</div>
          <div class="checkout-form-grid">
            <label class="checkout-field">
              <span>Địa chỉ</span>
              <input type="text" name="addressLine" value="${address.line}" placeholder="Nhập số nhà, tên đường" required />
            </label>
            <label class="checkout-field">
              <span>Tỉnh / Thành phố</span>
              <select name="city" required>
                ${CITY_OPTIONS.map((city) => `<option value="${city}" ${city === address.city ? "selected" : ""}>${city}</option>`).join("")}
              </select>
            </label>
            <label class="checkout-field">
              <span>Quận / Huyện</span>
              <input type="text" name="district" value="${address.district}" placeholder="Nhập Quận / Huyện" required />
            </label>
            <label class="checkout-field">
              <span>Phường / Xã</span>
              <input type="text" name="ward" value="${address.ward}" placeholder="Nhập Phường / Xã" required />
            </label>
          </div>
          <label class="checkout-field checkout-field-note">
            <span>Ghi chú</span>
            <textarea name="note" rows="3" placeholder="Ghi chú giao hàng nếu có"></textarea>
          </label>
        </div>

        <div class="checkout-form-block">
          <div class="checkout-form-title">Chọn đơn vị vận chuyển</div>
          <div class="checkout-shipping-list">
            ${SHIPPING_METHODS.map(
              (method) => `
                <label class="checkout-option">
                  <input type="radio" name="shippingMethod" value="${method.id}" ${checkoutState.shippingMethod === method.id ? "checked" : ""} />
                  <span class="checkout-option-dot"></span>
                  <span class="checkout-option-copy">
                    <strong>${method.title}</strong>
                    <small>${method.note}</small>
                  </span>
                  <strong>${shippingFeeLabel(method.fee)}</strong>
                </label>
              `
            ).join("")}
          </div>
        </div>

        <div class="checkout-form-block">
          <div class="checkout-form-title">Phương thức thanh toán</div>
          <div class="checkout-payment-list">
            ${PAYMENT_METHODS.map(
              (method) => `
                <label class="checkout-option payment ${checkoutState.paymentMethod === method.id ? "selected" : ""}">
                  <input type="radio" name="paymentMethod" value="${method.id}" ${checkoutState.paymentMethod === method.id ? "checked" : ""} />
                  <span class="checkout-option-dot"></span>
                  <span class="checkout-payment-badge">${method.badge}</span>
                  <span class="checkout-option-copy">
                    <strong>${method.title}</strong>
                    <small>${method.note}</small>
                  </span>
                </label>
              `
            ).join("")}
          </div>
        </div>

        <label class="checkout-toggle">
          <input type="checkbox" name="saveInfo" ${checkoutState.saveInfo ? "checked" : ""} />
          <span>Lưu lại thông tin cho lần mua hàng sau</span>
        </label>
      </form>
    </article>
  `;

  checkoutSummary.innerHTML = `
    <article class="checkout-card glass-card checkout-summary-card">
      <div class="checkout-summary-toggle">
        <div>
          <strong>Ẩn thông tin sản phẩm</strong>
          <span>Phiếu gửi hàng sẽ không hiện tên thuốc chi tiết.</span>
        </div>
        <button class="checkout-switch ${checkoutState.concealItems ? "active" : ""}" type="button" id="conceal-items-trigger" aria-pressed="${checkoutState.concealItems}">
          <span></span>
        </button>
      </div>

      <div class="checkout-summary-block">
        <h3>Chi tiết thanh toán</h3>
        <div class="checkout-summary-list">
          <div><span>Tạm tính</span><strong>${checkoutCurrencyFormatter.format(subtotal)}</strong></div>
          <div><span>Phí vận chuyển</span><strong>${checkoutCurrencyFormatter.format(shipping.fee)}</strong></div>
          <div class="checkout-summary-total">
            <span>Tổng tiền</span>
            <strong>${checkoutCurrencyFormatter.format(total)}</strong>
          </div>
          <small>${checkoutItemCount()} sản phẩm</small>
        </div>
      </div>

      <label class="checkout-terms">
        <input type="checkbox" id="checkout-terms" checked />
        <span>Bằng cách tích vào ô chọn, bạn đã đồng ý với điều khoản mua hàng và xác nhận đã đọc kỹ thông tin sản phẩm.</span>
      </label>

      <button class="cart-checkout-button checkout-submit-button" type="submit" form="checkout-form">
        Đặt hàng
      </button>
    </article>
  `;

  checkoutMain.querySelectorAll("[data-delivery-method]").forEach((button) => {
    button.addEventListener("click", () => {
      checkoutState.deliveryMethod = button.dataset.deliveryMethod || "delivery";
      renderCheckoutPage();
    });
  });

  checkoutMain.querySelectorAll('input[name="shippingMethod"]').forEach((input) => {
    input.addEventListener("change", () => {
      checkoutState.shippingMethod = input.value;
      renderCheckoutPage();
    });
  });

  checkoutMain.querySelectorAll('input[name="paymentMethod"]').forEach((input) => {
    input.addEventListener("change", () => {
      checkoutState.paymentMethod = input.value;
      renderCheckoutPage();
    });
  });

  checkoutMain.querySelector('input[name="saveInfo"]')?.addEventListener("change", (event) => {
    checkoutState.saveInfo = Boolean(event.target.checked);
  });

  checkoutSummary.querySelector("#conceal-items-trigger")?.addEventListener("click", () => {
    checkoutState.concealItems = !checkoutState.concealItems;
    renderCheckoutPage();
  });

  checkoutMain.querySelector("#checkout-form")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const termsAccepted = checkoutSummary.querySelector("#checkout-terms")?.checked;

    if (!termsAccepted) {
      alert("Bạn cần đồng ý điều khoản trước khi đặt hàng.");
      return;
    }

    const customer = {
      ...(checkoutState.customer || SAMPLE_CUSTOMER),
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      address: `${String(formData.get("addressLine") || "").trim()}, ${String(formData.get("district") || "").trim()}, ${String(formData.get("city") || "").trim()}`
    };

    if (!customer.name || !customer.phone || !formData.get("addressLine")) {
      alert("Vui lòng nhập đủ họ tên, số điện thoại và địa chỉ nhận hàng.");
      return;
    }

    checkoutState.customer = customer;

    if (checkoutState.saveInfo) {
      window.AppStore?.saveCustomer(customer);
    }

    const placedOrder = {
      code: `ĐH${Math.floor(1000 + Math.random() * 9000)}`,
      total,
      itemCount: checkoutItemCount(),
      paymentTitle: PAYMENT_METHODS.find((item) => item.id === checkoutState.paymentMethod)?.title ?? "Tiền mặt"
    };

    window.AppStore?.saveCart([]);
    checkoutState.cart = [];
    checkoutState.placedOrder = placedOrder;
    renderCheckoutPage();
  });
}

renderCheckoutPage();
