# F1 Dashboard 🏎️

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-In%20Development-orange)

## About the Project

This project is a "Dashboard" web application dedicated to Formula 1
It was created with the goal of **practicing Fullstack development** (React + Python) and exploring sports data visualization !

**⚠️ Disclaimer:**
*   We have drawn inspiration from the **official F1 Art Direction** (typography, colors, 'leaning' style, Dark Mode) to create an immersive experience
*   It is not affiliated with the Formula 1 companies

## Architecture

The project is structured into two distinct parts (Monorepo):

*   **`/frontend`**: The user interface (React, Tailwind, Recharts)
*   **`/backend`**: The server API (FastAPI, Python, FastF1) which handles data such as telemetry

## Roadmap 🗺️

### Deployment & DevOps
- [ ] Deploy frontend to GitHub Pages
- [ ] Implement CI workflow to auto-deploy on merge to `main`
- [ ] Configure custom domain name
- [ ] Deploy on the web
- [ ] Set up backend deployment (Heroku/AWS)

### Core Experience & UI
- [ ] Add GSAP for animations
- [ ] Implement complete UI
- [ ] Integrate historical assets (Cars, Logos, Drivers) for different eras
- [ ] Add Internationalization (i18n) - FR/EN
- [ ] Add Light/Dark mode toggle

### Features by Page

#### 🏠 Home
- [ ] Finalize UI polish
- [ ] Add GSAP entrance animations
- [ ] Add "Latest News" mini-section

#### 📅 Calendar
- [ ] Improve weekend navigation (better visual indicators)
- [ ] Add "Weekly Schedule" layout (precise times & broadcast links)

#### 🏆 Standings (Drivers/Constructors)
- [ ] Finalize UI polish
- [ ] Add Sorting options (Points, Name, Team, etc.)
- [ ] Add Year Selector (Historical data)

#### 🏎️ Teams
- [ ] Finalize UI polish
- [ ] Add interactive Team details on click:
    - [ ] Season stats (Podiums, Avg. Position)
    - [ ] Drivers & Team Principal info
    - [ ] Visual animations

#### ⏯️ Replay
- [ ] Integrate Three.js for 3D race visualization
- [ ] Add Period Selector (Race & Year)
- [ ] Display detailed telemetry metrics

#### 📰 News (New)
- [ ] Create dedicated News page (aggregated F1 articles)
- [ ] Add CMS capabilities for writing custom articles
- [ ] Implement search & filter options

## Quick Start

To launch the complete project, you must start both the backend and the frontend simultaneously.

### 1. Backend (Python)
Launch has been simplified thanks to the `run.py` script.

```bash
cd backend
pip3 install -r requirements.txt
python3 run.py
```
*The server will be accessible at `http://127.0.0.1:8000`.*

### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
Then open your browser at `http://localhost:5173`.

## Tech Stack

*   **Frontend**: React 19, Vite, TailwindCSS v4, Recharts, Axios
*   **Backend**: Python 3.13, FastAPI, FastF1, Pandas
*   **External APIs**: OpenF1 (Stats), FastF1 (Telemetry & Live Timing)
*   **Design**: Global Dark Theme (`#15151E`), Official Fonts (Titillium Web, Outfit)

## Security and Data

This project makes requests to third-party public APIs.
*   No private API keys are stored in the code
*   The backend uses a CORS policy restricted to `localhost`. **Do not deploy to production without verifying origins.**