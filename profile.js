const profileCustomer = window.AppStore?.loadCustomer() ?? SAMPLE_CUSTOMER;
const profileOrders = SAMPLE_ORDERS;

const profileNavName = document.getElementById("profile-nav-name");
const profilePageName = document.getElementById("profile-page-name");
const profileHeroCard = document.getElementById("profile-hero-card");
const profilePageInfo = document.getElementById("profile-page-info");
const profilePageAddresses = document.getElementById("profile-page-addresses");
const profilePageOrders = document.getElementById("profile-page-orders");

const profileCurrencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

const SAVED_ADDRESSES = [
  {
    label: "Địa chỉ mặc định",
    note: "Nhận hàng tại nhà",
    address: profileCustomer.address
  },
  {
    label: "Địa chỉ dự phòng",
    note: "Nhận hàng giờ hành chính",
    address: "Tầng 6, 12 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh"
  }
];

const PROFILE_SUPPORT = [
  {
    title: "Gợi ý dành cho bạn",
    copy: "Theo dõi điểm thưởng, ưu đãi và nhắc mua lại để không bỏ lỡ sản phẩm đang dùng."
  },
  {
    title: "Cập nhật hồ sơ sức khỏe",
    copy: "Bạn có thể bổ sung thông tin dị ứng, bệnh nền và thói quen chăm sóc để được tư vấn phù hợp hơn."
  }
];

function renderProfilePage() {
  if (profileNavName) {
    profileNavName.textContent = profileCustomer.name;
  }

  if (profilePageName) {
    profilePageName.textContent = profileCustomer.name;
  }

  if (profileHeroCard) {
    profileHeroCard.innerHTML = `
      <div class="account-card-head">
        <span class="eyebrow">Tổng quan tài khoản</span>
        <h3>${profileCustomer.membership}</h3>
      </div>
      <div class="account-stat-grid">
        <article class="account-stat-card">
          <span>Điểm thưởng</span>
          <strong class="account-stat-value">${profileCustomer.points} điểm</strong>
        </article>
        <article class="account-stat-card">
          <span>Đơn hàng gần đây</span>
          <strong class="account-stat-value">${profileOrders.length} đơn</strong>
        </article>
        <article class="account-stat-card">
          <span>Số điện thoại</span>
          <strong class="account-stat-value">${profileCustomer.phone}</strong>
        </article>
        <article class="account-stat-card">
          <span>Thông báo mới</span>
          <strong class="account-stat-value">${CUSTOMER_NOTIFICATIONS.length} thông báo</strong>
        </article>
      </div>
    `;
  }

  if (profilePageInfo) {
    profilePageInfo.innerHTML = `
      <div class="account-card-head">
        <span class="eyebrow">Hồ sơ khách hàng</span>
        <h3>${profileCustomer.name}</h3>
      </div>
      <div class="account-stat-grid">
        <article class="account-stat-card">
          <span>Hạng thành viên</span>
          <strong class="account-stat-value">${profileCustomer.membership}</strong>
        </article>
        <article class="account-stat-card">
          <span>Email</span>
          <strong class="account-stat-value">${profileCustomer.email}</strong>
        </article>
      </div>
      <div class="detail-block">
        <span>Số điện thoại</span>
        <p class="detail-value">${profileCustomer.phone}</p>
      </div>
      <div class="detail-block">
        <span>Ngày sinh</span>
        <p class="detail-value">${profileCustomer.birthday}</p>
      </div>
      <div class="profile-support-list">
        ${PROFILE_SUPPORT.map(
          (item) => `
            <article class="profile-support-card">
              <strong>${item.title}</strong>
              <p>${item.copy}</p>
            </article>
          `
        ).join("")}
      </div>
    `;
  }

  if (profilePageAddresses) {
    profilePageAddresses.innerHTML = `
      <div class="account-card-head">
        <span class="eyebrow">Địa chỉ nhận hàng</span>
        <h3>Thông tin giao hàng</h3>
      </div>
      <div class="profile-address-list">
        ${SAVED_ADDRESSES.map(
          (address) => `
            <article class="profile-address-card">
              <strong>${address.label}</strong>
              <span>${address.note}</span>
              <p>${address.address}</p>
            </article>
          `
        ).join("")}
      </div>
    `;
  }

  if (profilePageOrders) {
    profilePageOrders.innerHTML = `
      <div class="account-card-head">
        <span class="eyebrow">Lịch sử đơn hàng</span>
        <h3>Đơn hàng gần đây</h3>
      </div>
      <div class="profile-order-list">
        ${profileOrders
          .map(
            (order) => `
              <article class="profile-order-item">
                <div class="profile-order-copy">
                  <strong>${order.id}</strong>
                  <span>${order.items}</span>
                </div>
                <div class="profile-order-meta">
                  <span>${order.status}</span>
                  <strong>${profileCurrencyFormatter.format(order.total)}</strong>
                  <small>Thanh toán khi nhận hàng</small>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }
}

renderProfilePage();
