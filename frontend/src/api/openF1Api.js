/**
 * OpenF1 API Client
 * Clean, optimized API layer for fetching F1 data
 */

import axios from 'axios';

// =============================================================================
// Configuration
// =============================================================================

const API_BASE_URL = 'https://api.openf1.org/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Generic API request wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {object} params - Query parameters
 * @returns {Promise<any>} - Response data
 */
const fetchData = async (endpoint, params = {}) => {
  try {
    const { data } = await apiClient.get(endpoint, { params });
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error(`[OpenF1 API] Error fetching ${endpoint}:`, errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Get current year helper
 */
const getCurrentYear = () => new Date().getFullYear();

// =============================================================================
// Session APIs
// =============================================================================

/**
 * Fetch the current live session
 */
export const fetchCurrentSession = async () => {
  const sessions = await fetchData('/sessions', { current: true });
  return sessions?.[0] || null;
};

/**
 * Fetch the next upcoming session
 */
export const fetchNextSession = async () => {
  const sessions = await fetchData('/sessions');
  const now = new Date();

  const futureSessions = sessions
    .filter(session => new Date(session.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return futureSessions[0] || null;
};

/**
 * Fetch all sessions for a given year
 * @param {number} year - Season year
 */
export const fetchSessions = async (year = getCurrentYear()) => {
  return fetchData('/sessions', { year });
};

// =============================================================================
// Meetings (Grand Prix Events) APIs
// =============================================================================

/**
 * Fetch all meetings (GPs) for a given year
 * @param {number} year - Season year
 */
export const fetchMeetings = async (year = getCurrentYear()) => {
  return fetchData('/meetings', { year });
};

// =============================================================================
// Standings APIs
// =============================================================================

/**
 * Fetch driver standings for a given year
 * @param {number} year - Season year
 */
export const fetchDriverStandings = async (year = getCurrentYear()) => {
  return fetchData('/drivers/standings', { year, session_key: 'latest' });
};

/**
 * Fetch constructor standings for a given year
 * @param {number} year - Season year
 */
export const fetchConstructorStandings = async (year = getCurrentYear()) => {
  return fetchData('/constructors/standings', { year, session_key: 'latest' });
};

// =============================================================================
// Results & Lap Data APIs
// =============================================================================

/**
 * Fetch session results
 * @param {string} sessionKey - Session identifier
 */
export const fetchSessionResults = async (sessionKey) => {
  if (!sessionKey) throw new Error('Session key is required');
  return fetchData('/results', { session_key: sessionKey });
};

/**
 * Fetch lap times for a specific driver
 * @param {string} sessionKey - Session identifier
 * @param {number} driverNumber - Driver number
 */
export const fetchDriverLapTimes = async (sessionKey, driverNumber) => {
  if (!sessionKey || !driverNumber) {
    throw new Error('Session key and driver number are required');
  }
  return fetchData('/laps', { session_key: sessionKey, driver_number: driverNumber });
};

/**
 * Fetch lap times for a specific team
 * @param {string} sessionKey - Session identifier
 * @param {string} teamId - Team identifier
 */
export const fetchTeamLapTimes = async (sessionKey, teamId) => {
  if (!sessionKey || !teamId) {
    throw new Error('Session key and team ID are required');
  }
  return fetchData('/laps', { session_key: sessionKey, team_id: teamId });
};
