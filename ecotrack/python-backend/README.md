# Uber Plastic Python Backend - Real Bottle Detection

This Python backend provides real computer vision-based bottle detection using YOLO (You Only Look Once) models.

## 🚀 Features

- **Real AI Detection**: Uses YOLOv8 for actual bottle detection in images
- **FastAPI Backend**: High-performance API with automatic documentation
- **Multiple Input Formats**: Supports file uploads and base64 encoded images
- **Eco Scoring**: Calculates environmental impact scores based on detections
- **Fallback System**: Graceful degradation when model is unavailable

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## 🛠️ Installation

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Verify installation:**
   ```bash
   python -c "import ultralytics; print('YOLO installed successfully')"
   ```

## 🚀 Running the Server

### Option 1: Using the startup script
```bash
# Windows
start-python-backend.bat

# Linux/Mac
chmod +x start-python-backend.sh
./start-python-backend.sh
```

### Option 2: Direct Python execution
```bash
cd python-backend
python start_server.py
```

### Option 3: Using uvicorn directly
```bash
cd python-backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Check if the API is running and model is loaded

### Bottle Detection
- **POST** `/detect-bottles` - Upload image file for detection
- **POST** `/detect-bottles-base64` - Send base64 encoded image

### Model Information
- **GET** `/model-info` - Get information about the loaded model

## 🔧 Configuration

The API can be configured through environment variables:

- `PYTHON_API_URL`: Backend URL (default: http://localhost:8000)
- `CONFIDENCE_THRESHOLD`: Detection confidence threshold (default: 0.5)

## 📊 Response Format

```json
{
  "bottles": 3,
  "confidence": 0.85,
  "detections": [
    {
      "class": "bottle",
      "confidence": 0.85,
      "bbox": {
        "x1": 100,
        "y1": 100,
        "x2": 200,
        "y2": 300
      }
    }
  ],
  "eco_score": {
    "total": 75,
    "level": "good",
    "color": "#3B82F6",
    "co2_saved": 0.3,
    "points_earned": 15,
    "earnings": 0.15
  },
  "eco_insights": [
    "Excellent! You found 3 bottles. You're making a real impact!",
    "Good environmental impact! You're helping reduce plastic waste."
  ]
}
```

## 🧠 AI Model Details

- **Model**: YOLOv8n (nano version for speed)
- **Classes**: Detects bottles, cups, glasses, and other containers
- **Confidence Threshold**: 0.5 (configurable)
- **Input Format**: RGB images
- **Output**: Bounding boxes, confidence scores, and classifications

## 🔄 Integration with Next.js Frontend

The frontend automatically detects if the Python API is available:

1. **API Available**: Uses real YOLO detection
2. **API Unavailable**: Falls back to mock detection with realistic data

## 🐛 Troubleshooting

### Common Issues

1. **Model Download Fails**
   - Check internet connection
   - YOLO will download the model on first run

2. **CUDA/GPU Issues**
   - The model runs on CPU by default
   - GPU acceleration is optional

3. **Memory Issues**
   - YOLOv8n is lightweight (6MB)
   - Should work on most systems

### Logs

Check the console output for detailed error messages and model loading status.

## 📈 Performance

- **Model Size**: ~6MB (YOLOv8n)
- **Detection Speed**: ~50-100ms per image
- **Memory Usage**: ~200-500MB RAM
- **CPU Usage**: Moderate (depends on image size)

## 🔒 Security

- CORS enabled for localhost:3000
- File size limits applied
- Input validation on all endpoints

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🤝 Contributing

To improve the detection accuracy:

1. **Fine-tune the model** on bottle-specific datasets
2. **Adjust confidence thresholds** for your use case
3. **Add custom classes** for specific bottle types
4. **Implement post-processing** for better results

## 📄 License

This backend is part of the Uber Plastic project and follows the same license terms.


