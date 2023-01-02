import useAuthStore from "../hooks/useAuthStore"

const HorizontalNavBar = () => {

    const {user, startLogOut} = useAuthStore()

    return <div className="navbar-h">
        <h3>Harvest Manager</h3>
        <ul className="access">
            <li>{"Bienvenido(a) " + user.name}</li>
            <li className="btn no-width-100" onClick={startLogOut}>Cerrar Sesión</li>
        </ul>
    </div>
}

export default HorizontalNavBar