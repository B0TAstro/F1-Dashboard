// api/openF1Api.js

import axios from 'axios';

const baseURL = 'https://api.openf1.org/v1';

export const fetchCurrentSession = async () => {
  try {
    const response = await axios.get(`${baseURL}/sessions`, { params: { current: true } });
    return response.data[0]; // Retourne la session actuelle
  } catch (error) {
    console.error('Erreur lors de la récupération de la session actuelle:', error);
    throw error;
  }
};

export const fetchNextSession = async () => {
  try {
    const currentDate = new Date();
    const response = await axios.get(`${baseURL}/sessions`);
    
    const sessions = response.data
      .filter(session => new Date(session.date) > currentDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return sessions[0]; // Retourne la prochaine session
  } catch (error) {
    console.error('Erreur lors de la récupération de la prochaine session:', error);
    throw error;
  }
};

export const fetchDriverStandings = async (year = new Date().getFullYear()) => {
  try {
    const response = await axios.get(`${baseURL}/drivers/standings`, {
      params: { year, session_key: 'latest' }  // Ajout de session_key=latest
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des classements des pilotes:', error);
    throw error;
  }
};

export const fetchConstructorStandings = async (year = new Date().getFullYear()) => {
  try {
    const response = await axios.get(`${baseURL}/constructors/standings`, {
      params: { year, session_key: 'latest' }  // Ajout de session_key=latest
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des classements des constructeurs:', error);
    throw error;
  }
};

export const fetchSessionResults = async (sessionId) => {
  try {
    const response = await axios.get(`${baseURL}/results`, { params: { session_key: sessionId } });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des résultats de la session:', error);
    throw error;
  }
};

export const fetchDriverLapTimes = async (sessionId, driverId) => {
  try {
    const response = await axios.get(`${baseURL}/laps`, {
      params: { session_key: sessionId, driver_number: driverId }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des temps au tour:', error);
    throw error;
  }
};

export const fetchTeamLapTimes = async (sessionId, teamId) => {
  try {
    const response = await axios.get(`${baseURL}/laps`, {
      params: { session_key: sessionId, team_id: teamId }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des temps au tour par équipe:', error);
    throw error;
  }
};
