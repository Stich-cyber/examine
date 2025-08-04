import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./compo/header/header";
import Card from "./compo/card/card";
import Login from "./compo/login/login";
import ProductDetail from "./compo/productDetail/productDetail";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <Header onLogout={handleLogout} />
                <main>
                  <section>
                    <Card />
                  </section>
                </main>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/product/:id"
          element={
            isAuthenticated ? (
              <>
                <Header onLogout={handleLogout} />
                <ProductDetail />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
