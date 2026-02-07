## for images

import torch
import io

from fastapi import FastAPI, File, UploadFile, HTTPException
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image

MODEL_ID = "dima806/deepfake_vs_real_image_detection"

model = None
processor = None

def load_model():
    global model, processor
    if model is None:
        processor = AutoImageProcessor.from_pretrained(MODEL_ID)
        model = AutoModelForImageClassification.from_pretrained(MODEL_ID)
        model.eval()


app = FastAPI(title="Deepfake image detection API")

@torch.inference_mode()

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
    load_model()
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Invalid image format")

    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    except Exception:
        raise HTTPException(status_code = 400, detail="Failed to read the image.")

    result = detect_deepfake_pil(image)
    return result


## for videos
import cv2

def extract_frames(video_path, every_n_frames=10):
    cap = cv2.VideoCapture(video_path)
    frames = []
    idx = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if idx % every_n_frames == 0:
            frame = cv2.cvtColor(frames, cv2.COLOR_BGR2RGB)
            frames.append(Image.fromarray(frame))
        idx += 1
    
    cap.release()
    return frames

def predict_video(frames):
    fake_scores = []

    for frame in frames:
        result = detect_deepfake_pil(frame)
        fake_scores.append(result["confidence"])

    avg_confidence = sum(fake_scores)/len(fake_scores)

    return{
        "label": "FAKE" if avg_confidence>50 else "REAL",
        "confidence": round(avg_conf, 2),
        "frames_analyzed": len(frames)
    }

@app.post("/predict-video")
async def predict_video_api(file: UploadFile=File(...)):
    if file.content_type not in ["video/mp4", "video/avi", "video/mov"]:
        raise HTTPException(status_code=400, detail="Invalid video format")
    video_bytes = await file.read()
    video_path = "/tmp/input.mp4"

    with open(video_path, "wb") as f:
        f.write(video_bytes)

    frames = extract_frames(video_path)
    if not frames:
        raise HTTPException(status_code=400, detail="No video found")

    return predict_video(frames)