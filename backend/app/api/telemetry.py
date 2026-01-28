"""
Telemetry API Routes
Handles FastF1 data processing for circuit visualization
"""

import math
import logging
from typing import Optional

from fastapi import APIRouter, HTTPException
import fastf1
import pandas as pd

# =============================================================================
# Configuration
# =============================================================================

router = APIRouter()
logger = logging.getLogger(__name__)

# Downsampling rates for performance
TELEMETRY_SAMPLE_RATE = 10  # Every 10th point for circuit map
LAP_SAMPLE_RATE = 5         # Every 5th point for detailed charts

# =============================================================================
# Helper Functions
# =============================================================================

def sanitize_nan(value: float, default: float = 0.0) -> float:
    """Replace NaN values with default (JSON doesn't support NaN)"""
    return default if math.isnan(value) else value


def load_session(year: int, race: str, session_type: str):
    """Load a FastF1 session with telemetry data"""
    try:
        session = fastf1.get_session(year, race, session_type)
        session.load(telemetry=True, laps=True, weather=False)
        return session
    except Exception as e:
        logger.error(f"Failed to load session {year}/{race}/{session_type}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to load session: {str(e)}")


def get_driver_color(driver_code: str) -> str:
    """Get team color for a driver"""
    try:
        return fastf1.plotting.driver_color(driver_code)
    except Exception:
        return "FFFFFF"  # Default white

# =============================================================================
# API Endpoints
# =============================================================================

@router.get("/telemetry/{year}/{race}/{session_type}")
def get_session_telemetry(year: int, race: str, session_type: str):
    """
    Get telemetry data for all drivers in a session (for circuit map animation).
    
    - **year**: Season year (e.g., 2023)
    - **race**: Race name (e.g., "Bahrain")
    - **session_type**: Session type (e.g., "R" for Race, "Q" for Qualifying)
    """
    session = load_session(year, race, session_type)
    drivers_data = []

    for driver_code in session.drivers:
        try:
            laps = session.laps.pick_driver(driver_code)
            if laps.empty:
                continue

            fastest_lap = laps.pick_fastest()
            if fastest_lap is None or pd.isna(fastest_lap['LapTime']):
                continue

            telemetry = fastest_lap.get_telemetry()
            
            # Validate required columns
            if 'X' not in telemetry.columns or 'Y' not in telemetry.columns:
                continue

            # Downsample for performance
            sampled = telemetry.iloc[::TELEMETRY_SAMPLE_RATE]
            
            points = []
            for _, row in sampled.iterrows():
                points.append({
                    "X": sanitize_nan(row['X']),
                    "Y": sanitize_nan(row['Y']),
                    "Z": sanitize_nan(row.get('Z', 0)),
                    "Speed": row['Speed'],
                    "Distance": row['Distance'],
                    "Time": row['Time'].total_seconds()
                })

            drivers_data.append({
                "driver": driver_code,
                "telemetry": points,
                "color": get_driver_color(driver_code)
            })

        except Exception as e:
            logger.warning(f"Error processing driver {driver_code}: {e}")
            continue

    return {"drivers": drivers_data}


@router.get("/lap_telemetry/{year}/{race}/{session_type}/{driver}")
def get_driver_lap_telemetry(year: int, race: str, session_type: str, driver: str):
    """
    Get detailed telemetry for a specific driver's fastest lap.
    Includes: Speed, RPM, Gear, Throttle, Brake.
    
    - **year**: Season year
    - **race**: Race name
    - **session_type**: Session type
    - **driver**: Driver code (e.g., "VER", "HAM")
    """
    session = load_session(year, race, session_type)
    
    laps = session.laps.pick_driver(driver)
    if laps.empty:
        raise HTTPException(status_code=404, detail=f"No laps found for driver: {driver}")

    fastest_lap = laps.pick_fastest()
    if fastest_lap is None:
        raise HTTPException(status_code=404, detail=f"No valid fastest lap for driver: {driver}")

    telemetry = fastest_lap.get_telemetry()
    sampled = telemetry.iloc[::LAP_SAMPLE_RATE]

    data_points = []
    for _, row in sampled.iterrows():
        data_points.append({
            "Distance": row['Distance'],
            "Speed": row['Speed'],
            "RPM": row['RPM'],
            "Gear": row['nGear'],
            "Throttle": row['Throttle'],
            "Brake": row['Brake'],
            "Time": row['Time'].total_seconds()
        })

    return {
        "driver": driver,
        "lap_time": fastest_lap['LapTime'].total_seconds(),
        "data": data_points,
        "color": get_driver_color(driver)
    }
