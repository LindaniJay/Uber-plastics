from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import base64
from typing import List, Dict, Any
import logging
import time
import random

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="UberPlastics Bottle Detection API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "UberPlastics Bottle Detection API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": time.time()}

@app.post("/detect")
async def detect_bottles(file: UploadFile = File(...)):
    """
    Mock bottle detection endpoint
    Returns simulated detection results
    """
    try:
        # Read the uploaded file
        contents = await file.read()
        
        # Simulate processing time
        await asyncio.sleep(0.5)
        
        # Mock detection results
        bottles_detected = random.randint(1, 5)
        confidence = round(random.uniform(0.7, 0.95), 2)
        
        # Calculate mock values
        poly_money = bottles_detected * 5.0  # 5 STN per bottle
        earnings = poly_money * 0.05  # 5% earnings
        co2_saved = bottles_detected * 0.1  # 0.1kg CO2 per bottle
        
        result = {
            "success": True,
            "bottles": bottles_detected,
            "confidence": confidence,
            "poly_money": poly_money,
            "earnings": round(earnings, 2),
            "co2_saved": round(co2_saved, 2),
            "points": bottles_detected * 5,  # 5 points per bottle
            "detection_time": time.time(),
            "message": f"Detected {bottles_detected} plastic bottles with {confidence*100}% confidence"
        }
        
        logger.info(f"Detection completed: {bottles_detected} bottles detected")
        return result
        
    except Exception as e:
        logger.error(f"Detection error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Detection failed: {str(e)}")

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    """
    Mock image analysis endpoint
    """
    try:
        contents = await file.read()
        
        # Simulate analysis
        await asyncio.sleep(0.3)
        
        analysis_result = {
            "success": True,
            "analysis": {
                "total_objects": random.randint(3, 8),
                "plastic_bottles": random.randint(1, 4),
                "other_objects": random.randint(1, 3),
                "environmental_score": round(random.uniform(0.6, 0.9), 2),
                "recommendations": [
                    "Good plastic collection!",
                    "Consider recycling other materials too",
                    "Keep up the great work!"
                ]
            },
            "timestamp": time.time()
        }
        
        return analysis_result
        
    except Exception as e:
        logger.error(f"Analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/stats")
async def get_stats():
    """
    Mock statistics endpoint
    """
    return {
        "total_detections": random.randint(100, 1000),
        "total_bottles": random.randint(500, 5000),
        "total_co2_saved": round(random.uniform(50, 500), 2),
        "total_earnings": round(random.uniform(25, 250), 2),
        "active_users": random.randint(50, 200),
        "last_updated": time.time()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)