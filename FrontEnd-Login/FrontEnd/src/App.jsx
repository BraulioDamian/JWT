// src/App.jsx

import React, { useState } from "react";
import Login from "./Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");  // Estado para el mensaje de éxito

  return (
    <div className="App">
      {/* Si está autenticado, muestra el mensaje de éxito */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Solo se renderiza el componente Login */}
      <Login setIsAuthenticated={setIsAuthenticated} setSuccessMessage={setSuccessMessage} />
    </div>
  );
}

export default App;
