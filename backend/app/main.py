from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import fastf1
from app.api import telemetry

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    # 🔒 Security: In production, strictly allow only your frontend domain
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enable cache for FastF1 (create 'cache' dir in backend root or local)
# Enable cache for FastF1
import os
cache_dir = os.path.join(os.getcwd(), 'cache')
if not os.path.exists(cache_dir):
    os.makedirs(cache_dir)
fastf1.Cache.enable_cache(cache_dir) 

@app.get("/api/health")
def health_check():
    return {"status": "ok", "fastf1_version": fastf1.__version__}

# Include routers
app.include_router(telemetry.router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    # If running directly, assume we are inside 'backend' folder
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
