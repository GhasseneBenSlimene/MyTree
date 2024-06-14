import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

// Construire l'URL de base à partir des variables d'environnement
console.log(process.env.AXIOS_URL + process.env.AXIOS_PORT);
const baseURL = process.env.AXIOS_URL + process.env.AXIOS_PORT || "http://localhost:5000";

axios.defaults.baseURL = baseURL;

// Activer les cookies cross-origin
axios.defaults.withCredentials = true;

// Journaliser chaque requête envoyée
axios.interceptors.request.use(
  (request) => {
    console.log(
      `Envoi d'une requête à ${request.url} à ${new Date().toISOString()}`
    );
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
