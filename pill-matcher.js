(() => {
  const prescriptionText = document.getElementById("pill-prescription-text");
  const imageInput = document.getElementById("pill-image-input");
  const uploadCard = document.getElementById("pill-upload-card");
  const uploadName = document.getElementById("pill-upload-name");
  const cameraButton = document.getElementById("pill-camera-button");
  const cameraShell = document.getElementById("pill-camera-shell");
  const cameraWrap = document.getElementById("pill-camera-wrap");
  const cameraVideo = document.getElementById("pill-camera-video");
  const captureButton = document.getElementById("pill-capture-button");
  const cameraStopButton = document.getElementById("pill-camera-stop-button");
  const checkButton = document.getElementById("pill-check-button");
  const clearButton = document.getElementById("pill-clear-button");
  const statusBox = document.getElementById("pill-status");
  const previewEmpty = document.getElementById("pill-preview-empty");
  const previewStage = document.getElementById("pill-preview-stage");
  const imageWrap = document.getElementById("pill-image-wrap");
  const previewImage = document.getElementById("pill-preview-image");
  const overlay = document.getElementById("pill-overlay");
  const resultBody = document.getElementById("pill-result-body");
  const boxCount = document.getElementById("pill-box-count");
  const matchCount = document.getElementById("pill-match-count");
  const verifyCount = document.getElementById("pill-verify-count");
  const extractedNames = document.getElementById("pill-extracted-names");

  if (
    !prescriptionText ||
    !imageInput ||
    !uploadCard ||
    !uploadName ||
    !cameraButton ||
    !cameraShell ||
    !cameraWrap ||
    !cameraVideo ||
    !captureButton ||
    !cameraStopButton ||
    !checkButton ||
    !clearButton ||
    !statusBox ||
    !previewEmpty ||
    !previewStage ||
    !imageWrap ||
    !previewImage ||
    !overlay ||
    !resultBody ||
    !boxCount ||
    !matchCount ||
    !verifyCount ||
    !extractedNames
  ) {
    return;
  }

  let selectedFile = null;
  let previewUrl = "";
  let cameraStream = null;

  function setStatus(message, isError = false) {
    statusBox.textContent = message;
    statusBox.classList.toggle("error", isError);
  }

  function syncUploadCard(name = "", source = "") {
    const hasFile = Boolean(name);
    uploadCard.classList.toggle("has-file", hasFile);
    uploadName.textContent = hasFile
      ? source
        ? `${name} • ${source}`
        : name
      : "Chưa có tệp nào được chọn";
  }

  function resetTable() {
    resultBody.innerHTML = `
      <tr>
        <td class="pill-matcher-table-empty" colspan="4">Chưa có kết quả.</td>
      </tr>
    `;
    boxCount.textContent = "0";
    matchCount.textContent = "0";
    verifyCount.textContent = "0";
    overlay.innerHTML = "";
    extractedNames.innerHTML = '<span class="pill-matcher-chip">Chưa tách tên thuốc</span>';
  }

  function stopCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      cameraStream = null;
    }

    cameraVideo.srcObject = null;
    cameraShell.classList.remove("visible");
    cameraWrap.classList.remove("is-scanning");
    cameraButton.textContent = "Bật camera";
  }

  async function startCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("Trình duyệt này không hỗ trợ mở camera.", true);
      return;
    }

    try {
      stopCamera();
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" }
        },
        audio: false
      });
      cameraVideo.srcObject = cameraStream;
      cameraShell.classList.add("visible");
      cameraWrap.classList.add("is-scanning");
      cameraButton.textContent = "Đang mở camera";
      setStatus("Camera đã bật. Đặt thuốc vào khung rồi bấm chụp ảnh.");
    } catch (error) {
      console.error(error);
      setStatus("Không bật được camera. Hãy cấp quyền hoặc dùng cách tải ảnh.", true);
    }
  }

  async function captureFromCamera() {
    if (!cameraStream) {
      setStatus("Camera chưa bật.", true);
      return;
    }

    const videoWidth = cameraVideo.videoWidth;
    const videoHeight = cameraVideo.videoHeight;

    if (!videoWidth || !videoHeight) {
      setStatus("Camera chưa sẵn sàng để chụp ảnh.", true);
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    const context = canvas.getContext("2d");
    if (!context) {
      setStatus("Không tạo được ảnh từ camera.", true);
      return;
    }

    context.drawImage(cameraVideo, 0, 0, videoWidth, videoHeight);

    const blob = await new Promise((resolve) => {
      canvas.toBlob((fileBlob) => resolve(fileBlob), "image/jpeg", 0.92);
    });

    if (!blob) {
      setStatus("Không chụp được ảnh từ camera.", true);
      return;
    }

    selectedFile = new File([blob], `pill-camera-${Date.now()}.jpg`, { type: "image/jpeg" });
    resetTable();
    showPreview(selectedFile);
    syncUploadCard(selectedFile.name, "Camera");
    stopCamera();
    setStatus("Đã chụp ảnh từ camera. Bấm Check Pills để quét.");
  }

  function clearPreview() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    previewUrl = "";
    selectedFile = null;
    imageInput.value = "";
    previewImage.removeAttribute("src");
    previewStage.classList.remove("visible");
    previewEmpty.style.display = "grid";
    imageWrap.classList.remove("is-scanning");
    syncUploadCard();
    stopCamera();
    resetTable();
    setStatus("Đã xóa ảnh đã chọn.");
  }

  function showPreview(file) {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    previewUrl = URL.createObjectURL(file);
    previewImage.src = previewUrl;
    previewStage.classList.add("visible");
    previewEmpty.style.display = "none";
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (char) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      return map[char] || char;
    });
  }

  function renderOverlay(detections, matchesById) {
    const imageWidth = previewImage.naturalWidth || 1;
    const imageHeight = previewImage.naturalHeight || 1;
    overlay.setAttribute("viewBox", `0 0 ${imageWidth} ${imageHeight}`);

    overlay.innerHTML = detections
      .map((item, index) => {
        const [x1, y1, x2, y2] = item.box;
        const width = Math.max(1, x2 - x1);
        const height = Math.max(1, y2 - y1);
        const match = matchesById.get(item.crop_id);
        const label = escapeHtml(match?.detected_label || `Pill ${index + 1}`);

        return `
          <g>
            <rect
              x="${x1}"
              y="${y1}"
              width="${width}"
              height="${height}"
              rx="18"
              fill="rgba(28, 84, 209, 0.14)"
              stroke="#1c54d1"
              stroke-width="4"
            />
            <text
              x="${x1 + 12}"
              y="${Math.max(24, y1 + 28)}"
              fill="#103798"
              font-size="22"
              font-weight="700"
            >
              ${label}
            </text>
          </g>
        `;
      })
      .join("");
  }

  function renderRows(matches) {
    if (!matches.length) {
      resultBody.innerHTML = `
        <tr>
          <td class="pill-matcher-table-empty" colspan="4">Không có match nào.</td>
        </tr>
      `;
      return;
    }

    resultBody.innerHTML = matches
      .map((item, index) => {
        const confidence = Number(item.confidence || 0);
        const needVerify = confidence < 0.6;

        return `
          <tr>
            <td><span class="pill-matcher-pill-index">Pill ${index + 1}</span></td>
            <td>
              <div class="pill-matcher-match-copy">
                <strong>${escapeHtml(item.matched_name || "")}</strong>
                <small>Visual label: ${escapeHtml(item.detected_label || "")}</small>
              </div>
            </td>
            <td>${confidence.toFixed(2)}</td>
            <td>${needVerify ? '<span class="pill-matcher-verify">Need verify</span>' : ""}</td>
          </tr>
        `;
      })
      .join("");
  }

  function renderPayload(payload) {
    const detections = Array.isArray(payload.detections) ? payload.detections : [];
    const matches = Array.isArray(payload.matches) ? payload.matches : [];
    const names = Array.isArray(payload.extracted_names) ? payload.extracted_names : [];
    const needVerify = matches.filter((item) => Number(item.confidence || 0) < 0.6).length;
    const matchesById = new Map(matches.map((item) => [item.crop_id, item]));

    renderOverlay(detections, matchesById);
    renderRows(matches);
    boxCount.textContent = String(detections.length);
    matchCount.textContent = String(matches.length);
    verifyCount.textContent = String(needVerify);
    extractedNames.innerHTML = names.length
      ? names.map((name) => `<span class="pill-matcher-chip">${escapeHtml(name)}</span>`).join("")
      : '<span class="pill-matcher-chip">Không có tên thuốc</span>';
  }

  imageInput.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    resetTable();

    if (!file) {
      selectedFile = null;
      previewStage.classList.remove("visible");
      previewEmpty.style.display = "grid";
      setStatus("Chưa có ảnh nào được chọn.");
      return;
    }

    selectedFile = file;
    showPreview(file);
    syncUploadCard(file.name, "Upload");
    stopCamera();
    setStatus(`Đã chọn ảnh: ${file.name}`);
  });

  cameraButton.addEventListener("click", startCamera);
  captureButton.addEventListener("click", captureFromCamera);
  cameraStopButton.addEventListener("click", () => {
    stopCamera();
    setStatus("Đã tắt camera.");
  });
  clearButton.addEventListener("click", clearPreview);

  checkButton.addEventListener("click", async () => {
    if (!selectedFile) {
      setStatus("Vui lòng chọn ảnh thuốc trước.", true);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("prescription_text", prescriptionText.value || "");

    checkButton.disabled = true;
    imageWrap.classList.add("is-scanning");
    setStatus("Đang chạy theo luồng: detection -> extraction -> matching by rule...");

    try {
      const response = await fetch("/infer", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Không gọi được API");
      }

      const payload = await response.json();
      await previewImage.decode().catch(() => {});
      renderPayload(payload);
      setStatus("Đã quét xong. Box hiển thị visual label, rồi match với tên thuốc tách từ toa.");
    } catch (error) {
      console.error(error);
      setStatus("Không gọi được API /infer. Kiểm tra FastAPI đã chạy chưa.", true);
    } finally {
      checkButton.disabled = false;
      imageWrap.classList.remove("is-scanning");
    }
  });

  window.addEventListener("beforeunload", stopCamera);
})();
