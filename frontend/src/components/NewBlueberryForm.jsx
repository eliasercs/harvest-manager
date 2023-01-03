import useAuthStore from "../hooks/useAuthStore";

const NewBlueberryForm = () => {
  const date = new Date();

  const { user } = useAuthStore();

  return (
    <form>
      <div className="form-group">
        <select name="type" id="type" className="form-style">
          <option value="default">Seleccione el tipo de bandeja</option>
          <option value="2.1">Verde (2.1 kg)</option>
          <option value="3.5">Blanca (3.5 kg)</option>
        </select>
        <i className="input-icon bi bi-box"></i>
      </div>
      <div className="form-group">
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Cantidad de bandejas"
          autoComplete="off"
          className="form-style"
          min={0}
          max={60}
        />
        <i className="input-icon bi bi-plus-circle-fill"></i>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="date"
          id="date"
          className="form-style"
          disabled
          value={date.toLocaleDateString()}
        />
        <i className="input-icon bi bi-calendar-date"></i>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="user_id"
          id="user_id"
          placeholder="Usuario"
          className="form-style"
          value={user.id}
          disabled
        />
        <i className="input-icon bi bi-person-bounding-box"></i>
      </div>
      <button className="btn" type="submit">
        Almacenar/Actualizar
      </button>
    </form>
  );
};

export default NewBlueberryForm;
