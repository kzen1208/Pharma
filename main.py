from io import BytesIO
from pathlib import Path
import random

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from PIL import Image, UnidentifiedImageError


app = FastAPI(title="Pill Prescription Matching Demo")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


ROOT_DIR = Path(__file__).resolve().parent
DEFAULT_MEDICINES = [
    "Paracetamol",
    "Loratadine",
    "Amoxicillin",
    "Omeprazole",
    "Cetirizine",
    "Acetylcysteine",
]
DISTRACTOR_MEDICINES = [
    "Alpha-Chymotrypsine",
    "Tatanol-500mg-VBP",
    "Chymodk-4.2",
    "Vitamin C",
    "Ibuprofen",
    "Metformin",
]


def parse_prescription_names(prescription_text: str) -> list[str]:
    names = [line.strip(" -•\t") for line in prescription_text.splitlines() if line.strip(" -•\t")]
    return names or DEFAULT_MEDICINES


def normalize_name(text: str) -> str:
    normalized = "".join(char.lower() if char.isalnum() else " " for char in text)
    return " ".join(normalized.split())


def token_set(text: str) -> set[str]:
    return {token for token in normalize_name(text).split() if token}


def rule_similarity(source_name: str, target_name: str) -> float:
    source_tokens = token_set(source_name)
    target_tokens = token_set(target_name)

    if not source_tokens or not target_tokens:
        return 0.0

    overlap = len(source_tokens & target_tokens)
    union = max(len(source_tokens | target_tokens), 1)
    jaccard = overlap / union

    source_norm = normalize_name(source_name)
    target_norm = normalize_name(target_name)
    if source_norm == target_norm:
        return 1.0
    if source_norm in target_norm or target_norm in source_norm:
        return max(jaccard, 0.82)

    return jaccard


def visual_label_pool(prescription_names: list[str]) -> list[str]:
    pool = list(dict.fromkeys(prescription_names + DISTRACTOR_MEDICINES))
    return pool or DEFAULT_MEDICINES


def generate_random_boxes(width: int, height: int, count: int) -> list[dict]:
    detections = []
    min_width = max(48, int(width * 0.14))
    max_width = max(min_width + 12, int(width * 0.3))
    min_height = max(48, int(height * 0.12))
    max_height = max(min_height + 12, int(height * 0.24))

    for index in range(count):
        box_width = random.randint(min_width, min(max_width, width))
        box_height = random.randint(min_height, min(max_height, height))
        x1 = random.randint(0, max(0, width - box_width))
        y1 = random.randint(0, max(0, height - box_height))
        x2 = x1 + box_width
        y2 = y1 + box_height

        detections.append(
            {
                "crop_id": f"p{index + 1}",
                "box": [x1, y1, x2, y2],
                "score": round(random.uniform(0.72, 0.96), 2),
            }
        )

    return detections


def generate_matches(detections: list[dict], medicine_names: list[str]) -> list[dict]:
    matches = []
    label_pool = visual_label_pool(medicine_names)

    for detection in detections:
        visual_label = random.choice(label_pool)
        scored = []

        for candidate in medicine_names:
            similarity = rule_similarity(visual_label, candidate)
            noisy_score = max(0.4, min(0.95, similarity * 0.72 + random.uniform(0.18, 0.32)))
            scored.append(
                {
                    "name": candidate,
                    "score": round(noisy_score, 2),
                }
            )

        scored.sort(key=lambda item: item["score"], reverse=True)
        best_match = scored[0]

        matches.append(
            {
                "crop_id": detection["crop_id"],
                "detected_label": visual_label,
                "matched_name": best_match["name"],
                "confidence": best_match["score"],
                "topk": scored[:3],
            }
        )

    return matches


def resolve_static_path(file_path: str) -> Path:
    target = (ROOT_DIR / file_path).resolve()
    if not str(target).startswith(str(ROOT_DIR.resolve())):
        raise HTTPException(status_code=404, detail="File not found")
    if not target.exists() or not target.is_file():
        raise HTTPException(status_code=404, detail="File not found")
    return target


@app.get("/")
def serve_index() -> FileResponse:
    return FileResponse(ROOT_DIR / "index.html")


@app.post("/infer")
async def infer(
    image: UploadFile = File(...),
    prescription_text: str = Form(...),
) -> dict:
    try:
        image_bytes = await image.read()
        pil_image = Image.open(BytesIO(image_bytes)).convert("RGB")
    except (UnidentifiedImageError, OSError) as error:
        raise HTTPException(status_code=400, detail="Ảnh không hợp lệ") from error

    width, height = pil_image.size
    box_count = random.randint(3, 6)
    detections = generate_random_boxes(width, height, box_count)
    medicine_names = parse_prescription_names(prescription_text)
    matches = generate_matches(detections, medicine_names)

    return {
        "detections": detections,
        "extracted_names": medicine_names,
        "matches": matches,
    }


@app.get("/{file_path:path}")
def serve_static(file_path: str) -> FileResponse:
    return FileResponse(resolve_static_path(file_path))
