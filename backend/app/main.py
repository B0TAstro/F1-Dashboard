"""
F1 Dashboard Backend
FastAPI server for telemetry data processing via FastF1
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import fastf1

from fastapi.responses import RedirectResponse
from app.api import telemetry

# =============================================================================
# App Configuration
# =============================================================================

app = FastAPI(
    title="F1 Dashboard API",
    description="Backend API for F1 telemetry and data analysis",
    version="1.0.0"
)

# =============================================================================
# CORS Configuration
# =============================================================================

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://b0tastro.github.io"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# =============================================================================
# FastF1 Cache Setup
# =============================================================================

CACHE_DIR = os.path.join(os.path.dirname(__file__), "..", "cache")

if not os.path.exists(CACHE_DIR):
    os.makedirs(CACHE_DIR)

fastf1.Cache.enable_cache(CACHE_DIR)

# =============================================================================
# Routes
# =============================================================================

@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "fastf1_version": fastf1.__version__
    }

@app.get("/")
def read_root():
    return RedirectResponse(url="/api/health")

# Include telemetry router
app.include_router(telemetry.router, prefix="/api", tags=["Telemetry"])

# =============================================================================
# Development Server
# =============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
