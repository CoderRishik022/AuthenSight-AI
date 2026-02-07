import torch
import io

from fastapi import FastAPI, File, UploadFile, HTTPException
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image

MODEL_ID = "dima806/deepfake_vs_real_image_detection"

processor = AutoImageProcessor.from_pretrained(MODEL_ID)
model = AutoModelForImageClassification.from_pretrained(MODEL_ID)
model.eval()


app = FastAPI(title="Deepfake image detection API")

@torch.no_grad()
def detect_deepfake_pil(image: Image.Image):
    inputs = processor(images=image, return_tensors="pt")
    outputs = model(**inputs)

    logits = outputs.logits
    pred_id = logits.argmax(dim=1).item()
    confidence = torch.softmax(logits, dim=1)[0, pred_id].item()
    label = model.config.id2label[pred_id]

    return { "label":label, "confidence":round(confidence*100, 2)}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Invalid image format")

    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    except Exception:
        raise HTTPException(status_code = 400, detail="Failed to read the image.")

    result = detect_deepfake_pil(image)
    return result