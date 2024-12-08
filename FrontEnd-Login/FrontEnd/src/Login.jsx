// src/Login.jsx

import React, { useState } from "react";
import axios from "axios";

function Login({ setIsAuthenticated, setSuccessMessage }) {  // Recibe setSuccessMessage como prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:9090/auth/login", {
        username,
        password,
      });

      // Guardar el token JWT en el almacenamiento local
      localStorage.setItem("token", response.data);

      // Actualizar el estado de autenticación
      setIsAuthenticated(true);

      // Mostrar mensaje de éxito
      setSuccessMessage("Inicio de sesión exitoso");

      // Redirigir o hacer lo que necesites después de la autenticación exitosa
    } catch (error) {
      setErrorMessage("Nombre de usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="text-center">Iniciar sesión</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Ingrese su nombre de usuario"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}

export default Login;
