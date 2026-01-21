# F1 Dashboard 🏎️

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-In%20Development-orange)

## 📖 About the Project

This project is a personal "Dashboard" web application dedicated to Formula 1.
It was created with the goal of **practicing Fullstack development** (React + Python) and exploring sports data visualization.

**⚠️ Disclaimer:**
*   This project is **non-profit** and purely educational.
*   It is not affiliated with the Formula 1 companies.
*   We have drawn inspiration from the **official F1 Art Direction** (typography, colors, 'leaning' style, Dark Mode) to create an immersive experience.

## 🏗️ Architecture

The project is structured into two distinct parts (Monorepo):

*   **`/frontend`**: The user interface (React, Tailwind, Recharts) featuring a **minimalist dark theme**.
*   **`/backend`**: The server API (FastAPI, Python, FastF1) which handles complex data such as telemetry.

## 🚀 Quick Start

To launch the complete project, you must start both the backend and the frontend simultaneously.

### 1. Backend (Python)
Launch has been simplified thanks to the `run.py` script.

```bash
cd backend
# Install dependencies (first time only)
pip install -r requirements.txt
# Start the server
python3 run.py
```
*The server will be accessible at `http://127.0.0.1:8000`.*

### 2. Frontend (React)
```bash
cd frontend
# Install node_modules (first time only)
npm install
# Start the site
npm run dev
```

Then open your browser at `http://localhost:5173`.

## 🛠️ Tech Stack

*   **Frontend**: React 19, Vite, TailwindCSS v4, Recharts, Axios.
*   **Backend**: Python 3.13, FastAPI, FastF1, Pandas.
*   **External APIs**: OpenF1 (Stats), FastF1 (Telemetry & Live Timing).
*   **Design**: Global Dark Theme (`#15151E`), Official Fonts (Titillium Web, Outfit).

## 🔒 Security and Data

This project makes requests to third-party public APIs.
*   No private API keys are stored in the code.
*   The backend uses a CORS policy restricted to `localhost`. **Do not deploy to production without verifying origins.**
