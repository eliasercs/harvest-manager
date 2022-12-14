export const LogInForm = () => {
    return (
      <>
        <h1 className="text-center">Iniciar Sesión</h1>
        <form>
          <div className="form-group">
            <input
              type="email"
              name="log_in_email"
              class="form-style"
              placeholder="Correo Electrónico"
              id="log_in_email"
              autocomplete="off"
            />
            <i class="input-icon bi bi-envelope"></i>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="log_in_password"
              class="form-style"
              placeholder="Contraseña"
              id="log_in_password"
              autocomplete="off"
            />
            <i class="input-icon bi bi-key-fill"></i>
          </div>
          <div className="form-group">
            <button className="btn">Acceder</button>
          </div>
        </form>
      </>
    );
  };
  