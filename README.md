# 🚀 AuthenSight AI

Deepfake detection system for images and videos, built during a hackathon at IIIT Una.

AuthenSight AI analyzes facial regions using a **ResNet-based deep learning model** and exposes prediction APIs through a scalable REST architecture.

---

## 🧠 Overview

AuthenSight AI detects AI-generated or manipulated faces in:

- 🖼 Images  
- 🎥 Videos (frame-level inference)

The system extracts faces, preprocesses them, and runs inference using a pretrained deepfake detection model built on ResNet.

---

## 🏗 Architecture

```
Frontend (React)
        ↓
Express.js (API Layer)
        ↓
FastAPI (ML Inference Service)
        ↓
PyTorch (ResNet Model)
```

---

## 🔧 Tech Stack

### Machine Learning
- PyTorch  
- ResNet-based classifier  
- OpenCV (face extraction)

### Backend
- FastAPI (AI inference server)  
- Express.js (API gateway)  
- RESTful architecture  

### Frontend
- React.js  

---

# 📦 Installation

## 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/authensight-ai.git
cd authensight-ai
```

---

# ▶ Running the Full Project

You need to run **three services**:

- FastAPI (ML Server)
- Express Backend
- React Frontend

---

## 🔹 1. Run ML Server (FastAPI)

```bash
cd model
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Runs at:
```
http://127.0.0.1:8000
```

Swagger Docs:
```
http://127.0.0.1:8000/docs
```

---

## 🔹 2. Run Express Backend

```bash
cd Backend
npm install
npm start
```

Runs at:
```
http://localhost:5000
```

---

## 🔹 3. Run React Frontend

```bash
cd Frontend
npm install
npm start
```

After starting, open your browser and visit:

```
http://localhost:3000
```

This is the main AuthenSight AI web interface.

---

# 📡 API Endpoints

### 🔹 Image Prediction

**POST** `/predict`

Form Data:
```
queryObject: <image file>
```

Response:
```json
{
  "label": "FAKE",
  "confidence": 87.23
}
```

---

### 🔹 Video Prediction

**POST** `/predict-video`

Form Data:
```
queryObject: <video file>
```

Response:
```json
{
  "label": "REAL",
  "confidence": 91.12,
  "frames_analyzed": 34
}
```

---

## 🧪 How It Works

1. Extract largest face from image/video frame  
2. Preprocess face  
3. Run ResNet model inference  
4. Compute fake probability  
5. Aggregate results (for videos)  

---

## ⚠ Limitations

- Frame-level detection (no temporal modeling)  
- Works best with clear frontal faces  
- Accuracy depends on face extraction quality  
- Not a forensic-grade system  

---

## 👥 Team

Built during a hackathon at IIIT Una.

- **Rishik** — ML & FastAPI  
- **Yash & Aman** — Frontend (React) & Backend (Express.js)  

---

## 📌 Future Improvements

- Temporal deepfake detection models  
- RetinaFace integration  
- GPU batching  
- Confidence calibration  
- Cloud deployment  
