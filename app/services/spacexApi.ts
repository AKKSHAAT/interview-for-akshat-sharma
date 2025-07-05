import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.spacexdata.com/v4/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const allLaunches = () => api.get('/launches');
const pastLaunches = () => api.get('/launches/past');
const upcomingLaunches = () => api.get('/launches/upcoming');
const getLaunchByID = (id: string) => api.get(`/launches/${id}`);
const getRocketByID = (id: string) => api.get(`/rockets/${id}`);
const getLaunchPadByID = (id: string) => api.get(`/launchpads/${id}`);






