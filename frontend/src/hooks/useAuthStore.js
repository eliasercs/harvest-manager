import {useDispatch, useSelector} from "react-redux"
import {onChecking, onLogIn, onLogOut, clearErrorMessage} from "../store/auth/AuthSlice"

const useAuthStore = () => {
    const {status, user, errorMessage} = useSelector(state => state.Auth)
    const dispatch = useDispatch()

    const startLogin = async ({email, password}) => {       
        dispatch(onChecking()) 
        try {
            const res = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })
            const data = await res.json()
            console.log(data)
            localStorage.setItem("token", data.token)
            dispatch( onLogIn({name: data.user.name, id: data.user._id}) )
        } catch (error) {
            dispatch( onLogOut("Credenciales incorrectas.") )
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10);
        }
    }

    const chechAuthToken = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            // return
        }

        try {
            
        } catch (error) {
            localStorage.clear()
            console.log(error)
        }
    }

    return {
        status,
        user,
        errorMessage,
        startLogin,
        chechAuthToken
    }
}

export default useAuthStore