# F1 Dashboard 🏎️ - Backend

This folder contains the Python server responsible for processing "heavy" and specific data that the frontend cannot easily handle alone (e.g., processing large telemetry files)

## Structure

*   **`app/`**: Application source code
    *   **`main.py`**: FastAPI entry point. Handles global configurations (CORS)
    *   **`api/`**: Folder containing API routes
        *   `telemetry.py`: Logic for retrieving and sampling telemetry via the `fastf1` library
*   **`run.py`**: Utility script to launch the server easily without worrying about PATH
*   **`requirements.txt`**: List of Python dependencies

## Why a Python Backend?

Although the OpenF1 API is accessible directly from the Frontend, we use this backend for:
1.  **FastF1**: This powerful Python library provides access to raw telemetry data (speed, GPS position, gear ratio) which requires server-side processing (Pandas) before being sent to the client
2.  **Performance**: We can downsample the number of data points sent to the frontend to keep map animations fluid
3.  **Security**: Allows centralizing external calls and hiding potentially complex business logic

## Security

*   **CORS**: Strictly configured for `localhost:5173`. Modify `app/main.py` to change allowed origins
*   **Rate Limiting**: FastF1 uses a local cache. Be careful not to spam requests to avoid being blocked by source servers (Ergast/F1 Live Timing)

API Docs: `http://localhost:8000/docs`.