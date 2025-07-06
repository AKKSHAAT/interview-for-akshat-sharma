import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.spacexdata.com/v4/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const allLaunches = () => api.get('/launches');
export const queryLaunches = (query: any) => api.post('/launches/query', query)
export const pastLaunches = () => api.get('/launches/past');
export const upcomingLaunches = () => api.get('/launches/upcoming');
export const getLaunchByID = (id: string) => api.get(`/launches/${id}`);
export const getRocketByID = (id: string) => api.get(`/rockets/${id}`);
export const getLaunchPadByID = (id: string) => api.get(`/launchpads/${id}`);
export const getPayloads = (id: string) => api.get(`/payloads/${id}`);






