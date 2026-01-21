import uvicorn
import os
import sys

# Ensure we are running from the correct directory context if needed
# But usually python3 run.py from 'backend' dir is enough.

if __name__ == "__main__":
    # Host 0.0.0.0 allows external access if needed, but localhost is safer for dev
    # Port 8000 is standard
    print("🏎️  Starting F1 Dashboard Backend...")
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
