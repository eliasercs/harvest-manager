import { useState } from "react";
import Swal from "sweetalert2"
import "sweetalert2/src/sweetalert2.scss"

export const SignUpForm = () => {

  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errorName, setErrorName] = useState("")
  const [errorLastname, setErrorLastname] = useState("")
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")

  const handleSubmit = async (e) => {
    setErrorName("")
    setErrorLastname("")
    setErrorEmail("")
    setErrorPassword("")
    e.preventDefault()

    const data = {name, lastname, email, password}
    console.log(data)
    
    try {
      const res = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const dat = await res.json()
      if (res.ok) {
        Swal.fire({
          title: "Éxito",
          text: "Usuario registrado satisfactoriamente",
          icon: "success"
        })
        setName("")
        setLastname("")
        setEmail("")
        setPassword("")
      } else {
        console.log(dat)
        dat['errors'].forEach((element) => {
          switch (element['param']) {
            case 'name':
              setErrorName(element['msg'])              
              break
            case 'lastname':
              setErrorLastname(element['msg'])
              break
            case 'email':
              setErrorEmail(element['msg'])
              break
            case 'password':
              setErrorPassword(element['msg'])
              break
            default:
              break;
          }
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: error.message
      })
    }

  }

  return (
    <>
      <h1 className="text-center">Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="sign_up_name"
            className="form-style"
            placeholder="Nombre"
            id="sign_up_name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <i className="input-icon bi bi-person-vcard-fill"></i>
          <p>{errorName}</p>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="sign_up_lastname"
            className="form-style"
            placeholder="Apellido"
            id="sign_up_lastname"
            autoComplete="off"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <i className="input-icon bi bi-person-vcard-fill"></i>
          <p>{errorLastname}</p>
        </div>
        <div className="form-group">
          <input
            type="email"
            name="sign_up_email"
            className="form-style"
            placeholder="Correo Electrónico"
            id="sign_up_email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="input-icon bi bi-envelope"></i>
          <p>{errorEmail}</p>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="sign_up_password"
            className="form-style"
            placeholder="Contraseña"
            id="sign_up_password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="input-icon bi bi-key-fill"></i>
          <p>{errorPassword}</p>
        </div>
        <div className="form-group">
          <button className="btn" type="submit">Crear cuenta</button>
        </div>
      </form>
    </>
  );
};
