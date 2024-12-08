// src/api.js

import axios from "axios";

// Crear una instancia de axios
const api = axios.create({
  baseURL: "http://localhost:9090/", // URL base de tu backend
});

// Agregar el token JWT en los encabezados de cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
