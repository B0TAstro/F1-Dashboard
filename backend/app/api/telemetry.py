from fastapi import APIRouter, HTTPException
import fastf1
import pandas as pd
import math

router = APIRouter()

@router.get("/telemetry/{year}/{race}/{session}")
def get_telemetry(year: int, race: str, session: str):
    """
    Get telemetry data for a specific session.
    """
    try:
        session_obj = fastf1.get_session(year, race, session)
        session_obj.load(telemetry=True, laps=True, weather=False)
        
        drivers = session_obj.drivers
        telemetry_data = []

        for driver in drivers:
            try:
                laps = session_obj.laps.pick_driver(driver)
                if laps.empty:
                    continue
                fastest_lap = laps.pick_fastest()
                if fastest_lap is None or pd.isna(fastest_lap['LapTime']):
                    continue
                    
                tel = fastest_lap.get_telemetry()
                
                # Check if columns needed exist (sometimes data is partial)
                if 'X' not in tel.columns or 'Y' not in tel.columns:
                    continue

                # Downsample data significantly for performance (every 10th point)
                tel_sampled = tel.iloc[::10]
                
                tel_dict = tel_sampled[['X', 'Y', 'Z', 'Speed', 'Distance', 'Time']].to_dict('records')
                
                for point in tel_dict:
                    point['Time'] = point['Time'].total_seconds()
                    # Handle NaN values which JSON doesn't like
                    if math.isnan(point['X']): point['X'] = 0
                    if math.isnan(point['Y']): point['Y'] = 0
                    if math.isnan(point['Z']): point['Z'] = 0
                
                telemetry_data.append({
                    "driver": driver,
                    "telemetry": tel_dict,
                    "color": fastf1.plotting.driver_color(driver)
                })
            except Exception as e:
                # Log error but continue with other drivers
                print(f"Error processing driver {driver}: {e}")
                continue

        return {"drivers": telemetry_data}

    except Exception as e:
        print(f"Error loading session: {e}")
        # Return empty structure or error status, but for demo let's raise
        raise HTTPException(status_code=500, detail=str(e))
