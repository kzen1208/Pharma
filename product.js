const productParams = new URLSearchParams(window.location.search);
const productId = productParams.get("id");

const productAccountName = document.getElementById("product-account-name");
const productBreadcrumbs = document.getElementById("product-breadcrumbs");
const productGallery = document.getElementById("product-gallery");
const productSummary = document.getElementById("product-summary");
const productSpecs = document.getElementById("product-specs");
const productGuidance = document.getElementById("product-guidance");

const productCurrencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

const productState = {
  medicineId: productId,
  medicine: null,
  quantity: 1,
  activeMediaIndex: 0,
  cart: window.AppStore?.loadCart() ?? [],
  customer: window.AppStore?.loadCustomer() ?? null
};

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function lowerFirst(text) {
  if (!text) return "";
  return text.charAt(0).toLowerCase() + text.slice(0 + 1);
}

function findMedicineById(id) {
  return MEDICINES.find((medicine) => medicine.id === id);
}

function findDiseaseById(id) {
  return DISEASES.find((disease) => disease.id === id);
}

function unitLabel(pack) {
  const token = pack.split(" ")[0];
  return token || "Sản phẩm";
}

function dosageFormForMedicine(medicine) {
  const pack = medicine.pack.toLowerCase();
  const name = medicine.name.toLowerCase();

  if (pack.includes("chai") && name.includes("xịt")) return "Dung dịch xịt";
  if (pack.includes("chai") && name.includes("siro")) return "Siro";
  if (pack.includes("chai")) return "Dung dịch";
  if (pack.includes("gói")) return "Cốm / gói";
  if (pack.includes("ngậm")) return "Viên ngậm";
  if (pack.includes("nhai")) return "Viên nhai";
  if (pack.includes("nang")) return "Viên nang";
  if (pack.includes("viên")) return "Viên nén";

  return "Sản phẩm chăm sóc sức khỏe";
}

function registrationCodeForMedicine(medicine) {
  const base = medicine.id.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 6);
  return `${1200 + Math.round(medicine.graphWeight * 100)}/2026/${base || "AT"}`;
}

function ratingCountForMedicine(medicine) {
  return Math.max(48, Math.round(medicine.rating * 41 + medicine.stock * 0.3));
}

function commentCountForMedicine(medicine) {
  return Math.max(12, Math.round(medicine.stock * 1.6 + medicine.graphWeight * 50));
}

function attentionCountForMedicine(medicine) {
  return Math.max(3, Math.round(medicine.graphWeight * 18));
}

function viewerCountForMedicine(medicine) {
  return Math.max(14, Math.round(medicine.stock * 0.22));
}

