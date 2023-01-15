import { useState } from "react"
import Swal from "sweetalert2"
import useAuthStore from "../hooks/useAuthStore"
import usePeriod from "../hooks/usePeriod"

const HorizontalNavBar = () => {

    const {user, startLogOut} = useAuthStore()
    const {period, periodValue, updatePeriodState, updatePeriodTranslateState} = usePeriod(user.id)

    const [responsiveDropdown, setResponsiveDropdown] = useState(false)

    const handleResponsiveDropdown = (e) => {
        setResponsiveDropdown(!responsiveDropdown)
        var dropdown = document.getElementById("dropdown-access")
        var icon_select = document.getElementById("icon-responsive")
        var select = document.getElementById("option_select_period")
        if (responsiveDropdown) {
            dropdown.style.display = "flex"
            icon_select.classList.remove("text-white")
            icon_select.classList.add("text-black")
            select.classList.remove("text-white")
            select.classList.add("text-black")
        } else {
            dropdown.style.display = "none"
            icon_select.classList.remove("text-black")
            icon_select.classList.remove("text-white")
            select.classList.remove("text-black")
            select.classList.add("text-white")
        }
    }

    const handleSelectPeriod = (e) => {
        var val = e.target.value
        updatePeriodState(val)
        if (val !== "default") {
            var index = periodValue.indexOf(e.target.value)
            updatePeriodTranslateState(period[index])
        }
    }

    const handleLogOut = () => {
        Swal.fire({
            title: "¿Desea finalizar la sesión?",
            icon: "question",
            showConfirmButton: true,
            confirmButtonText: "Sí",
            showDenyButton: true,
            denyButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                startLogOut()
            }
        })
    }

    return <div className="navbar-h">
        <h3 className="title">Harvest Manager</h3>
        <a className="dropdown-plus" onClick={handleResponsiveDropdown}>
            <input type="checkbox" name="plus" className="plus-dropdown" />
            <label htmlFor="plus"><i className="bi bi-plus-circle-fill"></i></label>
        </a>
        <ul id="dropdown-access" className="access">
            <li>{"Bienvenido(a) " + user.name}</li>
            <li>
                <div className="form-group">
                    <i id="icon-responsive" className="input-icon bi bi-calendar text-white"></i>
                    <select id="option_select_period" onInput={handleSelectPeriod} className="form-style text-white">
                        <option value="default" className="text-black">Selecciona un mes</option>
                        {
                            period.map((value, key) => <option className="text-black" key={key} value={periodValue[key]}>{value}</option>)
                        }
                    </select>
                </div>
            </li>
            <li className="btn no-width-100" onClick={handleLogOut}>Cerrar Sesión</li>
        </ul>
    </div>
}

export default HorizontalNavBar