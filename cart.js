const cartState = {
  cart: window.AppStore?.loadCart() ?? [],
  customer: window.AppStore?.loadCustomer() ?? null
};

const cartPanel = document.getElementById("cart-panel");
const cartContext = document.getElementById("cart-context");
const cartHeroCard = document.getElementById("cart-hero-card");
const cartAccountName = document.getElementById("cart-account-name");

const cartCurrencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

function findMedicineById(id) {
  return MEDICINES.find((medicine) => medicine.id === id);
}

function cartItemCount() {
  return cartState.cart.reduce((total, item) => total + item.quantity, 0);
}

function cartItemsDetailed() {
  return cartState.cart
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

function shippingFeeFor(subtotal) {
  return subtotal >= 199000 || subtotal === 0 ? 0 : 18000;
}

function persistCart() {
  window.AppStore?.saveCart(cartState.cart);
}

function updateCartQuantity(medicineId, delta) {
  const item = cartState.cart.find((cartItem) => cartItem.id === medicineId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    cartState.cart = cartState.cart.filter((cartItem) => cartItem.id !== medicineId);
  }

  persistCart();
  renderCartPage();
}

function removeFromCart(medicineId) {
  cartState.cart = cartState.cart.filter((item) => item.id !== medicineId);
  persistCart();
  renderCartPage();
}

function renderCartHero() {
  if (!cartHeroCard) return;

  const subtotal = cartSubtotal();
  const shippingFee = shippingFeeFor(subtotal);
  const total = subtotal + shippingFee;
  const itemCount = cartItemCount();
  const customerName = cartState.customer?.name ?? "Khách hàng";

  if (cartAccountName) {
    cartAccountName.textContent = customerName;
  }

  cartHeroCard.innerHTML = `
    <div class="account-card-head">
      <span class="eyebrow">Tổng quan đơn hàng</span>
      <h3>${itemCount ? `${itemCount} sản phẩm đã chọn` : "Giỏ hàng đang trống"}</h3>
    </div>
    <div class="account-stat-grid">
      <article class="account-stat-card">
        <span>Tạm tính</span>
        <strong class="account-stat-value">${cartCurrencyFormatter.format(subtotal)}</strong>
      </article>
      <article class="account-stat-card">
        <span>Phí giao hàng</span>
        <strong class="account-stat-value">${cartCurrencyFormatter.format(shippingFee)}</strong>
      </article>
      <article class="account-stat-card">
        <span>Tổng sản phẩm</span>
        <strong class="account-stat-value">${itemCount}</strong>
      </article>
      <article class="account-stat-card">
        <span>Tổng thanh toán</span>
        <strong class="account-stat-value">${cartCurrencyFormatter.format(total)}</strong>
      </article>
    </div>
    <div class="detail-block">
      <span>Gợi ý</span>
      <p class="detail-value">
        ${
          itemCount
            ? "Bạn có thể tiếp tục kiểm tra số lượng rồi sang trang thanh toán để hoàn tất thông tin nhận hàng."
            : "Hãy quay lại trang chủ để tìm thêm thuốc, thực phẩm bổ sung hoặc sản phẩm chăm sóc phù hợp."
        }
      </p>
    </div>
  `;
}

function renderCartPage() {
  if (!cartPanel) return;

  const items = cartItemsDetailed();
  const subtotal = cartSubtotal();
  const shippingFee = shippingFeeFor(subtotal);
  const total = subtotal + shippingFee;

  if (cartContext) {
    cartContext.textContent = items.length
      ? `${cartItemCount()} sản phẩm trong giỏ hàng`
      : "Giỏ hàng của bạn đang trống";
  }

  cartPanel.innerHTML = items.length
    ? `
        <div class="cart-filled">
          <div class="cart-items">
            ${items
              .map(
                (item) => `
                  <article class="cart-item">
                    <div class="cart-item-copy">
                      <strong>${item.name}</strong>
                      <span>${item.pack} • ${item.brand}</span>
                      <small>${cartCurrencyFormatter.format(item.price)} x ${item.quantity}</small>
                    </div>
                    <div class="cart-item-actions">
                      <div class="qty-control">
                        <button type="button" data-cart-dec="${item.id}">−</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-cart-inc="${item.id}">+</button>
                      </div>
                      <strong>${cartCurrencyFormatter.format(item.lineTotal)}</strong>
                      <button class="link-button" type="button" data-cart-remove="${item.id}">
                        Xóa
                      </button>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
          <aside class="cart-summary-panel">
            <div class="cart-summary">
              <div><span>Tạm tính</span><strong>${cartCurrencyFormatter.format(subtotal)}</strong></div>
              <div><span>Phí giao hàng</span><strong>${cartCurrencyFormatter.format(shippingFee)}</strong></div>
              <div class="cart-total"><span>Tổng cộng</span><strong>${cartCurrencyFormatter.format(total)}</strong></div>
              <div class="cart-inline-actions">
                <a class="cart-checkout-button" href="checkout.html">Tiến hành đặt hàng</a>
                <a class="secondary-action" href="index.html#drug-finder">Thêm sản phẩm khác</a>
              </div>
            </div>
          </aside>
        </div>
      `
    : `
        <div class="empty-cart">
          <div class="empty-cart-visual">
            <span class="material-symbols-outlined">shopping_cart</span>
          </div>
          <strong>Chưa có sản phẩm nào</strong>
          <p>Hãy quay lại trang chủ để thêm thuốc và sản phẩm phù hợp với nhu cầu của bạn.</p>
          <a class="cart-checkout-button" href="index.html#drug-finder">Khám phá ngay</a>
        </div>
      `;

  cartPanel.querySelectorAll("[data-cart-inc]").forEach((button) => {
    button.addEventListener("click", () => {
      updateCartQuantity(button.dataset.cartInc, 1);
    });
  });

  cartPanel.querySelectorAll("[data-cart-dec]").forEach((button) => {
    button.addEventListener("click", () => {
      updateCartQuantity(button.dataset.cartDec, -1);
    });
  });

  cartPanel.querySelectorAll("[data-cart-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.dataset.cartRemove);
    });
  });

  renderCartHero();
}

renderCartPage();