function medicineBoxTone(medicine) {
  const toneMap = {
    "Giảm đau - hạ sốt": { accent: "#2e87ff", soft: "#eef6ff", border: "#b9d4ff" },
    "Dị ứng": { accent: "#7c63ff", soft: "#f1efff", border: "#d3cafe" },
    "Tai - Mũi - Họng": { accent: "#17a7c7", soft: "#eefbfd", border: "#bbe8f0" },
    "Hô hấp": { accent: "#1fa36d", soft: "#eefbf5", border: "#bfe9d5" },
    "Tiêu hóa": { accent: "#f39a20", soft: "#fff7eb", border: "#f6d8ad" },
    "Dạ dày": { accent: "#f06f43", soft: "#fff2ed", border: "#f5c7b7" },
    "Sát khuẩn": { accent: "#4e6af7", soft: "#eef1ff", border: "#c6d0ff" },
    "Vitamin - khoáng chất": { accent: "#5f8c2f", soft: "#f3f9ea", border: "#d3e4b9" }
  };

  return (
    toneMap[medicine.category] ?? {
      accent: "#1c54d1",
      soft: "#eef3ff",
      border: "#c8d8ff"
    }
  );
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

function medicineGuidance(medicine) {
  const diseaseNames = diseaseNamesForMedicine(medicine);
  const cautionText = slugify(medicine.caution);
  const recommendedWhen = [];
  const avoidWhen = cautionLines(medicine.caution);

  if (medicine.symptomTags.length) {
    recommendedWhen.push(`Nên tham khảo khi có triệu chứng như ${medicine.symptomTags.slice(0, 3).join(", ")}.`);
  }

  if (diseaseNames.length) {
    recommendedWhen.push(`Thường được chọn trong nhóm: ${diseaseNames.join(", ")}.`);
  }

  let level = "fit";
  let label = "Nên tham khảo";
  let summary = "Có thể tham khảo nếu triệu chứng phù hợp với mô tả sản phẩm.";

  if (/khong tu dung|khong phu hop|khong dung|khong nen tu|khong nen dung|ngung dung/.test(cautionText)) {
    level = "review";
  }

  if (level === "review") {
    label = "Cần xem lại";
    summary = "Sản phẩm này có lưu ý cần đọc kỹ trước khi tự dùng.";
  }

  if (/so cao|ra mau|kho tho|dau nguc/.test(cautionText)) {
    level = "avoid";
    label = "Không nên tự dùng";
    summary = "Tình huống dùng sản phẩm này có thể cần đánh giá thêm trước khi tự điều trị.";
  }

  return {
    level,
    label,
    summary,
    recommendedWhen: recommendedWhen.slice(0, 2),
    avoidWhen: avoidWhen.slice(0, 3)
  };
}

function productMediaItems(medicine) {
  const items = [];

  if (medicine.image) {
    items.push({ type: "image", label: "Ảnh chính", image: medicine.image });
  }

  items.push({ type: "box", label: "Hộp thuốc" });
  items.push({ type: "box", label: "Mặt trước" });
  items.push({ type: "box", label: "Thông tin" });

  return items;
}

function productMediaMarkup(medicine, variant = "main", item = null) {
  const tone = medicineBoxTone(medicine);
  const mediaItem = item ?? productMediaItems(medicine)[0];

  if (mediaItem?.type === "image" && medicine.image) {
    return `
      <div class="product-media-frame ${variant}">
        <img class="product-hero-image" src="${medicine.image}" alt="${medicine.name}" loading="lazy" />
      </div>
    `;
  }

  return `
    <div class="product-media-frame ${variant}">
      <div
        class="medicine-box-mock product-box-mock"
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
  `;
}

function persistCart() {
  window.AppStore?.saveCart(productState.cart);
}

function addToCart(medicineId, quantity) {
  const existingItem = productState.cart.find((item) => item.id === medicineId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    productState.cart.push({ id: medicineId, quantity });
  }

  persistCart();
}

function renderProductBreadcrumbs(medicine) {
  if (!productBreadcrumbs) return;

  productBreadcrumbs.innerHTML = `
    <a href="index.html">Trang chủ</a>
    <span>/</span>
    <a href="index.html#drug-finder">Danh sách thuốc</a>
    <span>/</span>
    <a href="index.html#drug-finder">${medicine.category}</a>
    <span>/</span>
    <strong>${medicine.name}</strong>
  `;
}

function renderProductGallery(medicine) {
  if (!productGallery) return;

  const mediaItems = productMediaItems(medicine);
  const activeItem = mediaItems[productState.activeMediaIndex] ?? mediaItems[0];

  productGallery.innerHTML = `
    <div class="product-visual-wrap">
      ${productMediaMarkup(medicine, "main", activeItem)}
    </div>
    <div class="product-thumb-row">
      ${mediaItems
        .map(
          (item, index) => `
            <button
              class="product-thumb ${index === productState.activeMediaIndex ? "active" : ""}"
              type="button"
              data-product-thumb="${index}"
            >
              ${productMediaMarkup(medicine, "thumb", item)}
            </button>
          `
        )
        .join("")}
    </div>
    <p class="product-gallery-note">Hình ảnh sản phẩm có thể thay đổi theo lô hàng nhưng vẫn đúng quy cách và hoạt chất.</p>
  `;

  productGallery.querySelectorAll("[data-product-thumb]").forEach((button) => {
    button.addEventListener("click", () => {
      productState.activeMediaIndex = Number(button.dataset.productThumb);
      renderProductGallery(medicine);
    });
  });
}

function renderProductSummary(medicine) {
  if (!productSummary) return;

  const guidance = medicineGuidance(medicine);
  const ratingCount = ratingCountForMedicine(medicine);
  const commentCount = commentCountForMedicine(medicine);

  productSummary.innerHTML = `
    <div class="product-top-meta">
      <div class="product-auth-chip">Chính hãng</div>
      <div class="product-country-chip">Việt Nam</div>
      <p class="product-brand-line">Thương hiệu: <strong>${medicine.brand}</strong></p>
    </div>

    <div class="product-title-block">
      <span class="eyebrow">Chi tiết thuốc</span>
      <h1>${medicine.name}</h1>
    </div>

    <div class="product-review-line">
      <span>${registrationCodeForMedicine(medicine)}</span>
      <span>•</span>
      <span>${medicine.rating.toFixed(1)} sao</span>
      <span>•</span>
      <strong>${ratingCount} đánh giá</strong>
      <span>•</span>
      <strong>${commentCount} bình luận</strong>
    </div>

    <div class="product-price-line">
      <strong>${productCurrencyFormatter.format(medicine.price)}</strong>
      <span>/ ${unitLabel(medicine.pack)}</span>
    </div>

    <div class="product-buy-grid">
      <div class="product-buy-row">
        <span>Đơn vị tính</span>
        <div class="product-unit-pill">${unitLabel(medicine.pack)}</div>
      </div>
      <div class="product-buy-row">
        <span>Chọn số lượng</span>
        <div class="qty-control product-qty-control">
          <button type="button" data-qty-dec>−</button>
          <span>${productState.quantity}</span>
          <button type="button" data-qty-inc>+</button>
        </div>
      </div>
    </div>

    <div class="product-cta-row">
      <button class="primary-action product-buy-button" type="button" data-product-add-cart>
        Chọn mua
      </button>
      <a class="secondary-action product-ghost-button" href="index.html#advisor">
        Tư vấn thêm
      </a>
    </div>

    <div class="product-attention-line">
      <span class="material-symbols-outlined">bolt</span>
      <strong>Sản phẩm đang được chú ý</strong>, có ${attentionCountForMedicine(medicine)} người thêm vào giỏ và ${viewerCountForMedicine(medicine)} người đang xem.
    </div>

    <div class="product-inline-specs">
      <article>
        <span>Quy cách</span>
        <strong>${medicine.pack}</strong>
      </article>
      <article>
        <span>Dạng bào chế</span>
        <strong>${dosageFormForMedicine(medicine)}</strong>
      </article>
      <article>
        <span>Danh mục</span>
        <strong>${medicine.category}</strong>
      </article>
    </div>

    <div class="product-summary-note ${guidance.level}">
      <span>Đánh giá nhanh</span>
      <strong>${guidance.label}</strong>
      <p>${guidance.summary}</p>
    </div>
  `;

  productSummary.querySelector("[data-qty-inc]")?.addEventListener("click", () => {
    productState.quantity += 1;
    renderProductSummary(medicine);
  });

  productSummary.querySelector("[data-qty-dec]")?.addEventListener("click", () => {
    productState.quantity = Math.max(1, productState.quantity - 1);
    renderProductSummary(medicine);
  });

  productSummary.querySelector("[data-product-add-cart]")?.addEventListener("click", () => {
    addToCart(medicine.id, productState.quantity);
    window.location.href = "cart.html";
  });
}

function renderProductSpecs(medicine) {
  if (!productSpecs) return;

  const relatedDiseases = diseaseNamesForMedicine(medicine).join(", ");

  const entries = [
    ["Tên chính hãng", medicine.name],
    ["Danh mục", medicine.category],
    ["Số đăng ký", registrationCodeForMedicine(medicine)],
    ["Dạng bào chế", dosageFormForMedicine(medicine)],
    ["Quy cách", medicine.pack],
    ["Thương hiệu", medicine.brand],
    ["Nước sản xuất", "Việt Nam"],
    ["Hoạt chất", medicine.ingredient],
    ["Nhóm bệnh liên quan", relatedDiseases || "Theo triệu chứng"],
    ["Liều tham khảo", medicine.dosage]
  ];

  productSpecs.innerHTML = `
    <div class="account-card-head">
      <span class="eyebrow">Thông tin sản phẩm</span>
      <h3>${medicine.name}</h3>
    </div>
    <div class="product-spec-list">
      ${entries
        .map(
          ([label, value]) => `
            <div class="product-spec-row">
              <span>${label}</span>
              <strong>${value}</strong>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderProductGuidance(medicine) {
  if (!productGuidance) return;

  const guidance = medicineGuidance(medicine);
  const diseases = diseaseNamesForMedicine(medicine);
  const recommendedWhen = guidance.recommendedWhen.length
    ? guidance.recommendedWhen
    : ["Nên đọc kỹ mô tả sản phẩm và đối chiếu với triệu chứng thực tế trước khi chọn mua."];
  const avoidWhen = guidance.avoidWhen.length
    ? guidance.avoidWhen
    : ["Nếu triệu chứng kéo dài hoặc xuất hiện dấu hiệu nặng hơn, nên hỏi dược sĩ hoặc bác sĩ."];

  productGuidance.innerHTML = `
    <div class="account-card-head">
      <span class="eyebrow">Lưu ý an toàn</span>
      <h3>${guidance.label}</h3>
    </div>
    <div class="product-guidance-box ${guidance.level}">
      <p>${guidance.summary}</p>
      <div class="selection-guidance-grid">
        <article>
          <span>Nên tham khảo khi</span>
          <ul>
            ${recommendedWhen.map((line) => `<li>${line}</li>`).join("")}
          </ul>
        </article>
        <article>
          <span>Không nên tự dùng khi</span>
          <ul>
            ${avoidWhen.map((line) => `<li>${line}</li>`).join("")}
          </ul>
        </article>
      </div>
    </div>
    <div class="detail-block">
      <span>Công dụng</span>
      <p>${medicine.usage}</p>
    </div>
    <div class="detail-block caution">
      <span>Cảnh báo</span>
      <p>${medicine.caution}</p>
    </div>
    <div class="detail-block">
      <span>Triệu chứng thường gặp</span>
      <div class="inline-tags">${medicine.symptomTags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    </div>
    <div class="detail-block">
      <span>Bệnh liên quan</span>
      <div class="inline-tags">${diseases.map((name) => `<span>${name}</span>`).join("")}</div>
    </div>
  `;
}

function renderMissingProduct() {
  if (productBreadcrumbs) {
    productBreadcrumbs.innerHTML = `<a href="index.html">Trang chủ</a><span>/</span><strong>Không tìm thấy sản phẩm</strong>`;
  }

  if (productGallery) {
    productGallery.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-visual">
          <span class="material-symbols-outlined">inventory_2</span>
        </div>
        <strong>Không tìm thấy thuốc</strong>
        <p>Liên kết chi tiết có thể đã thay đổi hoặc sản phẩm không còn trong dữ liệu hiện tại.</p>
        <a class="cart-checkout-button" href="index.html#drug-finder">Quay lại danh sách thuốc</a>
      </div>
    `;
  }

  if (productSummary) productSummary.innerHTML = "";
  if (productSpecs) productSpecs.innerHTML = "";
  if (productGuidance) productGuidance.innerHTML = "";
}

function renderProductPage() {
  const medicine = findMedicineById(productState.medicineId);
  productState.medicine = medicine ?? null;

  if (productAccountName) {
    productAccountName.textContent = productState.customer?.name ?? "Khách hàng";
  }

  if (!medicine) {
    renderMissingProduct();
    return;
  }

  document.title = `${medicine.name} | Nhà thuốc An Tâm`;
  renderProductBreadcrumbs(medicine);
  renderProductGallery(medicine);
  renderProductSummary(medicine);
  renderProductSpecs(medicine);
  renderProductGuidance(medicine);
}

renderProductPage();
