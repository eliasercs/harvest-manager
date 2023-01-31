import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import useAuthStore from "../hooks/useAuthStore"

export const LogInForm = () => {

    const {startLogin} = useAuthStore()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
      e.preventDefault()
      const login = {email, password}
      startLogin(login)
    }

    return (
      <>
        <h1 className="text-center">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="log_in_email"
              className="form-style"
              placeholder="Correo Electrónico"
              id="log_in_email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="input-icon bi bi-envelope"></i>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="log_in_password"
              className="form-style"
              placeholder="Contraseña"
              id="log_in_password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="input-icon bi bi-key-fill"></i>
          </div>
          <div className="form-group">
            <button className="btn">Acceder</button>
          </div>
        </form>
      </>
    );
  };
  