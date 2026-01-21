# F1 Dashboard - Frontend 🏎️

This folder contains the React user interface that displays statistics and visualizations.

## 📂 Structure

*   **`src/`**
    *   **`pages/`**: Main application views (`Statistics`, `ThisWeekend`).
    *   **`components/`**: Reusable components (`CircuitMap`, `F1Table`).
    *   **`api/`**: Utility functions for calling APIs.
    *   **`utils/`**: Miscellaneous helper functions.
    *   **`assets/`**: Images, logos, fonts.

## 🎨 Design System (2026 Refresh)

Inspired by the new F1 visual identity:
*   **Global Dark Mode**: Background `#15151E` (F1 Black) and Cards `#1f1f29`.
*   **Typography**: `Titillium Web` (Data/Body) and `Outfit` (Headers).
*   **Colors**:
    *   F1 Red: `#FF1801`
    *   F1 White: `#FFFFFD`
    *   F1 Grey: `#38383F`
*   **Components**: Minimalist styles, "Glassmorphism" navigation, Custom Recharts graphs.

## 🔗 Backend Connection

The `CircuitMap.jsx` component calls `http://localhost:8000`. Ensure the Python backend is running to view telemetry.
Other components (standings) call the public OpenF1 API directly.

## 🚀 Starting the Frontend

```bash
# From the /frontend root
npm run dev
```
Access: `http://localhost:5173`.
