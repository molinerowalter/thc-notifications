import axios from 'axios';

// Crear una instancia personalizada de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000', // URL base de tu backend
  timeout: 5000,                    // Tiempo máximo de espera (5 segundos)
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;