export const LogInForm = () => {
    return (
      <>
        <h1 className="text-center">Iniciar Sesión</h1>
        <form>
          <div className="form-group">
            <input
              type="email"
              name="log_in_email"
              className="form-style"
              placeholder="Correo Electrónico"
              id="log_in_email"
              autoComplete="off"
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
  