# F1 Dashboard 🏎️ - Frontend

This folder contains the React user interface that displays statistics, visualizations and others

## Structure

*   **`src/`**
    *   **`pages/`**: Main application views (`Home`, `Calendar`, `Replay`)
    *   **`components/`**: Reusable components (`CircuitMap`, `RaceCard`, `TeamCard`)
    *   **`api/`**: Utility functions for calling APIs
    *   **`assets/`**: Images, logos, fonts


## 🔗 Backend Connection

The `CircuitMap.jsx` component calls `http://localhost:8000`. Ensure the Python backend is running to view telemetry !
Other components (standings) call the public OpenF1 API directly.