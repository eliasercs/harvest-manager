import useAuthStore from "../hooks/useAuthStore"
import usePeriod from "../hooks/usePeriod"

const HorizontalNavBar = () => {

    const {user, startLogOut} = useAuthStore()
    const {period, periodValue, updatePeriodState, updatePeriodTranslateState} = usePeriod(user.id)

    const handleSelectPeriod = (e) => {
        var val = e.target.value
        updatePeriodState(val)
        if (val !== "default") {
            var index = periodValue.indexOf(e.target.value)
            updatePeriodTranslateState(period[index])
        }
    }

    return <div className="navbar-h">
        <h3 className="title">Harvest Manager</h3>
        <ul className="access">
            <li>{"Bienvenido(a) " + user.name}</li>
            <li>
                <div className="form-group">
                    <i className="input-icon bi bi-calendar text-white"></i>
                    <select onInput={handleSelectPeriod} className="form-style text-white">
                        <option value="default" className="text-black">Selecciona un mes</option>
                        {
                            period.map((value, key) => <option className="text-black" key={key} value={periodValue[key]}>{value}</option>)
                        }
                    </select>
                </div>
            </li>
            <li className="btn no-width-100" onClick={startLogOut}>Cerrar Sesión</li>
        </ul>
    </div>
}

export default HorizontalNavBar