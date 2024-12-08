// src/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from './api'; // Asegúrate de importar api correctamente
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get("/productos"); // Obtener los productos
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };

    fetchProductos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");  // Redirigir al login
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} className="btn btn-danger">Cerrar sesión</button>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>{producto.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
