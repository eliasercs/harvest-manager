import {useDispatch, useSelector} from "react-redux"
import {onChecking, onLogIn, onLogOut, clearErrorMessage} from "../store/auth/AuthSlice"

const useAuthStore = () => {
    const {status, user, errorMessage} = useSelector(state => state.Auth)
    const dispatch = useDispatch()

    const startLogin = async ({email, password}) => {       
        dispatch(onChecking()) 
        try {
            const res = await fetch(import.meta.env.VITE_API_URL+"/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })
            const data = await res.json()
            localStorage.setItem("token", data.token)
            dispatch( onLogIn({name: data.user.name, id: data.user._id}) )
        } catch (error) {
            dispatch( onLogOut("Credenciales incorrectas.") )
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10);
        }
    }

    async function chechAuthToken() {
        const token = localStorage.getItem("token")
        if (!token) {
            return dispatch(onLogOut())
        }
        try {
            const res = await fetch(import.meta.env.VITE_API_URL+"/api/auth/renew", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-token": localStorage.getItem("token")
                }
            })
            const data = await res.json()
            localStorage.setItem("token", data["token"])
            dispatch( onLogIn({id: data["id"], name: data["user"]["name"], lastname: data["user"]["lastname"]}) )
        } catch (error) {
            localStorage.clear()
            console.log(error)
        }
    }

    const startLogOut = () => {
        localStorage.clear()
        dispatch(onLogOut())
    }

    return {
        status,
        user,
        errorMessage,
        startLogin,
        chechAuthToken,
        startLogOut
    }
}

export default useAuthStore