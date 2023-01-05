import useAuthStore from "../hooks/useAuthStore";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss"

const NewBlueberryForm = () => {
  const date = new Date();

  const { user } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      trays: document.getElementById("type").value,
      amount: document.getElementById("amount").value,
      date: document.getElementById("date").value,
      user_id: user.id
    }
    const res = await fetch("http://localhost:8000/api/blueberry/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    console.log(data)
    if (res.ok) {
      Swal.fire({
        title: "Operación Exitosa",
        text: data.message,
        icon: "success"
      })
    } else {
      console.log(data)
      
      data['errors'].forEach((element) => {
        switch (element['param']) {
          case 'amount':
            Swal.fire({
              title: "¡Lo sentimos!",
              text: element['msg'],
              icon: "error"
            })             
            break
          case 'trays':
            Swal.fire({
              title: "¡Lo sentimos!",
              text: element['msg'],
              icon: "error"
            }) 
            break
          case 'user_id':
            Swal.fire({
              title: "¡Lo sentimos!",
              text: element['msg'],
              icon: "error"
            }) 
            break
          case 'date':
            Swal.fire({
              title: "¡Lo sentimos!",
              text: element['msg'],
              icon: "error"
            }) 
            break
          default:
            break;
        }
      })
      
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <select name="type" id="type" className="form-style">
          <option value="default">Seleccione el tipo de bandeja</option>
          <option value="Verde (2.1 kg)">Verde (2.1 kg)</option>
          <option value="Blanca (3.5 kg)">Blanca (3.5 kg)</option>
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
