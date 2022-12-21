const useAuthStore = () => {

    const startLogin = async ({email, password}) => {
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
        } catch (error) {
            console.log(error)
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
        startLogin,
        chechAuthToken
    }
}

export default useAuthStore