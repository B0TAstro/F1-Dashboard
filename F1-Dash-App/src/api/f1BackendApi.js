/**
 * F1 Dashboard Backend API Client
 * Centralizes all communication with the Python FastF1 backend
 */

import axios from 'axios';

// Get the backend URL from environment variables
// VITE_API_URL is injected by CI/CD (Render)
// Default to localhost for local development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const backendClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // FastF1 processing can be slow
});

/**
 * Generic fetcher
 */
const get = async (endpoint) => {
    try {
        const response = await backendClient.get(endpoint);
        return response.data;
    } catch (error) {
        console.error(`[Backend API] Error fetching ${endpoint}:`, error.message);
        throw error;
    }
};

/**
 * Check if backend is alive
 */
export const fetchHealth = async () => {
    return get('/api/health');
};

/**
 * Fetch detailed telemetry for a specific lap/session
 * @param {number} year - Season year (e.g. 2023)
 * @param {string} location - GP name (e.g. "Bahrain")
 * @param {string} session - Session type (e.g. "R", "Q", "FP1")
 */
export const fetchTelemetry = async (year, location, session) => {
    return get(`/api/telemetry/${year}/${location}/${session}`);
};

/**
 * Fetch specific lap telemetry data for a driver
 * @param {number} year 
 * @param {string} location 
 * @param {string} session 
 * @param {string} driver - Driver identifier (e.g. "VER")
 */
export const fetchLapTelemetry = async (year, location, session, driver) => {
    return get(`/api/lap_telemetry/${year}/${location}/${session}/${driver}`);
};

export default {
    fetchHealth,
    fetchTelemetry,
    fetchLapTelemetry
};
