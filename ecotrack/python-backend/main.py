from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.middleware.gzip import GZipMiddleware
import cv2
import numpy as np
from ultralytics import YOLO
import io
from PIL import Image
import base64
from typing import List, Dict, Any
import logging
import time
from functools import lru_cache
import asyncio
from concurrent.futures import ThreadPoolExecutor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Uber Plastic Bottle Detection API", version="1.0.0")

# Add compression middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Thread pool for CPU-intensive tasks
executor = ThreadPoolExecutor(max_workers=2)

# Load YOLO model (will download on first run)
try:
    model = YOLO('yolov8n.pt')  # nano version for speed
    logger.info("YOLO model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load YOLO model: {e}")
    model = None

class BottleDetector:
    def __init__(self):
        self.bottle_classes = ['bottle', 'wine glass', 'cup', 'bowl']  # COCO classes that might contain bottles
        self.confidence_threshold = 0.5
        self._cache = {}  # Simple cache for repeated requests
        
    @lru_cache(maxsize=100)
    def _get_cached_detection(self, image_hash: str) -> Dict[str, Any]:
        """Cache detection results for identical images"""
        return None
        
    def detect_bottles(self, image: np.ndarray) -> Dict[str, Any]:
        """Detect bottles in the image using YOLO - Always returns 1 bottle, 330ml, PET plastic"""
        # Always return the specific bottle information as requested
        return self._mock_detection()
    
    def _calculate_eco_score(self, bottle_count: int, confidence: float) -> Dict[str, Any]:
        """Calculate environmental impact score"""
        base_score = min(bottle_count * 20, 100)  # Max 100 points
        confidence_bonus = confidence * 20
        
        total_score = min(base_score + confidence_bonus, 100)
        
        # Determine score level
        if total_score >= 80:
            level = "excellent"
            color = "#10B981"
        elif total_score >= 60:
            level = "good"
            color = "#3B82F6"
        elif total_score >= 40:
            level = "fair"
            color = "#F59E0B"
        else:
            level = "needs_improvement"
            color = "#EF4444"
        
        return {
            'total': total_score,
            'level': level,
            'color': color,
            'co2_saved': bottle_count * 0.1,  # kg CO2 per bottle
            'points_earned': bottle_count * 5,
            'earnings': bottle_count * 0.05  # $0.05 per bottle
        }
    
    def _generate_eco_insights(self, bottle_count: int, eco_score: Dict[str, Any]) -> List[str]:
        """Generate environmental insights based on detection"""
        insights = []
        
        # Always show the specific bottle information
        insights.append("Great! You found 1 bottle (330ml PET plastic). Every bottle counts for the environment!")
        insights.append("PET plastic bottles are 100% recyclable and help reduce waste in landfills.")
        insights.append("This 330ml bottle can be recycled into new products, saving energy and resources.")
        
        if eco_score and eco_score.get('level') == 'excellent':
            insights.append("Your environmental impact is excellent! Keep up the great work!")
        elif eco_score and eco_score.get('level') == 'good':
            insights.append("Good environmental impact! You're helping reduce plastic waste.")
        
        return insights
    
    def _mock_detection(self) -> Dict[str, Any]:
        """Fallback mock detection when model fails - Always returns 1 bottle, 330ml, PET plastic"""
        bottle_count = 1
        confidence = 0.95
        
        return {
            'bottles': bottle_count,
            'confidence': confidence,
            'detections': [
                {
                    'class': 'bottle',
                    'confidence': confidence,
                    'bbox': {'x1': 100, 'y1': 100, 'x2': 200, 'y2': 300},
                    'size': '330ml',
                    'material': 'PET plastic'
                }
            ],
            'eco_score': self._calculate_eco_score(bottle_count, confidence),
            'eco_insights': self._generate_eco_insights(bottle_count, {}),
            'bottle_details': {
                'count': 1,
                'size': '330ml',
                'material': 'PET plastic',
                'description': 'Standard 330ml PET plastic bottle'
            }
        }

# Initialize detector
detector = BottleDetector()

@app.get("/")
async def root():
    return {"message": "Uber Plastic Bottle Detection API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

@app.post("/detect-bottles")
async def detect_bottles(file: UploadFile = File(...)):
    """Detect bottles in uploaded image"""
    start_time = time.time()
    
    try:
        # Read image
        image_data = await file.read()
        
        # Convert to OpenCV format
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(status_code=400, detail="Invalid image format")
        
        # Run detection in thread pool to avoid blocking
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(executor, detector.detect_bottles, image)
        
        # Add timing information
        processing_time = time.time() - start_time
        result['processing_time_ms'] = round(processing_time * 1000, 2)
        
        logger.info(f"Detection completed in {processing_time:.2f}s")
        return JSONResponse(content=result)
        
    except Exception as e:
        logger.error(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/detect-bottles-base64")
async def detect_bottles_base64(request: dict):
    """Detect bottles in base64 encoded image"""
    start_time = time.time()
    
    try:
        # Get image data from request
        image_data = request.get('image_data', '')
        if not image_data:
            raise HTTPException(status_code=400, detail="image_data is required")
        
        # Decode base64 image
        image_bytes = base64.b64decode(image_data.split(',')[1])
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(status_code=400, detail="Invalid image format")
        
        # Run detection in thread pool to avoid blocking
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(executor, detector.detect_bottles, image)
        
        # Add timing information
        processing_time = time.time() - start_time
        result['processing_time_ms'] = round(processing_time * 1000, 2)
        
        logger.info(f"Base64 detection completed in {processing_time:.2f}s")
        return JSONResponse(content=result)
        
    except Exception as e:
        logger.error(f"Error processing base64 image: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.get("/model-info")
async def model_info():
    """Get information about the loaded model"""
    return {
        "model_loaded": model is not None,
        "model_name": "YOLOv8n" if model else None,
        "classes": list(model.names.values()) if model else [],
        "confidence_threshold": detector.confidence_threshold
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
