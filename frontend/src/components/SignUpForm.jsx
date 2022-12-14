import { useState } from "react";

export const SignUpForm = () => {

  const [name, setName] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {name, lastname, email, password}
    const res = await fetch("ruta", {method: POST, body})
    const data = await res.json()
    alert("Usuario registrado satisfactoriamente")
    setName("")
    setLastname("")
    setEmail("")
    setPassword("")
  }

  return (
    <>
      <h1 className="text-center">Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="sign_up_name"
            class="form-style"
            placeholder="Nombre"
            id="sign_up_name"
            autocomplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <i class="input-icon bi bi-person-vcard-fill"></i>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="sign_up_lastname"
            class="form-style"
            placeholder="Apellido"
            id="sign_up_lastname"
            autocomplete="off"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <i class="input-icon bi bi-person-vcard-fill"></i>
        </div>
        <div className="form-group">
          <input
            type="email"
            name="sign_up_email"
            class="form-style"
            placeholder="Correo Electrónico"
            id="sign_up_email"
            autocomplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i class="input-icon bi bi-envelope"></i>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="sign_up_password"
            class="form-style"
            placeholder="Contraseña"
            id="sign_up_password"
            autocomplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i class="input-icon bi bi-key-fill"></i>
        </div>
        <div className="form-group">
          <button className="btn" type="submit">Crear cuenta</button>
        </div>
      </form>
    </>
  );
};
